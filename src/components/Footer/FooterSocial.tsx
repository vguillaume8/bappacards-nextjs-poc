import { Box, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Instagram as InstagramIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';

const iconButtonSx = {
  transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    color: '#EB1C24',
    transform: 'scale(1.1)',
  },
  '&:focus-visible': {
    outline: '3px solid #EB1C24',
    outlineOffset: '2px',
  },
};

const FooterSocial = () => {
  return (
    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
      <Typography
        variant="subtitle2"
        component="h3"
        sx={{
          mb: { xs: 1, md: 1.5 },
          fontWeight: 700,
          fontSize: '0.875rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        STAY UPDATED
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: { xs: 0.75, md: 1 },
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.6,
          fontSize: '0.875rem',
        }}
      >
        Connect with us to stay up to date on latest Bappa News!
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          color="inherit"
          aria-label="Visit our Instagram page"
          component="a"
          href="https://instagram.com/bappacards"
          target="_blank"
          rel="noopener noreferrer"
          sx={iconButtonSx}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Visit our LinkedIn page"
          component="a"
          href="https://www.linkedin.com/company/bappa-cards"
          target="_blank"
          rel="noopener noreferrer"
          sx={iconButtonSx}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default FooterSocial;
