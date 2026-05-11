'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => setSnackbarOpen(true));
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, pb: 2, borderBottom: '1px solid #f0f0f0' }}>
        <Typography variant="caption"
          sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary', mr: 1 }}>
          Share
        </Typography>
        <IconButton
          size="small"
          component="a"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#0A66C2', '&:hover': { bgcolor: 'rgba(10,102,194,0.08)' } }}
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          component="a"
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#000', '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' } }}
          aria-label="Share on X"
        >
          <XIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleCopyLink}
          sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' } }}
          aria-label="Copy link"
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
