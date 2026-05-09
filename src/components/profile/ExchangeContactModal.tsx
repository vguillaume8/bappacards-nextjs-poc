'use client';

import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { BappaProfile } from '@/lib/api';
import ExchangeContactForm from './ExchangeContactForm';

interface ExchangeContactModalProps {
  open: boolean;
  onClose: () => void;
  profileId: string;
  profile: BappaProfile;
}

export default function ExchangeContactModal({
  open,
  onClose,
  profileId,
  profile,
}: ExchangeContactModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        Exchange Contact
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ExchangeContactForm
          profileId={profileId}
          profile={profile}
          mode="modal"
          open={open}
          onSuccess={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
