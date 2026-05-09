import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Bappa — Leave Your Mark, Connect with Purpose',
  description:
    "Learn about Bappa's mission to revolutionize professional networking with purpose-driven digital business cards. Discover our story, values, and vision.",
  openGraph: {
    title: 'About Bappa — Leave Your Mark, Connect with Purpose',
    description:
      "Learn about Bappa's mission to revolutionize professional networking with purpose-driven digital business cards.",
    type: 'website',
    url: 'https://bappacards.com/about',
    images: [{ url: 'https://bappacards.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Bappa — Leave Your Mark, Connect with Purpose',
    description:
      "Learn about Bappa's mission to revolutionize professional networking with purpose-driven digital business cards.",
  },
};

const coreValues = [
  {
    title: 'Connection with Purpose',
    description:
      'Building meaningful professional relationships that go beyond surface-level networking.',
  },
  {
    title: 'Innovation with Integrity',
    description:
      'Embracing cutting-edge technology while maintaining ethical standards and user trust.',
  },
  {
    title: 'Design with Intention',
    description:
      'Every element serves a purpose, creating intuitive and beautiful user experiences.',
  },
  {
    title: 'Sustainability in Action',
    description:
      'Reducing waste through digital-first solutions that benefit both people and planet.',
  },
  {
    title: 'Empowerment through Data',
    description:
      'Providing insights that help users make informed decisions about their networking.',
  },
];

export default function AboutPage() {
  return (
    <Box component="main" id="main-content">
      {/* Hero Section */}
      <Box
        component="section"
        id="about-hero"
        sx={{
          py: { xs: 8, md: 12 },
          background: '#EB1C24',
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
              lineHeight: 1.15,
            }}
          >
            Leave Your Mark. Connect with Purpose.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              opacity: 0.95,
              maxWidth: 680,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            At Bappa, we believe every connection tells a story. Our digital business cards are
            more than technology—they&apos;re a modern way to honor tradition while building the
            future.
          </Typography>
        </Container>
      </Box>

      {/* Our Story */}
      <Box component="section" id="about-brand-story" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Our Story
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                Bappa was born from a simple yet powerful idea: that your professional identity
                should be as unique as your fingerprint. Our founder&apos;s grandfather used to
                say that every person leaves their mark on the world—a philosophy that inspired
                our iconic fingerprint logo and our commitment to helping professionals make
                lasting impressions.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                In a world moving toward digital transformation, we saw an opportunity to bridge
                tradition with innovation. The business card has been a networking staple for
                centuries, but it was time to reimagine it for the modern professional—someone
                who values sustainability, data-driven insights, and meaningful connections.
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                height: 320,
                borderRadius: '16px',
                bgcolor: 'rgba(235,28,36,0.08)',
                border: '2px solid rgba(235,28,36,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                },
              }}
            >
              <Typography variant="h2" sx={{ opacity: 0.3 }}>
                ☝
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Fingerprint Philosophy */}
      <Box component="section" id="about-fingerprint-section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                The Fingerprint Philosophy
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                Just as no two fingerprints are alike, no two professional journeys are the same.
                Your Bappa card is your unique digital fingerprint—a reflection of your personal
                brand, values, and the connections you build.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                We&apos;ve woven this philosophy into every aspect of our product, from our logo to
                our commitment to helping you create a truly distinctive professional presence.
              </Typography>
            </Box>
            <Box
              sx={{
                height: 320,
                borderRadius: '16px',
                bgcolor: 'rgba(0,0,0,0.04)',
                border: '2px solid rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(235,28,36,0.12)',
                },
              }}
            >
              <Typography variant="h2" sx={{ opacity: 0.25 }}>
                ◈
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Purpose / Vision / Mission */}
      <Box component="section" id="about-purpose" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="h3" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Our Purpose
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                To empower professionals to build authentic, meaningful connections through
                innovative digital solutions that honor individuality and drive real-world impact.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                A world where every professional interaction is purposeful, sustainable, and
                powered by technology that enhances rather than replaces the human element of
                networking.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                To revolutionize professional networking by providing intuitive, data-rich
                digital business cards that help individuals and organizations connect, grow,
                and leave their mark.
              </Typography>
            </Box>
          </Box>

          {/* Core Values */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ mb: 6, fontWeight: 700, textAlign: 'center' }}
            >
              Our Core Values
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {coreValues.map((value, index) => (
                <Box
                  key={index}
                  component="article"
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography variant="h5" component="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2">{value.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component="section"
        id="about-cta"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'secondary.main',
          color: 'common.white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Leave Your Mark?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: 560, mx: 'auto' }}>
            Join thousands of professionals who are reimagining networking with Bappa.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              href="/sign-up"
              sx={{
                bgcolor: '#EB1C24',
                '&:hover': { bgcolor: '#D71920' },
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '8px',
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href="/contact"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '8px',
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
