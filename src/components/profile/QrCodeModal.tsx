'use client';

import React, { useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: { xs: '90%', sm: 400 },
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  p: 4,
};

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

export default function QrCodeModal({ open, onClose, url }: QrCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'bappacards-qr-code.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnackOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} disableScrollLock>
        <Box sx={modalStyle}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
            Scan the QR Code
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
            to view this card on other devices
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            {url && (
              <QRCodeCanvas
                ref={canvasRef}
                value={url}
                size={256}
                marginSize={2}
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}>
              Download QR
            </Button>
            <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyLink} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}>
              Copy Link
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
