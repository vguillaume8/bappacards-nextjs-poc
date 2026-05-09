import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const metadata: Metadata = {
  title: 'Privacy Notice — BappaCards',
  description:
    'BappaCards Privacy Policy. Learn how we collect, use, and protect your personal information when you use our digital business card services.',
  openGraph: {
    title: 'Privacy Notice — BappaCards',
    description: 'BappaCards Privacy Policy and data practices.',
    type: 'website',
    url: 'https://bappacards.com/privacy-notice',
  },
};

const accordionSx = {
  mb: 2,
  border: '1px solid #e0e0e0',
  borderRadius: '4px !important',
  '&:before': { display: 'none' },
};

const summarySx = { bgcolor: '#f8f9fa' };

export default function PrivacyNoticePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Privacy Notice
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page outlines how BappaCards collects, uses, and protects your personal information.
        </Typography>
      </Paper>

      {/* Legal page navigation */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#EB1C24' }}>
          Privacy Notice
        </Typography>
        <Typography variant="body2" color="text.secondary">|</Typography>
        <Link href="/terms-of-service" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#EB1C24' } }}>
            Terms of Service
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">|</Typography>
        <Link href="/affiliate-terms" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#EB1C24' } }}>
            Affiliate Terms
          </Typography>
        </Link>
      </Stack>

      <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium', mb: 1 }}>
        Privacy Policy
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        <strong>Effective Date:</strong> January 1st, 2022 | <strong>Last Updated:</strong> May 2026
      </Typography>
      <Typography variant="body1">
        Welcome to BappaCards, a digital business card platform. We are committed to protecting your
        personal information and respecting your privacy. This Privacy Policy explains how we collect,
        use, and protect your information when you use our services.
      </Typography>

      {/* 1. Information We Collect */}
      <Accordion defaultExpanded sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>1. Information We Collect</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            We collect several types of information from and about users of our Services, including:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>1.1 Personal Information</Typography>
          <Typography variant="body1">
            When you register for and use our Services, we may collect the following personal information:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li><Typography variant="body1"><strong>Contact Information:</strong> First name, last name, email address, phone number, and professional title.</Typography></li>
            <li><Typography variant="body1"><strong>Professional Information:</strong> Company name, job title, department, and business address.</Typography></li>
            <li><Typography variant="body1"><strong>Social Media Profiles:</strong> Links to your professional social media accounts (e.g., LinkedIn, Twitter, GitHub).</Typography></li>
            <li><Typography variant="body1"><strong>Profile Image:</strong> Photographs or avatars you choose to associate with your account.</Typography></li>
            <li><Typography variant="body1"><strong>Custom Fields:</strong> Any additional information you choose to include on your digital business card.</Typography></li>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>1.2 Usage Information</Typography>
          <Typography variant="body1">
            We automatically collect certain information about your device and how you interact with our Services:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li><Typography variant="body1"><strong>Device Information:</strong> IP address, browser type, operating system, device type, and mobile device identifiers.</Typography></li>
            <li><Typography variant="body1"><strong>Usage Data:</strong> Information about how you use our Services, including pages visited, features used, and actions taken.</Typography></li>
            <li><Typography variant="body1"><strong>Card Interactions:</strong> Data on when your digital business card is viewed, shared, or saved by others.</Typography></li>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 2. How We Use Your Information */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>2. How We Use Your Information</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">We use the information we collect for various purposes, including:</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>2.1 Providing and Improving Our Services</Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li><Typography variant="body1">Creating and managing your BappaCards account and digital business cards.</Typography></li>
            <li><Typography variant="body1">Displaying your information on digital business cards you choose to share.</Typography></li>
            <li><Typography variant="body1">Processing transactions and fulfilling orders for premium features or subscriptions.</Typography></li>
            <li><Typography variant="body1">Analyzing usage patterns to improve our Services and develop new features.</Typography></li>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 3. Information Sharing */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>3. Information Sharing</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">We may share your information in the following circumstances:</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>3.1 With Your Consent</Typography>
          <Typography variant="body1">
            We share your personal information when you explicitly consent to the sharing, such as when you choose to share your digital business card with others.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>3.2 Service Providers</Typography>
          <Typography variant="body1">
            We may share your information with third-party vendors, service providers, contractors, or agents who perform services on our behalf, such as cloud storage providers, payment processors, and analytics providers.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 4. Data Security */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>4. Data Security</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please understand that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li><Typography variant="body1"><strong>Encryption:</strong> We use industry-standard encryption to protect your data in transit and at rest.</Typography></li>
            <li><Typography variant="body1"><strong>Access Controls:</strong> We restrict access to your personal information to employees, contractors, and agents who need to know that information to provide services to you.</Typography></li>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 5. Your Rights */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>5. Your Rights</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            Depending on your location, you may have certain rights regarding your personal information.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>5.1 Access and Information</Typography>
          <Typography variant="body1">
            You have the right to access the personal information we hold about you and to receive information about how we use it.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>5.2 Correction</Typography>
          <Typography variant="body1">
            You have the right to request that we correct any inaccurate or incomplete personal information we hold about you.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>5.3 Deletion</Typography>
          <Typography variant="body1">
            You have the right to request that we delete your personal information in certain circumstances, such as when it is no longer necessary for the purposes for which it was collected.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 6. Changes to Privacy Policy */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>6. Changes to Privacy Policy</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li><Typography variant="body1">Posting the updated Privacy Policy on our website</Typography></li>
            <li><Typography variant="body1">Updating the &quot;Last Updated&quot; date at the top of this Privacy Policy</Typography></li>
            <li><Typography variant="body1">Sending an email notification to the email address associated with your account (for significant changes)</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your continued use of our Services after any changes constitutes your acceptance of the updated policy.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 7. Contact Us */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>7. Contact Us</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please{' '}
            <Link href="/contact" style={{ color: '#EB1C24' }}>contact us</Link> or email us at{' '}
            <strong>support@bappacards.com</strong>.
          </Typography>
          <Typography variant="body1">
            We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
