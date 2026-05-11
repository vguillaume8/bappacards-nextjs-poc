'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  Tooltip,
  alpha,
  FormHelperText,
  CircularProgress,
  InputAdornment,
  Avatar,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CirclePicker, ChromePicker, type ColorResult } from 'react-color';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import LanguageIcon from '@mui/icons-material/Language';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LockIcon from '@mui/icons-material/Lock';
import X from '@mui/icons-material/X';

import { useAuth } from '@/context/AuthProvider';
import { updateProfile, updatePhoto } from '@/lib/api';
import QrCodeModal from '@/components/profile/QrCodeModal';
import AppleWalletModal from '@/components/profile/AppleWalletModal';
import ShareProfileMenu from '@/components/profile/ShareProfileMenu';

// ─── Types ────────────────────────────────────────────────────────────────────

type SocialPlatform =
  | 'website'
  | 'instagram'
  | 'twitter'
  | 'linkedin'
  | 'snapchat'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'whatsapp'
  | 'cashapp'
  | 'venmo'
  | 'paypal';

type WebsiteEntry = { name: string; url: string };

type SocialsMap = {
  website: WebsiteEntry[];
  instagram: string[];
  twitter: string[];
  linkedin: string[];
  snapchat: string[];
  tiktok: string[];
  facebook: string[];
  youtube: string[];
  whatsapp: string[];
  cashapp: string[];
  venmo: string[];
  paypal: string[];
};

interface ProfileFormData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  bio: string;
  cardTheme: string;
  linkColor: string;
  backgroundColor: string;
  matchLinkIcons: boolean;
  font: string;
  socials: SocialsMap;
  socialOrder: SocialPlatform[];
}

interface Preferences {
  font?: string;
  card_theme?: string;
  link_color?: string;
  background_color?: string;
  showSaveContactButton?: boolean;
  showExchangeContactButton?: boolean;
  showEmailButton?: boolean;
  [key: string]: unknown;
}

const DEFAULT_SOCIAL_ORDER: SocialPlatform[] = [
  'website',
  'instagram',
  'twitter',
  'linkedin',
  'snapchat',
  'tiktok',
  'facebook',
  'youtube',
  'whatsapp',
  'cashapp',
  'paypal',
  'venmo',
];

const COLOR_OPTIONS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
  '#ff5722', '#795548', '#607d8b', '#0f0f23', '#000000',
];

// ─── TabPanel ─────────────────────────────────────────────────────────────────

function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      style={{ padding: '12px 0' }}
    >
      {value === index && children}
    </div>
  );
}

// ─── Platform icon map ────────────────────────────────────────────────────────

function PlatformIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === 'website') return <LanguageIcon sx={{ mr: 1 }} />;
  if (platform === 'twitter') return <X sx={{ mr: 1 }} />;
  return (
    <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold', textTransform: 'capitalize' }}>
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </Typography>
  );
}

function platformLabel(platform: SocialPlatform): string {
  const labels: Record<SocialPlatform, string> = {
    website: 'Website',
    instagram: 'Instagram',
    twitter: 'X (Twitter)',
    linkedin: 'LinkedIn',
    snapchat: 'Snapchat',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    youtube: 'YouTube',
    whatsapp: 'WhatsApp',
    cashapp: 'Cash App',
    venmo: 'Venmo',
    paypal: 'PayPal',
  };
  return labels[platform];
}

function fieldLabel(platform: SocialPlatform): string {
  const labels: Partial<Record<SocialPlatform, string>> = {
    instagram: 'username',
    twitter: 'username (X)',
    tiktok: 'username',
    snapchat: 'username',
    cashapp: 'cashtag',
    venmo: 'username',
    paypal: 'username',
    linkedin: 'URL',
    youtube: 'URL',
    facebook: 'URL',
    whatsapp: 'number',
    website: '',
  };
  return labels[platform] ?? '';
}

function fieldPlaceholder(platform: SocialPlatform): string {
  const map: Partial<Record<SocialPlatform, string>> = {
    instagram: 'johndoe',
    twitter: 'johndoe',
    tiktok: 'johndoe',
    snapchat: 'johndoe',
    cashapp: 'cashtagname',
    venmo: 'username',
    paypal: 'username',
    linkedin: 'https://linkedin.com/in/johndoe',
    youtube: 'https://youtube.com/@channel',
    facebook: 'https://facebook.com/page',
    whatsapp: '19145551234',
  };
  return map[platform] ?? '';
}

function startAdornment(platform: SocialPlatform): React.ReactNode | undefined {
  if (['instagram', 'twitter', 'tiktok', 'snapchat'].includes(platform)) {
    return <InputAdornment position="start">@</InputAdornment>;
  }
  if (platform === 'cashapp') return <InputAdornment position="start">$</InputAdornment>;
  if (platform === 'whatsapp') return <InputAdornment position="start">+</InputAdornment>;
  return undefined;
}

// ─── SortableItem ─────────────────────────────────────────────────────────────

interface SortableItemProps {
  platform: SocialPlatform;
  formData: ProfileFormData;
  handleSocialChange: (
    platform: SocialPlatform,
    index: number,
    field: string | null,
    value: string,
  ) => void;
  removeSocialField: (platform: SocialPlatform, index: number) => void;
  addSocialField: (platform: SocialPlatform) => void;
}

function SortableItem({
  platform,
  formData,
  handleSocialChange,
  removeSocialField,
  addSocialField,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: platform });
  const theme = useTheme();

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };

  const values = formData.socials[platform];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 2,
        boxShadow: isDragging ? 3 : 0,
        borderColor: isDragging ? theme.palette.primary.main : 'inherit',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header row */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: 'grab',
              p: '4px',
              mr: 0.5,
              display: 'flex',
              alignItems: 'center',
              touchAction: 'none',
            }}
          >
            <DragIndicatorIcon color="action" />
          </Box>
          <PlatformIcon platform={platform} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {platformLabel(platform)}
          </Typography>
        </Box>

        {/* Fields */}
        {platform === 'website'
          ? (values as WebsiteEntry[]).map((entry, fieldIndex) => (
              <Box key={`website-${fieldIndex}`} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label={`Name ${fieldIndex + 1}`}
                  value={entry.name}
                  onChange={(e) => handleSocialChange(platform, fieldIndex, 'name', e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label={`URL ${fieldIndex + 1}`}
                  value={entry.url}
                  onChange={(e) => handleSocialChange(platform, fieldIndex, 'url', e.target.value)}
                  size="small"
                  sx={{ flex: 2 }}
                />
                <Tooltip title="Remove">
                  <IconButton
                    onClick={() => removeSocialField(platform, fieldIndex)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ))
          : (values as string[]).map((value, fieldIndex) => (
              <Box key={`${platform}-${fieldIndex}`} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label={`${platformLabel(platform)} ${fieldLabel(platform)}`}
                  placeholder={fieldPlaceholder(platform)}
                  value={value}
                  onChange={(e) => handleSocialChange(platform, fieldIndex, null, e.target.value)}
                  size="small"
                  slotProps={startAdornment(platform) ? { input: { startAdornment: startAdornment(platform) } } : undefined}
                />
                <Tooltip title="Remove">
                  <IconButton
                    onClick={() => removeSocialField(platform, fieldIndex)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}

        <Button
          startIcon={<AddIcon />}
          onClick={() => addSocialField(platform)}
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        >
          Add another {platform === 'website' ? 'website' : platformLabel(platform)}
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── ColorPickerSection ───────────────────────────────────────────────────────

interface ColorPickerSectionProps {
  label: string;
  description: string;
  color: string;
  onChange: (color: ColorResult) => void;
  isPremium: boolean;
}

function ColorPickerSection({ label, description, color, onChange, isPremium }: ColorPickerSectionProps) {
  const [advanced, setAdvanced] = useState(false);

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {description}
      </Typography>
      <Box sx={{ opacity: isPremium ? 1 : 0.6 }}>
        <CirclePicker
          color={color}
          onChange={onChange}
          colors={COLOR_OPTIONS}
          width="100%"
        />
        {isPremium && (
          <>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setAdvanced((p) => !p)}
              >
                {advanced ? 'Hide' : 'Custom'} Color Picker
              </Button>
            </Box>
            {advanced && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <ChromePicker color={color} onChange={onChange} disableAlpha={false} />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ManageProfile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser, userData, refreshUserData } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [appleWalletOpen, setAppleWalletOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' });

  // Photo file states
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [companyPhotoFile, setCompanyPhotoFile] = useState<File | null>(null);
  const [companyPhotoPreview, setCompanyPhotoPreview] = useState<string | null>(null);

  // Refs for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);

  // Preferences separate state (mirrors userData.links.preferences)
  const [preferences, setPreferences] = useState<Preferences>({});

  // Redirect state
  const [redirectEnabled, setRedirectEnabled] = useState(false);
  const [redirectLink, setRedirectLink] = useState('');

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    bio: '',
    cardTheme: '#4caf50',
    linkColor: '#000000',
    backgroundColor: '#ffffff',
    matchLinkIcons: false,
    font: 'DEFAULT',
    socials: {
      website: [{ name: '', url: '' }],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      snapchat: [''],
      tiktok: [''],
      facebook: [''],
      youtube: [''],
      whatsapp: [''],
      cashapp: [''],
      venmo: [''],
      paypal: [''],
    },
    socialOrder: DEFAULT_SOCIAL_ORDER,
  });

  const isPremium =
    (userData?.subscription as { status?: string } | undefined)?.status === 'active' ||
    (userData?.subscription as { status?: string } | undefined)?.status === 'trialing';

  // Hydrate form from userData
  useEffect(() => {
    if (!userData) return;
    const links = userData.links as Record<string, unknown> | undefined;
    const prefs = (links?.preferences ?? {}) as Preferences;

    setPreferences(prefs);
    setRedirectEnabled(!!(links?.custom_redirect) && isPremium);
    setRedirectLink((links?.custom_redirect as string) ?? '');

    const socialOrder = Array.isArray(links?.social_order) && (links?.social_order as string[]).length > 0
      ? (links.social_order as SocialPlatform[])
      : DEFAULT_SOCIAL_ORDER;

    setFormData({
      firstName: (links?.firstname as string) ?? '',
      lastName: (links?.lastname as string) ?? '',
      title: (links?.title as string) ?? '',
      company: (links?.company as string) ?? '',
      email: (links?.email as string) ?? '',
      phone: (links?.phone_number as string) ?? '',
      bio: (links?.bio as string) ?? '',
      cardTheme: (prefs.card_theme as string) ?? '#4caf50',
      linkColor: (prefs.link_color as string) ?? '#000000',
      backgroundColor: (prefs.background_color as string) ?? '#ffffff',
      matchLinkIcons: (links?.match_link_icons as boolean) ?? false,
      font: (prefs.font as string) ?? 'DEFAULT',
      socials: {
        website: (links?.websites as WebsiteEntry[])?.length
          ? (links?.websites as WebsiteEntry[])
          : [{ name: '', url: '' }],
        instagram: (links?.instagram_usernames as string[])?.length
          ? (links?.instagram_usernames as string[])
          : [''],
        twitter: (links?.twitter_usernames as string[])?.length
          ? (links?.twitter_usernames as string[])
          : [''],
        linkedin: (links?.linkedin_urls as string[])?.length
          ? (links?.linkedin_urls as string[])
          : [''],
        snapchat: (links?.snapchat_usernames as string[])?.length
          ? (links?.snapchat_usernames as string[])
          : [''],
        tiktok: (links?.tiktok_usernames as string[])?.length
          ? (links?.tiktok_usernames as string[])
          : [''],
        facebook: (links?.facebook_urls as string[])?.length
          ? (links?.facebook_urls as string[])
          : [''],
        youtube: (links?.youtube_urls as string[])?.length
          ? (links?.youtube_urls as string[])
          : [''],
        whatsapp: (links?.whatsapp_numbers as string[])?.length
          ? (links?.whatsapp_numbers as string[])
          : [''],
        cashapp: (links?.cashapp_usernames as string[])?.length
          ? (links?.cashapp_usernames as string[])
          : [''],
        venmo: (links?.venmo_usernames as string[])?.length
          ? (links?.venmo_usernames as string[])
          : [''],
        paypal: (links?.paypal_usernames as string[])?.length
          ? (links?.paypal_usernames as string[])
          : [''],
      },
      socialOrder,
    });
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (colorResult: ColorResult, field: keyof Pick<ProfileFormData, 'cardTheme' | 'linkColor' | 'backgroundColor'>) => {
    const value =
      colorResult.rgb.a !== undefined && colorResult.rgb.a < 1
        ? `rgba(${colorResult.rgb.r}, ${colorResult.rgb.g}, ${colorResult.rgb.b}, ${colorResult.rgb.a})`
        : colorResult.hex;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (
    platform: SocialPlatform,
    index: number,
    field: string | null,
    value: string,
  ) => {
    setFormData((prev) => {
      const newSocials = { ...prev.socials } as SocialsMap;
      if (platform === 'website') {
        const arr = [...(newSocials.website)];
        arr[index] = { ...arr[index], [field!]: value };
        newSocials.website = arr;
      } else {
        const arr = [...(newSocials[platform] as string[])];
        arr[index] = value;
        Object.assign(newSocials, { [platform]: arr });
      }
      return { ...prev, socials: newSocials };
    });
  };

  const addSocialField = (platform: SocialPlatform) => {
    setFormData((prev) => {
      const newSocials = { ...prev.socials } as SocialsMap;
      if (platform === 'website') {
        newSocials.website = [...newSocials.website, { name: '', url: '' }];
      } else {
        Object.assign(newSocials, { [platform]: [...(newSocials[platform] as string[]), ''] });
      }
      return { ...prev, socials: newSocials };
    });
  };

  const removeSocialField = (platform: SocialPlatform, index: number) => {
    setFormData((prev) => {
      const newSocials = { ...prev.socials } as SocialsMap;
      if (platform === 'website') {
        const arr = newSocials.website.filter((_, i) => i !== index);
        newSocials.website = arr.length > 0 ? arr : [{ name: '', url: '' }];
      } else {
        const arr = (newSocials[platform] as string[]).filter((_, i) => i !== index);
        Object.assign(newSocials, { [platform]: arr.length > 0 ? arr : [''] });
      }
      return { ...prev, socials: newSocials };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = formData.socialOrder.indexOf(active.id as SocialPlatform);
    const newIndex = formData.socialOrder.indexOf(over.id as SocialPlatform);
    setFormData((prev) => ({
      ...prev,
      socialOrder: arrayMove(prev.socialOrder, oldIndex, newIndex),
    }));
  };

  // Photo file pickers
  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'cover' | 'company',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    if (!isImage) {
      setSnackbar({ open: true, message: 'Please select a JPG, PNG, or WebP image.', severity: 'error' });
      return;
    }
    const preview = URL.createObjectURL(file);
    if (type === 'profile') {
      setProfilePhotoFile(file);
      setProfilePhotoPreview(preview);
    } else if (type === 'cover') {
      setCoverPhotoFile(file);
      setCoverPhotoPreview(preview);
    } else {
      setCompanyPhotoFile(file);
      setCompanyPhotoPreview(preview);
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!currentUser) return;
    setIsUpdating(true);
    try {
      const token = await currentUser.getIdToken();

      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        title: formData.title,
        company: formData.company,
        email: formData.email,
        phone_number: formData.phone,
        bio: formData.bio,
        instagram_usernames: (formData.socials.instagram as string[]).filter(Boolean),
        twitter_usernames: (formData.socials.twitter as string[]).filter(Boolean),
        linkedin_urls: (formData.socials.linkedin as string[]).filter(Boolean),
        snapchat_usernames: (formData.socials.snapchat as string[]).filter(Boolean),
        tiktok_usernames: (formData.socials.tiktok as string[]).filter(Boolean),
        facebook_urls: (formData.socials.facebook as string[]).filter(Boolean),
        youtube_urls: (formData.socials.youtube as string[]).filter(Boolean),
        whatsapp_numbers: (formData.socials.whatsapp as string[]).filter(Boolean),
        cashapp_usernames: (formData.socials.cashapp as string[]).filter(Boolean),
        venmo_usernames: (formData.socials.venmo as string[]).filter(Boolean),
        paypal_usernames: (formData.socials.paypal as string[]).filter(Boolean),
        websites: (formData.socials.website as WebsiteEntry[]).filter(
          (w) => w.url?.trim() || w.name?.trim(),
        ),
        social_order: formData.socialOrder,
        custom_redirect: redirectEnabled ? redirectLink : null,
        preferences: {
          ...preferences,
          card_theme: formData.cardTheme,
          link_color: formData.linkColor,
          background_color: formData.backgroundColor,
          font: formData.font,
        },
      };

      const res = await updateProfile(token, payload);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to update profile');
      }

      if (profilePhotoFile) {
        await updatePhoto(token, { photoType: 'profile', photo: profilePhotoFile });
        setProfilePhotoFile(null);
      }
      if (coverPhotoFile) {
        await updatePhoto(token, { photoType: 'background', photo: coverPhotoFile });
        setCoverPhotoFile(null);
      }
      if (companyPhotoFile) {
        await updatePhoto(token, { photoType: 'company', photo: companyPhotoFile });
        setCompanyPhotoFile(null);
      }

      await refreshUserData();
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Error updating profile. Please try again.', severity: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  // ── Derived values ────────────────────────────────────────────────────────

  const links = userData?.links as Record<string, unknown> | undefined;
  const profileId = (userData as Record<string, unknown> | null)?.profile_id as string | undefined;
  const profileUrl = `https://bappacards.com/u/${(links?.profile_url as string) ?? ''}`;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ px: { xs: 1, sm: 2, md: 3 }, py: 2, maxWidth: '1200px', mx: 'auto' }}
    >
      {/* Hidden file inputs */}
      <input
        ref={profileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => handleFileSelect(e, 'profile')}
      />
      <input
        ref={coverInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => handleFileSelect(e, 'cover')}
      />
      <input
        ref={companyInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => handleFileSelect(e, 'company')}
      />

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Manage Your Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Customize how your profile appears to others and manage your contact information.
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            '& .MuiTabs-scroller': {
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            },
          }}
        >
          <Tab icon={<PersonIcon />} label="Profile Info" sx={{ textTransform: 'none', py: 2 }} />
          <Tab icon={<ShareIcon />} label="Links & Socials" sx={{ textTransform: 'none', py: 2 }} />
          <Tab icon={<ColorLensIcon />} label="Appearance" sx={{ textTransform: 'none', py: 2 }} />
          <Tab icon={<SettingsIcon />} label="Settings" sx={{ textTransform: 'none', py: 2 }} />
        </Tabs>

        <Box sx={{ p: isMobile ? 2 : 4 }}>
          {/* ── Tab 0: Profile Info ─────────────────────────────────────── */}
          <TabPanel value={activeTab} index={0}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
              Personal Information
            </Typography>

            {/* Profile photo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar
                src={profilePhotoPreview ?? (links?.profile_photo as string) ?? undefined}
                sx={{ width: 80, height: 80 }}
              />
              <Box>
                <Typography variant="subtitle2" gutterBottom>Profile Photo</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PhotoCameraIcon />}
                  onClick={() => profileInputRef.current?.click()}
                >
                  {profilePhotoFile ? 'Change Photo' : 'Upload Photo'}
                </Button>
                {profilePhotoFile && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }} color="text.secondary">
                    {profilePhotoFile.name}
                  </Typography>
                )}
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Title / Role"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="e.g. Software Engineer, Founder"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="A short bio about yourself"
                />
              </Grid>

              {/* Company logo */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom>Company Logo</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {(companyPhotoPreview ?? (links?.company_photo as string)) && (
                    <Avatar
                      src={companyPhotoPreview ?? (links?.company_photo as string) ?? undefined}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PhotoCameraIcon />}
                    onClick={() => companyInputRef.current?.click()}
                  >
                    {companyPhotoFile ? 'Change Logo' : 'Upload Logo'}
                  </Button>
                  {companyPhotoFile && (
                    <Typography variant="caption" color="text.secondary">
                      {companyPhotoFile.name}
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Cover / background photo */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom>Cover / Background Photo</Typography>
                {(coverPhotoPreview ?? (links?.background_photo as string)) && (
                  <Box
                    component="img"
                    src={coverPhotoPreview ?? (links?.background_photo as string) ?? undefined}
                    alt="Cover photo preview"
                    sx={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 2, mb: 1 }}
                  />
                )}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PhotoCameraIcon />}
                  onClick={() => coverInputRef.current?.click()}
                >
                  {coverPhotoFile ? 'Change Cover' : 'Upload Cover'}
                </Button>
                {coverPhotoFile && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }} color="text.secondary">
                    {coverPhotoFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </TabPanel>

          {/* ── Tab 1: Links & Socials ──────────────────────────────────── */}
          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: 'medium' }}>
              Social Media & Websites
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your social media accounts and websites. Drag to reorder how they appear on your profile.
            </Typography>

            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 1 }}>
                <DragIndicatorIcon sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="body2" color="info.main">
                  Tap and hold the drag handle to reorder items
                </Typography>
              </Box>
            )}

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext items={formData.socialOrder} strategy={verticalListSortingStrategy}>
                {formData.socialOrder.map((platform) => (
                  <SortableItem
                    key={platform}
                    platform={platform}
                    formData={formData}
                    handleSocialChange={handleSocialChange}
                    removeSocialField={removeSocialField}
                    addSocialField={addSocialField}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </TabPanel>

          {/* ── Tab 2: Appearance ──────────────────────────────────────── */}
          <TabPanel value={activeTab} index={2}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
              Appearance
            </Typography>

            {!isPremium && (
              <Alert severity="info" sx={{ mb: 3 }}>
                Upgrade to Bappa Premium to fully customize your profile&apos;s colors and fonts.
              </Alert>
            )}

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ColorPickerSection
                  label="Card Theme Color"
                  description="Choose the main accent color for your profile card"
                  color={formData.cardTheme}
                  onChange={(c) => handleColorChange(c, 'cardTheme')}
                  isPremium={isPremium}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ColorPickerSection
                  label="Link Color"
                  description="Choose the color for your profile links"
                  color={formData.linkColor}
                  onChange={(c) => handleColorChange(c, 'linkColor')}
                  isPremium={isPremium}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ColorPickerSection
                  label="Background Color"
                  description="Choose the background color for your profile"
                  color={formData.backgroundColor}
                  onChange={(c) => handleColorChange(c, 'backgroundColor')}
                  isPremium={isPremium}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Font Style
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Choose the font for your profile
                </Typography>
                <Select
                  fullWidth
                  value={formData.font}
                  onChange={(e) => {
                    if (!isPremium) return;
                    setFormData((prev) => ({ ...prev, font: e.target.value }));
                  }}
                  disabled={!isPremium}
                >
                  <MenuItem value="DEFAULT">Default</MenuItem>
                  <MenuItem value="Roboto" sx={{ fontFamily: 'Roboto' }}>Roboto</MenuItem>
                  <MenuItem value="Open Sans" sx={{ fontFamily: 'Open Sans' }}>Open Sans</MenuItem>
                  <MenuItem value="Lato" sx={{ fontFamily: 'Lato' }}>Lato</MenuItem>
                  <MenuItem value="Montserrat" sx={{ fontFamily: 'Montserrat' }}>Montserrat</MenuItem>
                  <MenuItem value="Poppins" sx={{ fontFamily: 'Poppins' }}>Poppins</MenuItem>
                  <MenuItem value="Inter" sx={{ fontFamily: 'Inter' }}>Inter</MenuItem>
                  <MenuItem value="Oswald" sx={{ fontFamily: 'Oswald' }}>Oswald</MenuItem>
                  <MenuItem value="Raleway" sx={{ fontFamily: 'Raleway' }}>Raleway</MenuItem>
                  <MenuItem value="Playfair Display" sx={{ fontFamily: 'Playfair Display' }}>Playfair Display</MenuItem>
                  <MenuItem value="Merriweather" sx={{ fontFamily: 'Merriweather' }}>Merriweather</MenuItem>
                  <MenuItem value="Pacifico" sx={{ fontFamily: 'Pacifico' }}>Pacifico</MenuItem>
                  <MenuItem value="Dancing Script" sx={{ fontFamily: 'Dancing Script' }}>Dancing Script</MenuItem>
                  <MenuItem value="Lobster" sx={{ fontFamily: 'Lobster' }}>Lobster</MenuItem>
                </Select>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.matchLinkIcons}
                      onChange={(e) => {
                        if (!isPremium) return;
                        setFormData((prev) => ({ ...prev, matchLinkIcons: e.target.checked }));
                      }}
                      color="primary"
                      disabled={!isPremium}
                    />
                  }
                  label="Match link icons to card theme color"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* ── Tab 3: Settings ────────────────────────────────────────── */}
          <TabPanel value={activeTab} index={3}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
              Profile Settings
            </Typography>

            {/* Contact buttons */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }} gutterBottom>
                Contact Buttons
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.showSaveContactButton ?? true}
                      onChange={(e) => setPreferences((p) => ({ ...p, showSaveContactButton: e.target.checked }))}
                      color="primary"
                    />
                  }
                  label="Display Save Contact button"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.showExchangeContactButton ?? true}
                      onChange={(e) => setPreferences((p) => ({ ...p, showExchangeContactButton: e.target.checked }))}
                      color="primary"
                    />
                  }
                  label="Display Exchange Contact button"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.showEmailButton ?? false}
                      onChange={(e) => setPreferences((p) => ({ ...p, showEmailButton: e.target.checked }))}
                      color="primary"
                    />
                  }
                  label="Display Email button"
                />
                <FormHelperText>
                  When enabled, these buttons appear on your public profile.
                </FormHelperText>
              </Stack>
            </Paper>

            {/* Custom Redirect */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  Custom Redirect
                </Typography>
                {!isPremium && <LockIcon fontSize="small" color="action" />}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Automatically redirect visitors to another URL when they tap your card.
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={redirectEnabled}
                    onChange={(e) => {
                      if (!isPremium && e.target.checked) return;
                      setRedirectEnabled(e.target.checked);
                      if (!e.target.checked) setRedirectLink('');
                    }}
                    color="primary"
                    disabled={!isPremium}
                  />
                }
                label="Enable Custom Redirect"
              />
              {redirectEnabled && (
                <TextField
                  fullWidth
                  label="Redirect URL"
                  value={redirectLink}
                  onChange={(e) => setRedirectLink(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  placeholder="https://example.com"
                  helperText="Visitors will be automatically redirected to this URL"
                  disabled={!isPremium}
                />
              )}
              {!isPremium && (
                <Alert severity="info" sx={{ mt: 2 }} icon={<LockIcon />}>
                  Custom redirects require a Bappa Premium subscription.{' '}
                  <Button size="small" href="/my-subscription" color="inherit" variant="text">
                    Upgrade
                  </Button>
                </Alert>
              )}
            </Paper>

            {/* QR Code */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }} gutterBottom>
                QR Code
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generate or download your profile QR code.
              </Typography>
              <Button variant="outlined" onClick={() => setQrModalOpen(true)}>
                View QR Code
              </Button>
            </Paper>

            {/* Apple Wallet */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }} gutterBottom>
                Apple Wallet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add your BappaCard to Apple Wallet for quick sharing.
              </Typography>
              <Button variant="outlined" onClick={() => setAppleWalletOpen(true)}>
                Add to Apple Wallet
              </Button>
            </Paper>

            {/* Share */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }} gutterBottom>
                Share Your Card
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Share your digital business card with others.
              </Typography>
              {profileId && (
                <ShareProfileMenu profileId={profileId} onOpenQrModal={() => setQrModalOpen(true)} />
              )}
            </Paper>
          </TabPanel>
        </Box>

        {/* Footer action bar */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            alignItems: isMobile ? 'stretch' : 'center',
          }}
        >
          {profileId && (
            <Button
              variant="outlined"
              size="large"
              href={`/profile/${profileId}`}
              target="_blank"
              fullWidth={isMobile}
              sx={{ order: isMobile ? 2 : 1 }}
            >
              View Public Profile
            </Button>
          )}
          <LoadingButton
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
            loading={isUpdating}
            loadingIndicator={<CircularProgress size={18} color="inherit" />}
            startIcon={<SaveIcon />}
            fullWidth={isMobile}
            sx={{ order: isMobile ? 1 : 2 }}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Paper>

      {/* Modals */}
      <QrCodeModal open={qrModalOpen} onClose={() => setQrModalOpen(false)} url={profileUrl} />
      <AppleWalletModal
        open={appleWalletOpen}
        onClose={() => setAppleWalletOpen(false)}
        profileId={profileId}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
