import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

const FooterLogo = () => {
  return (
    <Grid
      size={{ xs: 12, md: 3 }}
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {/* Text logo — image asset not yet migrated */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            color: '#fff',
            fontSize: '1.25rem',
            mb: 1.5,
            transition: 'opacity 0.2s ease',
            '&:hover': { opacity: 0.85 },
          }}
        >
          BappaCards
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '240px',
          }}
        >
          Digital business cards for modern professionals.
        </Typography>
      </Link>
    </Grid>
  );
};

export default FooterLogo;
