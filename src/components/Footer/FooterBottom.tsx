import { Box, Typography, Stack } from '@mui/material';
import Link from 'next/link';

const footerLinkStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.6)',
  textDecoration: 'none',
};

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: { xs: 0.75, sm: 1 },
        pt: { xs: 1, md: 1.5 },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        &copy; {currentYear} BappaCards. All rights reserved.
      </Typography>

      {/* Desktop-only legal links — hidden on mobile via CSS, no client hook needed */}
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Link href="/privacy-notice" style={footerLinkStyle}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" style={footerLinkStyle}>
          Terms of Service
        </Link>
      </Stack>

      {/* Required by Google when hiding reCAPTCHA badge */}
      <Typography
        variant="body2"
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" tabIndex={-1} style={footerLinkStyle}>
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" tabIndex={-1} style={footerLinkStyle}>
          Terms of Service
        </a>{' '}
        apply.
      </Typography>
    </Box>
  );
};

export default FooterBottom;
