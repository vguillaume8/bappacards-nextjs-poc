'use client';

import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SmsIcon from '@mui/icons-material/Sms';
import EmailIcon from '@mui/icons-material/Email';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShareIcon from '@mui/icons-material/Share';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bappacards.com';

interface ShareProfileMenuProps {
  profileId: string;
  onOpenQrModal: () => void;
}

export default function ShareProfileMenu({ profileId, onOpenQrModal }: ShareProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const open = Boolean(anchorEl);

  const profileUrl = `${SITE_URL}/profile/${profileId}`;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = profileUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnackOpen(true);
    handleClose();
  };

  const handleShareViaText = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my BappaCards profile',
          text: 'Check out my digital business card:',
          url: profileUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      window.open(`sms:?body=${encodeURIComponent(`Check out my digital business card: ${profileUrl}`)}`, '_self');
    }
    handleClose();
  };

  const handleShareViaEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent('Check out my BappaCards profile')}&body=${encodeURIComponent(`Here's my digital business card: ${profileUrl}`)}`,
      '_self',
    );
    handleClose();
  };

  const handleShareQrCode = () => {
    onOpenQrModal();
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        startIcon={<ShareIcon />}
        sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
      >
        Share
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: { borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', mt: 1 } } }}
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareViaText}>
          <ListItemIcon><SmsIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Share via Text</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareViaEmail}>
          <ListItemIcon><EmailIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Share via Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareQrCode}>
          <ListItemIcon><QrCode2Icon fontSize="small" /></ListItemIcon>
          <ListItemText>Share QR Code</ListItemText>
        </MenuItem>
      </Menu>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Profile link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
