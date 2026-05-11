'use client';

import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useAuth } from '@/context/AuthProvider';
import { generateAppleWalletPass } from '@/lib/api';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: { xs: '95%', sm: 420 },
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  p: 4,
};

function getDeviceInfo() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  return { isIOS, isAndroid };
}

interface AppleWalletModalProps {
  open: boolean;
  onClose: () => void;
  profileId?: string;
}

export default function AppleWalletModal({ open, onClose, profileId }: AppleWalletModalProps) {
  const { currentUser, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passUrl, setPassUrl] = useState<string | null>(null);

  const { isIOS, isAndroid } = getDeviceInfo();

  const sub = userData?.subscription as { plan?: string; status?: string } | undefined;
  const hasPremiumSubscription =
    (sub?.plan === 'bappa-premium' || sub?.plan === 'bappa-premium-plus') &&
    (sub?.status === 'active' || sub?.status === 'trialing');

  const handleGeneratePass = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await currentUser.getIdToken();
      const response = await generateAppleWalletPass(token);

      if (!response || !('data' in response) || !response.data) {
        const msg = 'message' in response ? response.message : 'Failed to generate Apple Wallet pass';
        throw new Error(msg);
      }

      const data = response.data as { url?: string } | string;
      const url = typeof data === 'string' ? data : (data.url ?? '');
      setPassUrl(url);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate Apple Wallet pass');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setPassUrl(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="apple-wallet-modal-title" disableScrollLock>
      <Box sx={modalStyle}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>

        {success ? (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mt: 2, color: 'success.main' }}>
              Success!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Your Apple Wallet pass has been generated.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Follow the on-screen instructions to add it to your Apple Wallet.
            </Typography>
            {passUrl && (
              <>
                <Button
                  variant="contained"
                  sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' }, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                  startIcon={<AppleIcon />}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = passUrl;
                    link.setAttribute('download', '');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Add to Apple Wallet
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Didn&apos;t work?{' '}
                  <Link href={passUrl} target="_blank" rel="noopener noreferrer">Open in Safari</Link>
                </Typography>
              </>
            )}
          </Box>
        ) : !hasPremiumSubscription ? (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <LockIcon sx={{ fontSize: 60, color: '#dc004e' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mt: 2 }}>
                Premium Feature
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Apple Wallet integration is a premium feature available exclusively to Bappa Premium subscribers.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }} gutterBottom>
                With Bappa Premium you get:
              </Typography>
              {[
                'Full Profile Customization – change fonts, colors, and layout',
                'Upload Videos as Your Background – make your card truly unforgettable',
                'Verified Badge – build trust and credibility',
                'Apple Wallet Integration – share your card instantly',
                'Contact Prioritization – tag contacts as High, Medium, or Low',
                'Link Analytics – track which links get the most engagement',
                'Tap Location Tracking – see where your card is tapped',
                'City-Based Connection Mapping – know where contacts are made',
              ].map((feature) => (
                <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <StarIcon sx={{ color: '#dc004e', mr: 1, fontSize: 'small' }} />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                href="/my-subscription"
                sx={{ bgcolor: '#dc004e', '&:hover': { bgcolor: '#e64a2e' } }}
              >
                Upgrade to Premium
              </Button>
            </Box>
          </>
        ) : isAndroid ? (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <PhoneIphoneIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mt: 2 }}>
              iOS Only
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
              Apple Wallet is available on iOS devices. Google Wallet support coming soon!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              In the meantime, you can share your profile link directly.
            </Typography>
            <Button
              variant="contained"
              href={profileId ? `/profile/${profileId}` : '#'}
              target="_blank"
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
            >
              Open My Profile
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <AppleIcon sx={{ fontSize: 60, color: '#000' }} />
              <Typography id="apple-wallet-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', mt: 2 }}>
                Add to Apple Wallet
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Generate a digital card for your Apple Wallet that contains your BappaCard profile information and QR code.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {isIOS
                ? 'Once generated, follow the on-screen instructions to add it to your Wallet.'
                : 'Once generated, open the file on your iOS device to add it to your Apple Wallet. For best results, use Safari on iPhone.'}
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" onClick={handleClose} disabled={loading}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleGeneratePass}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AppleIcon />}
                sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' }, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
              >
                {loading ? 'Generating...' : 'Add to Apple Wallet'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
