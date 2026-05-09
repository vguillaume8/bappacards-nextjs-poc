import { Box, Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import FooterSocial from './FooterSocial';
import FooterBottom from './FooterBottom';

const Footer = () => {
  return (
    <Box
      component="footer"
      aria-label="Site footer"
      sx={{
        backgroundColor: '#000000', // Black — secondary.main
        color: '#FFFFFF',
        pt: { xs: 2, md: 5 },
        pb: { xs: 1.5, md: 4 },
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          <FooterLogo />
          <FooterNav />
          <FooterSocial />
        </Grid>

        <Divider
          sx={{
            my: { xs: 1, md: 1.5 },
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          }}
        />

        <FooterBottom />
      </Container>
    </Box>
  );
};

export default Footer;
