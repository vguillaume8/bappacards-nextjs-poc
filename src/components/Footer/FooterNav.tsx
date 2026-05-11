import { Box, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

interface FooterLink {
  label: string;
  to?: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

const linkStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'inherit',
  textDecoration: 'none',
  display: 'block',
};

const FooterSection = ({ title, links }: FooterSectionProps) => {
  return (
    <Box>
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
        {title}
      </Typography>
      <Stack spacing={{ xs: 0.5, md: 0.75 }}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.to ?? '/'}
            style={linkStyle}
          >
            {link.label}
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

const FooterNav = () => {
  const companyLinks: FooterLink[] = [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Privacy Policy', to: '/privacy-notice' },
    { label: 'User Guide', to: '/guide' },
    { label: 'Quick Start', to: '/quick-guide' },
    { label: 'Blog', to: '/blog' },
    { label: 'Terms of Service', to: '/terms-of-service' },
  ];

  const solutionsLinks: FooterLink[] = [
    { label: 'Higher Ed Solutions', to: '/solutions/higher-ed' },
    { label: 'Admissions', to: '/solutions/higher-ed/admissions' },
    { label: 'Career Development', to: '/solutions/higher-ed/career-development' },
    { label: 'Alumni Engagement', to: '/solutions/higher-ed/institutional-advancement' },
    { label: 'Faculty & Research', to: '/solutions/higher-ed/faculty-research' },
    { label: 'Communications', to: '/solutions/higher-ed/communications-marketing' },
    { label: 'Leadership', to: '/solutions/higher-ed/leadership-governance' },
    { label: 'Student Affairs', to: '/solutions/higher-ed/student-affairs' },
  ];

  const compareLinks: FooterLink[] = [
    { label: 'BappaCards vs HiHello', to: '/vs/hihello' },
    { label: 'BappaCards vs Popl', to: '/vs/popl' },
    { label: 'BappaCards vs Mobilo', to: '/vs/mobilo' },
  ];

  return (
    <>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <FooterSection title="COMPANY" links={companyLinks} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <FooterSection title="SOLUTIONS" links={solutionsLinks} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <FooterSection title="COMPARE" links={compareLinks} />
      </Grid>
    </>
  );
};

export default FooterNav;
