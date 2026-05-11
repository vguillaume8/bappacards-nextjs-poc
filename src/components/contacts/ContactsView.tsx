'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import {
  FileDownload,
  PersonAdd,
  FilterList,
  PriorityHigh,
  People,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { useAuth } from '@/context/AuthProvider';
import { createV3Contact, updateV3Contact, deleteContact } from '@/lib/api';
import AddContactDialog, { AddContactPayload } from './AddContactDialog';
import EditContactDialog, { EditContactPayload } from './EditContactDialog';
import DeleteContactDialog from './DeleteContactDialog';

// ── Types ──────────────────────────────────────────────────────────────────

export interface Contact {
  id: string;
  full_name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  instagram?: string;
  tiktok?: string;
  notes?: string;
  location_name?: string;
  date_met?: string;
  follow_up_priority?: 'high' | 'medium' | 'low' | '' | null;
  profile_id?: string;
}

type SortOrder = 'asc' | 'desc';
type SortField = 'full_name' | 'phone_number' | 'instagram' | 'location_name' | 'date_met' | 'follow_up_priority';

// ── Utility helpers ────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#3F51B5',
];

function getColorForLetter(letter: string): string {
  const charCode = (letter || 'A').toUpperCase().charCodeAt(0) - 65;
  return AVATAR_COLORS[Math.abs(charCode) % AVATAR_COLORS.length];
}

function getPriorityColor(priority: string | null | undefined): string {
  switch (priority) {
    case 'high': return '#d32f2f';
    case 'medium': return '#f57c00';
    case 'low': return '#388e3c';
    default: return '#bdbdbd';
  }
}

function getPriorityLabel(priority: string | null | undefined): string {
  switch (priority) {
    case 'high': return 'High';
    case 'medium': return 'Medium';
    case 'low': return 'Low';
    default: return 'None';
  }
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDateString(dateString: string | undefined | null): Date | null {
  if (!dateString) return null;
  try {
    const parts = dateString.split(' ');
    if (parts.length < 3) return null;
    const [month, dayWithSuffix, year] = parts;
    const day = dayWithSuffix.replace(/(st|nd|rd|th)/, '');
    const monthIndex = MONTHS.indexOf(month);
    if (monthIndex === -1 || isNaN(parseInt(day)) || isNaN(parseInt(year))) return null;
    return new Date(parseInt(year), monthIndex, parseInt(day));
  } catch {
    return null;
  }
}

function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Generate a minimal vCard string for a contact without an external library. */
function generateVCardForContact(contact: Contact): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];
  const name = contact.full_name || '';
  const parts = name.split(' ');
  const last = parts.length > 1 ? parts.slice(1).join(' ') : '';
  const first = parts[0] || '';
  lines.push(`FN:${name}`);
  lines.push(`N:${last};${first};;;`);
  if (contact.email) lines.push(`EMAIL:${contact.email}`);
  if (contact.phone_number) lines.push(`TEL:${contact.phone_number}`);
  if (contact.instagram) lines.push(`X-SOCIALPROFILE;type=instagram:https://instagram.com/${contact.instagram}`);
  if (contact.notes) lines.push(`NOTE:${contact.notes}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

// ── Stats bar ─────────────────────────────────────────────────────────────

function StatsBar({ contacts }: { contacts: Contact[] }) {
  const now = new Date();
  const thisMonth = contacts.filter((c) => {
    const d = parseDateString(c.date_met);
    return d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const highPriority = contacts.filter((c) => c.follow_up_priority === 'high').length;

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      {[
        { label: 'Total Contacts', value: contacts.length },
        { label: 'This Month', value: thisMonth },
        { label: 'High Priority', value: highPriority },
      ].map(({ label, value }) => (
        <Paper key={label} elevation={0} sx={{ p: 2, flex: '1 1 100px', minWidth: 100, border: 1, borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>{value}</Typography>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

// ── Table head ─────────────────────────────────────────────────────────────

interface EnhancedTableHeadProps {
  numSelected: number;
  rowCount: number;
  order: SortOrder;
  orderBy: SortField;
  isMobile: boolean;
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (property: SortField) => void;
}

function EnhancedTableHead({
  numSelected, rowCount, order, orderBy, isMobile, onSelectAllClick, onRequestSort,
}: EnhancedTableHeadProps) {
  const sortLabel = (field: SortField, label: string) => (
    <TableSortLabel
      active={orderBy === field}
      direction={orderBy === field ? order : 'asc'}
      onClick={() => onRequestSort(field)}
    >
      {label}
    </TableSortLabel>
  );

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{ input: { 'aria-label': 'select all contacts' } }}
          />
        </TableCell>
        <TableCell>
          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {sortLabel('full_name', 'Name')}
              {sortLabel('date_met', 'Date')}
            </Box>
          ) : (
            sortLabel('full_name', 'Contact')
          )}
        </TableCell>
        {!isMobile && (
          <>
            <TableCell>{sortLabel('phone_number', 'Phone Number')}</TableCell>
            <TableCell>{sortLabel('instagram', 'Instagram')}</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>{sortLabel('location_name', 'Met in')}</TableCell>
            <TableCell>{sortLabel('date_met', 'Date')}</TableCell>
            <TableCell>{sortLabel('follow_up_priority', 'Follow-up Priority')}</TableCell>
          </>
        )}
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

// ── Mobile contact card ────────────────────────────────────────────────────

interface MobileContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onCheck: (e: React.MouseEvent, contact: Contact) => void;
  onActionClick: (e: React.MouseEvent<HTMLButtonElement>, contact: Contact) => void;
}

const MobileContactCard = React.memo(function MobileContactCard({
  contact, isSelected, onCheck, onActionClick,
}: MobileContactCardProps) {
  const initial = (contact.full_name || '?').charAt(0);
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2, position: 'relative', transition: 'all 0.2s',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
      }}
    >
      <CardContent sx={{ pb: '12px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Checkbox
            checked={isSelected}
            onClick={(e) => onCheck(e, contact)}
            sx={{ p: 0, mt: 0.5 }}
            color="primary"
          />
          <Avatar sx={{ bgcolor: getColorForLetter(initial), width: 48, height: 48 }}>
            {initial}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {contact.full_name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {contact.email}
            </Typography>
          </Box>
          <IconButton size="small" onClick={(e) => onActionClick(e, contact)} sx={{ mt: -0.5 }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
          {contact.phone_number && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Phone</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{contact.phone_number}</Typography>
            </Box>
          )}
          {contact.date_met && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Date Met</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{contact.date_met}</Typography>
            </Box>
          )}
          {contact.location_name && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Location</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{contact.location_name}</Typography>
            </Box>
          )}
          {contact.instagram && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Instagram</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{contact.instagram}</Typography>
            </Box>
          )}
        </Box>

        {contact.follow_up_priority && (
          <Box sx={{ mt: 1.5 }}>
            <Chip
              label={getPriorityLabel(contact.follow_up_priority)}
              size="small"
              sx={{ backgroundColor: getPriorityColor(contact.follow_up_priority), color: 'white', fontWeight: 600, height: 24 }}
            />
          </Box>
        )}

        {contact.notes && (
          <Typography
            variant="body2" color="text.secondary"
            sx={{
              mt: 1.5, pt: 1.5, borderTop: 1, borderColor: 'divider',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              overflow: 'hidden', fontStyle: 'italic',
            }}
          >
            {contact.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
});

// ── Main component ─────────────────────────────────────────────────────────

export default function ContactsView() {
  const { currentUser, userData, refreshUserData } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contacts: Contact[] = useMemo(
    () => ((userData as { contacts?: Contact[] })?.contacts ?? []) as Contact[],
    [userData],
  );

  // ── Table state ──────────────────────────────────────────────────────────
  const [selected, setSelected] = useState<Map<string, Contact>>(new Map());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<SortOrder>('desc');
  const [orderBy, setOrderBy] = useState<SortField>('date_met');
  const [hasInitialized, setHasInitialized] = useState(false);

  // ── Filter state ─────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState(getTomorrowDateString());

  // ── Dialog state ─────────────────────────────────────────────────────────
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [contactForEdit, setContactForEdit] = useState<Contact | null>(null);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // ── Action popover state ─────────────────────────────────────────────────
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [popoverContact, setPopoverContact] = useState<Contact | null>(null);

  // ── Bulk priority menu ───────────────────────────────────────────────────
  const [bulkPriorityAnchor, setBulkPriorityAnchor] = useState<Element | null>(null);

  // ── CSV import state ─────────────────────────────────────────────────────
  const csvRef = useRef<HTMLInputElement>(null);
  const [importDialog, setImportDialog] = useState({
    open: false, importing: false,
    total: 0, done: 0, imported: 0, skipped: 0, errors: [] as string[],
  });

  // ── Notification ─────────────────────────────────────────────────────────
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' as 'success' | 'error' | 'warning' | 'info' });

  const showNotification = useCallback((message: string, severity: typeof notification.severity = 'info') => {
    setNotification({ open: true, message, severity });
  }, []);

  // Init sort on mobile
  useEffect(() => {
    if (!hasInitialized && isMobile) {
      setOrderBy('date_met');
      setOrder('desc');
      setHasInitialized(true);
    }
  }, [isMobile, hasInitialized]);

  // ── Sorting ──────────────────────────────────────────────────────────────
  const handleRequestSort = useCallback((property: SortField) => {
    setOrder((prev) => (orderBy === property && prev === 'asc') ? 'desc' : 'asc');
    setOrderBy(property);
  }, [orderBy]);

  const descendingComparator = useCallback((a: Contact, b: Contact, field: SortField): number => {
    if (field === 'follow_up_priority') {
      const rank: Record<string, number> = { high: 3, medium: 2, low: 1, '': 0 };
      return (rank[b[field] ?? ''] ?? 0) - (rank[a[field] ?? ''] ?? 0);
    }
    if (field === 'date_met') {
      const da = parseDateString(a.date_met);
      const db = parseDateString(b.date_met);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db.getTime() - da.getTime();
    }
    const va = (a[field] ?? '') as string;
    const vb = (b[field] ?? '') as string;
    if (vb < va) return -1;
    if (vb > va) return 1;
    return 0;
  }, []);

  // ── Filtering ────────────────────────────────────────────────────────────
  const filteredContacts = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    const q = searchQuery.toLowerCase();

    return contacts.filter((c) => {
      const contactDate = parseDateString(c.date_met);
      const matchesDate = !contactDate || (contactDate >= start && contactDate < end);

      const matchesSearch =
        !q ||
        (c.full_name || '').toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q) ||
        (c.phone_number || '').toLowerCase().includes(q) ||
        (c.location_name || '').toLowerCase().includes(q) ||
        (c.notes || '').toLowerCase().includes(q);

      const matchesPriority =
        priorityFilter === 'all' ||
        c.follow_up_priority === priorityFilter ||
        (priorityFilter === 'none' && !c.follow_up_priority);

      return matchesSearch && matchesPriority && matchesDate;
    });
  }, [contacts, searchQuery, priorityFilter, startDate, endDate]);

  const sortedContacts = useMemo(() => {
    const cmp = order === 'desc'
      ? (a: Contact, b: Contact) => descendingComparator(a, b, orderBy)
      : (a: Contact, b: Contact) => -descendingComparator(a, b, orderBy);
    return [...filteredContacts].sort(cmp);
  }, [filteredContacts, order, orderBy, descendingComparator]);

  const paginatedContacts = useMemo(
    () => sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedContacts, page, rowsPerPage],
  );

  // ── Selection ────────────────────────────────────────────────────────────
  const isSelected = useCallback((id: string) => selected.has(id), [selected]);

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const next = new Map<string, Contact>();
      filteredContacts.forEach((c) => next.set(c.id, c));
      setSelected(next);
    } else {
      setSelected(new Map());
    }
  };

  const handleRowClick = (_: React.MouseEvent, contact: Contact) => {
    const next = new Map(selected);
    if (next.has(contact.id)) next.delete(contact.id);
    else next.set(contact.id, contact);
    setSelected(next);
  };

  // ── Action popover ───────────────────────────────────────────────────────
  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement | Element>, contact: Contact) => {
    e.stopPropagation();
    setAnchorEl((e as React.MouseEvent<HTMLButtonElement>).currentTarget);
    setPopoverContact(contact);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverContact(null);
  };

  // ── CRUD operations ──────────────────────────────────────────────────────
  const getToken = async (): Promise<string | null> => {
    if (!currentUser) return null;
    try { return await currentUser.getIdToken(); } catch { return null; }
  };

  const handleCreateContact = async (data: AddContactPayload) => {
    const token = await getToken();
    if (!token) return;
    try {
      const res = await createV3Contact(token, data);
      if (!('data' in res)) {
        showNotification('Could not create contact', 'error');
      } else {
        await refreshUserData();
        showNotification('Contact added successfully', 'success');
      }
    } catch (err) {
      showNotification(`Could not create contact: ${(err as Error).message}`, 'error');
    }
  };

  const handleUpdateContact = async (contactId: string, data: EditContactPayload | { follow_up_priority: string }) => {
    const token = await getToken();
    if (!token) return;
    try {
      const res = await updateV3Contact(token, contactId, data);
      if (!('data' in res)) {
        showNotification('Could not update contact', 'error');
      } else {
        await refreshUserData();
        showNotification('Contact updated', 'success');
      }
    } catch (err) {
      showNotification(`Could not update contact: ${(err as Error).message}`, 'error');
    }
  };

  const handleDeleteContacts = async () => {
    const token = await getToken();
    if (!token) return;
    try {
      const ids = Array.from(selected.keys());
      for (const id of ids) {
        await deleteContact(token, id);
      }
      await refreshUserData();
      setSelected(new Map());
      setDeleteOpen(false);
      showNotification('Contact(s) deleted', 'success');
    } catch (err) {
      showNotification(`Could not delete contact(s): ${(err as Error).message}`, 'error');
    }
  };

  // ── Bulk priority ────────────────────────────────────────────────────────
  const handleBulkPriorityUpdate = async (priority: string) => {
    const token = await getToken();
    if (!token) return;
    try {
      for (const id of selected.keys()) {
        await updateV3Contact(token, id, { follow_up_priority: priority });
      }
      await refreshUserData();
      setSelected(new Map());
      setBulkPriorityAnchor(null);
      showNotification('Priority updated', 'success');
    } catch (err) {
      showNotification(`Could not update priorities: ${(err as Error).message}`, 'error');
    }
  };

  // ── vCard download ───────────────────────────────────────────────────────
  const handleSaveVCard = (contact: Contact) => {
    const vcard = generateVCardForContact(contact);
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    saveAs(blob, `${contact.full_name || 'contact'}.vcf`);
    handlePopoverClose();
  };

  // ── CSV export ───────────────────────────────────────────────────────────
  const handleExport = () => {
    const headers = ['full_name', 'email', 'phone_number', 'instagram', 'tiktok', 'notes', 'location_name', 'date_met', 'follow_up_priority'];
    const rows = contacts.map((c) => headers.map((h) => (c as unknown as Record<string, unknown>)[h] ?? ''));
    const csv = Papa.unparse([headers, ...rows]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const name = ((userData as { links?: { firstname?: string } })?.links?.firstname) ?? 'contacts';
    saveAs(blob, `${name}_contacts.csv`);
  };

  // ── CSV import ───────────────────────────────────────────────────────────
  const normalizeHeader = (h: string) => h.trim().toLowerCase().replace(/[\s_-]+/g, '');

  const resolveField = (row: Record<string, string>, variants: string[]): string => {
    for (const v of variants) {
      const key = Object.keys(row).find((k) => normalizeHeader(k) === normalizeHeader(v));
      if (key && row[key] != null && String(row[key]).trim() !== '') return String(row[key]).trim();
    }
    return '';
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data;
        if (!rows.length) { showNotification('The CSV file is empty or has no valid rows.', 'warning'); return; }

        setImportDialog({ open: true, importing: true, total: rows.length, done: 0, imported: 0, skipped: 0, errors: [] });

        const token = await getToken();
        if (!token) return;

        let imported = 0; let skipped = 0; const errors: string[] = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const full_name = resolveField(row, ['full_name', 'fullname', 'name', 'Full Name', 'Name']);
          const email = resolveField(row, ['email', 'Email', 'email_address']);
          const rawPhone = resolveField(row, ['phone_number', 'phone', 'Phone', 'Phone Number', 'mobile']);
          const notes = resolveField(row, ['notes', 'Notes', 'note']);
          const location = resolveField(row, ['location_name', 'location', 'Location', 'city']);

          if (!full_name && !email) {
            skipped++;
            setImportDialog((p) => ({ ...p, done: i + 1, skipped: p.skipped + 1 }));
            continue;
          }

          const phone_number = rawPhone
            ? (rawPhone.startsWith('+') ? rawPhone : `+${rawPhone.replace(/^\+/, '')}`)
            : '';

          const body = {
            full_name: full_name || email,
            phone_number,
            email,
            notes,
            ...(location ? { contact_location: { name: location } } : {}),
          };

          try {
            const res = await createV3Contact(token, body);
            if ('data' in res) {
              imported++;
              setImportDialog((p) => ({ ...p, done: i + 1, imported: p.imported + 1 }));
            } else {
              skipped++;
              const msg = `Row ${i + 2}: ${'message' in res ? res.message : 'Failed'}`;
              errors.push(msg);
              setImportDialog((p) => ({ ...p, done: i + 1, skipped: p.skipped + 1, errors: [...p.errors, msg] }));
            }
          } catch (err) {
            skipped++;
            const msg = `Row ${i + 2}: ${(err as Error).message}`;
            errors.push(msg);
            setImportDialog((p) => ({ ...p, done: i + 1, skipped: p.skipped + 1, errors: [...p.errors, msg] }));
          }
        }

        setImportDialog((p) => ({ ...p, importing: false }));
        if (imported > 0) await refreshUserData();
      },
      error: (err: { message: string }) => showNotification(`Failed to parse CSV: ${err.message}`, 'error'),
    });
  };

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (!contacts) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  const popoverOpen = Boolean(anchorEl);

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3 } }}>

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      {contacts.length === 0 && (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <People sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">No contacts yet</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Start building your professional network</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<PersonAdd />} size="large" onClick={() => setAddOpen(true)}>
              Add Your First Contact
            </Button>
            <Button variant="outlined" startIcon={<FileUploadIcon />} size="large" onClick={() => { if (csvRef.current) csvRef.current.value = ''; csvRef.current?.click(); }}>
              Import CSV
            </Button>
          </Box>
        </Box>
      )}

      {contacts.length > 0 && (
        <>
          {/* ── Page header ───────────────────────────────────────────── */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                Contacts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredContacts.length} of {contacts.length} contacts
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<PersonAdd />} onClick={() => setAddOpen(true)}>
              Add Contact
            </Button>
          </Box>

          {/* ── Stats bar ─────────────────────────────────────────────── */}
          <StatsBar contacts={contacts} />

          {/* ── Search & filters ──────────────────────────────────────── */}
          <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: 'background.default', border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search contacts by name, email, phone, location, notes..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
              sx={{ mb: 2 }}
              slotProps={{
                input: { startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) },
              }}
            />

            {/* Mobile quick sort chips */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {(['full_name', 'date_met', 'follow_up_priority', 'location_name'] as SortField[]).map((field) => {
                  const labels: Record<SortField, string> = { full_name: 'Name', date_met: 'Date', follow_up_priority: 'Priority', location_name: 'Location', phone_number: 'Phone', instagram: 'Instagram' };
                  const active = orderBy === field;
                  return (
                    <Chip
                      key={field}
                      label={labels[field]}
                      onClick={() => handleRequestSort(field)}
                      color={active ? 'primary' : 'default'}
                      icon={active ? (order === 'asc' ? <ArrowUpward sx={{ fontSize: 16 }} /> : <ArrowDownward sx={{ fontSize: 16 }} />) : undefined}
                      variant={active ? 'filled' : 'outlined'}
                      sx={{ minWidth: 'fit-content' }}
                    />
                  );
                })}
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'center' }, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', gap: 1, flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel id="priority-filter-label">Priority</InputLabel>
                  <Select
                    labelId="priority-filter-label"
                    value={priorityFilter}
                    onChange={(e) => { setPriorityFilter(e.target.value); setPage(0); }}
                    label="Priority"
                  >
                    <MenuItem value="all">All Priorities</MenuItem>
                    {(['high', 'medium', 'low', 'none'] as const).map((p) => (
                      <MenuItem key={p} value={p}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getPriorityColor(p === 'none' ? '' : p) }} />
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {isMobile ? (
                  <Button variant="outlined" startIcon={<FilterList />} onClick={() => setFilterSheetOpen(true)} size="small" sx={{ minWidth: 140 }}>
                    Sort &amp; Filter
                  </Button>
                ) : (
                  <>
                    <TextField size="small" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} sx={{ width: 150 }} label="From Date" slotProps={{ inputLabel: { shrink: true } }} />
                    <TextField size="small" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} sx={{ width: 150 }} label="To Date" slotProps={{ inputLabel: { shrink: true } }} />
                  </>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<FileDownload />} size="small" onClick={handleExport}>
                  Export CSV
                </Button>
                <Button variant="outlined" startIcon={<FileUploadIcon />} size="small" onClick={() => { if (csvRef.current) csvRef.current.value = ''; csvRef.current?.click(); }}>
                  Import CSV
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* ── Contacts table/cards ───────────────────────────────────── */}
          <Fade in timeout={300}>
            <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
              {/* Bulk actions bar */}
              <Collapse in={selected.size > 0}>
                <Box sx={{ p: 2, bgcolor: (t) => alpha(t.palette.primary.main, 0.08), borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {selected.size} selected
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" startIcon={<PriorityHigh />} onClick={(e) => setBulkPriorityAnchor(e.currentTarget)} size="small">
                      Set Priority
                    </Button>
                    <Menu anchorEl={bulkPriorityAnchor} open={Boolean(bulkPriorityAnchor)} onClose={() => setBulkPriorityAnchor(null)}>
                      {(['high', 'medium', 'low', ''] as const).map((p) => (
                        <MenuItem key={p || 'none'} onClick={() => handleBulkPriorityUpdate(p)}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: getPriorityColor(p), mr: 1 }} />
                            {getPriorityLabel(p)}
                          </Box>
                        </MenuItem>
                      ))}
                    </Menu>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteOpen(true)} size="small">
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Collapse>

              {/* Mobile cards */}
              {isMobile ? (
                <Box sx={{ p: 2 }}>
                  {paginatedContacts.map((contact) => (
                    <MobileContactCard
                      key={contact.id}
                      contact={contact}
                      isSelected={isSelected(contact.id)}
                      onCheck={handleRowClick}
                      onActionClick={(e, c) => handleActionClick(e as React.MouseEvent<HTMLButtonElement>, c)}
                    />
                  ))}
                </Box>
              ) : (
                <TableContainer>
                  <Table size="medium">
                    <EnhancedTableHead
                      numSelected={selected.size}
                      rowCount={paginatedContacts.length}
                      order={order}
                      orderBy={orderBy}
                      isMobile={isMobile}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {paginatedContacts.map((contact) => {
                        const itemSelected = isSelected(contact.id);
                        const initial = (contact.full_name || '?').charAt(0);
                        return (
                          <TableRow
                            hover
                            onClick={(e) => handleRowClick(e, contact)}
                            role="checkbox"
                            aria-checked={itemSelected}
                            tabIndex={-1}
                            key={contact.id}
                            selected={itemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox color="primary" checked={itemSelected} />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 2, bgcolor: getColorForLetter(initial) }}>{initial}</Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>{contact.full_name}</Typography>
                                  <Typography variant="body2" color="text.secondary">{contact.email}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{contact.phone_number}</TableCell>
                            <TableCell>
                              {contact.instagram && <Typography variant="body2">{contact.instagram}</Typography>}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {contact.notes}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {contact.location_name && <Chip label={contact.location_name} size="small" />}
                            </TableCell>
                            <TableCell>{contact.date_met}</TableCell>
                            <TableCell>
                              {contact.follow_up_priority ? (
                                <Chip
                                  label={getPriorityLabel(contact.follow_up_priority)}
                                  size="small"
                                  sx={{ backgroundColor: getPriorityColor(contact.follow_up_priority), color: 'white', fontWeight: 500, borderRadius: 1 }}
                                />
                              ) : (
                                <Chip label="None" size="small" variant="outlined" />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Actions">
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleActionClick(e, contact); }}>
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredContacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              />
            </Paper>
          </Fade>
        </>
      )}

      {/* ── Action popover ───────────────────────────────────────────────── */}
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', minWidth: 180 }}>
          <Button startIcon={<DownloadIcon />} onClick={() => { if (popoverContact) handleSaveVCard(popoverContact); }} sx={{ mb: 1, justifyContent: 'flex-start' }}>
            Save vCard
          </Button>
          <Button
            startIcon={<EditIcon />}
            onClick={() => { setContactForEdit(popoverContact); setEditOpen(true); handlePopoverClose(); }}
            sx={{ mb: 1, justifyContent: 'flex-start' }}
          >
            Edit Contact
          </Button>
          <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>Set Follow-up Priority:</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {(['high', 'medium', 'low', ''] as const).map((p) => {
              const active = popoverContact?.follow_up_priority === p || (!p && !popoverContact?.follow_up_priority);
              const color = getPriorityColor(p);
              return (
                <Button
                  key={p || 'none'}
                  size="small"
                  variant={active ? 'contained' : 'outlined'}
                  onClick={() => { if (popoverContact) handleUpdateContact(popoverContact.id, { follow_up_priority: p }); handlePopoverClose(); }}
                  sx={{
                    justifyContent: 'flex-start',
                    backgroundColor: active ? color : 'transparent',
                    color: active ? 'white' : color,
                    borderColor: color,
                    '&:hover': { backgroundColor: active ? color : `${color}22`, borderColor: color },
                  }}
                >
                  {getPriorityLabel(p)}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Popover>

      {/* ── Mobile sort & filter sheet ───────────────────────────────────── */}
      <Dialog
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        slotProps={{
          paper: {
            sx: isMobile ? {
              position: 'fixed', bottom: 0, left: 0, right: 0, m: 0,
              maxHeight: '85vh', borderTopLeftRadius: 16, borderTopRightRadius: 16,
            } : {},
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Sort &amp; Filter</Typography>
          <IconButton onClick={() => setFilterSheetOpen(false)} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Sort by</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
            {([
              ['full_name', 'Name', 'A-Z', 'Z-A'],
              ['date_met', 'Date', 'Oldest', 'Newest'],
              ['location_name', 'Location', 'A-Z', 'Z-A'],
              ['follow_up_priority', 'Priority', 'Low-High', 'High-Low'],
            ] as [SortField, string, string, string][]).map(([field, label, asc, desc]) => (
              <Button
                key={field}
                variant={orderBy === field ? 'contained' : 'outlined'}
                onClick={() => handleRequestSort(field)}
                endIcon={orderBy === field && (order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                sx={{ justifyContent: 'space-between', textAlign: 'left' }}
                fullWidth
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {label}{orderBy === field && ` (${order === 'asc' ? asc : desc})`}
                </Box>
              </Button>
            ))}
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Date Range</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            <TextField fullWidth type="date" label="From Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            <TextField fullWidth type="date" label="To Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>Filter by Priority</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <MenuItem value="all">All Priorities</MenuItem>
              {(['high', 'medium', 'low', 'none'] as const).map((p) => (
                <MenuItem key={p} value={p}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getPriorityColor(p === 'none' ? '' : p) }} />
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1, borderTop: 1, borderColor: 'divider' }}>
          <Button fullWidth variant="outlined" onClick={() => { setStartDate('2022-01-01'); setEndDate(getTomorrowDateString()); setPriorityFilter('all'); setOrderBy('date_met'); setOrder('desc'); }}>
            Reset All
          </Button>
          <Button fullWidth variant="contained" onClick={() => setFilterSheetOpen(false)}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── CSV import progress dialog ───────────────────────────────────── */}
      <Dialog open={importDialog.open} onClose={() => { if (!importDialog.importing) setImportDialog((p) => ({ ...p, open: false })); }} maxWidth="xs" fullWidth>
        <DialogTitle>
          {importDialog.importing ? 'Importing Contacts…' : 'Import Complete'}
          {!importDialog.importing && (
            <IconButton onClick={() => setImportDialog((p) => ({ ...p, open: false }))} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          {importDialog.importing && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress variant="determinate" value={importDialog.total ? (importDialog.done / importDialog.total) * 100 : 0} sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {importDialog.done} / {importDialog.total} rows processed
              </Typography>
            </Box>
          )}
          {!importDialog.importing && (
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>{importDialog.imported}</strong> contact{importDialog.imported !== 1 ? 's' : ''} imported
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: importDialog.errors.length ? 2 : 0 }}>
                <strong>{importDialog.skipped}</strong> row{importDialog.skipped !== 1 ? 's' : ''} skipped or failed
              </Typography>
              {importDialog.errors.length > 0 && (
                <Box sx={{ maxHeight: 120, overflowY: 'auto' }}>
                  {importDialog.errors.map((err, i) => (
                    <Typography key={i} variant="caption" color="error" sx={{ display: 'block' }}>{err}</Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        {!importDialog.importing && (
          <DialogActions>
            <Button onClick={() => setImportDialog((p) => ({ ...p, open: false }))} variant="contained">Done</Button>
          </DialogActions>
        )}
      </Dialog>

      {/* ── Sub-dialogs ───────────────────────────────────────────────────── */}
      <AddContactDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={handleCreateContact}
      />
      <EditContactDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={handleUpdateContact}
        contact={contactForEdit}
      />
      <DeleteContactDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onSuccess={handleDeleteContacts}
        contacts={selected}
      />

      {/* ── Hidden CSV file input ─────────────────────────────────────────── */}
      <input
        type="file"
        accept=".csv,text/csv,text/plain,application/csv"
        ref={csvRef}
        style={{ display: 'none' }}
        onChange={handleImportFile}
      />

      {/* ── Snackbar ──────────────────────────────────────────────────────── */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={(_, reason) => { if (reason !== 'clickaway') setNotification((p) => ({ ...p, open: false })); }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setNotification((p) => ({ ...p, open: false }))}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
