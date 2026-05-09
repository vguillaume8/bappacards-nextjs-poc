import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Higher Ed Solutions — Bappa Digital Business Cards',
  description:
    'Transform networking across your campus with Bappa digital business cards. Solutions for admissions, career services, alumni relations, and more.',
  alternates: { canonical: 'https://bappacards.com/solutions/higher-ed' },
  openGraph: {
    title: 'Higher Ed Solutions — Bappa',
    description:
      'Transform networking across your campus with Bappa digital business cards. Solutions for admissions, career services, alumni relations, and more.',
    url: 'https://bappacards.com/solutions/higher-ed',
  },
};

const departments = [
  {
    title: 'Admissions & Enrollment',
    description: 'Turn campus visits and college fairs into lasting connections. Track engagement and never lose a prospective student.',
    href: '/solutions/higher-ed/admissions',
  },
  {
    title: 'Career Development & Employer Relations',
    description: 'Empower students to network like professionals at career fairs and employer events.',
    href: '/solutions/higher-ed/career-development',
  },
  {
    title: 'Faculty & Research',
    description: 'Connect minds across disciplines. Make it easy for faculty to share their research and contact info at conferences.',
    href: '/solutions/higher-ed/faculty-research',
  },
  {
    title: 'Institutional Advancement & Alumni Engagement',
    description: 'Build lasting alumni and donor relationships with a digital card that represents your institution\'s prestige.',
    href: '/solutions/higher-ed/institutional-advancement',
  },
  {
    title: 'Communications & Marketing',
    description: 'Amplify your brand at every touchpoint. Every staff card is an ambassador for your institution.',
    href: '/solutions/higher-ed/communications-marketing',
  },
  {
    title: 'Leadership & Governance',
    description: 'Help university leaders make lasting impressions at board meetings, conferences, and community events.',
    href: '/solutions/higher-ed/leadership-governance',
  },
  {
    title: 'Student Affairs & Student Government',
    description: 'Empower student leaders with professional digital cards that enhance campus life and engagement.',
    href: '/solutions/higher-ed/student-affairs',
  },
];

export default function HigherEdPage() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EB1C24 0%, #8B0000 100%)',
          color: '#fff',
          py: { xs: 10, md: 16 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="p"
            variant="overline"
            sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 4, mb: 2 }}
          >
            HIGHER EDUCATION SOLUTIONS
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            Be the Campus Everyone Remembers.
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, mb: 5, maxWidth: 600, mx: 'auto' }}>
            From admissions to alumni, Bappa digital business cards help every department on campus network smarter, track connections, and build lasting relationships.
          </Typography>
          <Button

            href="/contact"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#fff',
              color: '#EB1C24',
              fontWeight: 700,
              px: 5,
              py: 1.5,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            }}
          >
            Talk to Our Team
          </Button>
        </Container>
      </Box>

      {/* Departments Grid */}
      <Box sx={{ py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Solutions by Department
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.6)', textAlign: 'center', mb: 8, maxWidth: 540, mx: 'auto' }}>
            Every corner of campus has unique networking needs. We&apos;ve built tailored solutions for each.
          </Typography>

          <Grid container spacing={3}>
            {departments.map((dept, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <Link href={dept.href} style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 3,
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)',
                        borderColor: 'rgba(235,28,36,0.3)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ width: 40, height: 4, backgroundColor: '#EB1C24', borderRadius: 2, mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 1.5, flex: 1 }}
                      >
                        {dept.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, mb: 2 }}>
                        {dept.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#EB1C24', mt: 'auto' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                          Learn more
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 14 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            Ready to Transform Campus Networking?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, mb: 5 }}>
            Let&apos;s talk about how Bappa can help your institution create more meaningful connections.
          </Typography>
          <Button

            href="/contact"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#EB1C24',
              color: '#fff',
              fontWeight: 700,
              px: 5,
              py: 1.5,
              '&:hover': { backgroundColor: '#D71920' },
            }}
          >
            Get in Touch
          </Button>
        </Container>
      </Box>
    </>
  );
}
