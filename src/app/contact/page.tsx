import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Bappa — Get in Touch',
  description:
    'Have questions about Bappa digital business cards? Contact our team for demos, pricing information, or partnership opportunities.',
  openGraph: {
    title: 'Contact Bappa — Get in Touch',
    description:
      'Have questions about Bappa digital business cards? Contact our team for demos, pricing information, or partnership opportunities.',
    type: 'website',
    url: 'https://bappacards.com/contact',
  },
};

export default function ContactPage() {
  return (
    <Box component="main" id="main-content">
      {/* Hero Section */}
      <Box
        component="section"
        id="contact-hero"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: '#000',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', md: '3.5rem' },
              mb: 3,
            }}
          >
            Let&apos;s Connect
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Have questions? Want to see a demo? We&apos;re here to help you transform your
            professional networking.
          </Typography>
        </Container>
      </Box>

      {/* Form section — client component */}
      <Container maxWidth="lg" id="contact-form">
        <ContactForm />
      </Container>
    </Box>
  );
}
