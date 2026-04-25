import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'Digital Cards', href: 'https://bappacards.com/products' },
    { label: 'NFC Cards', href: 'https://bappacards.com/products' },
    { label: 'Pricing', href: 'https://bappacards.com/products#pricing' },
    { label: 'Getting Started', href: 'https://bappacards.com/guide' },
  ],
  Company: [
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: 'https://bappacards.com/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: 'https://bappacards.com/privacy' },
    { label: 'Terms of Service', href: 'https://bappacards.com/terms' },
  ],
};

const linkStyle = {
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'color 0.15s',
} as const;

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#111', color: 'rgba(255,255,255,0.7)', py: 8, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{ color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2 }}
            >
              Bappa<Box component="span" sx={{ color: '#EB1C24' }}>Cards</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 300, lineHeight: 1.7 }}>
              The modern digital business card for professionals who want to make a lasting impression.
            </Typography>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size={{ xs: 6, md: 2 }} key={category}>
              <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600, mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                {category}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a href={link.href} style={linkStyle}>{link.label}</a>
                    ) : (
                      <Link href={link.href} style={linkStyle}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 6, pt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} BappaCards. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
