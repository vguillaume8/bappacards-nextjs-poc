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
  title: 'Terms of Service — BappaCards',
  description:
    'BappaCards Terms of Service. These terms govern your access to and use of BappaCards website, services, and applications.',
  openGraph: {
    title: 'Terms of Service — BappaCards',
    description: 'BappaCards Terms of Service governing your use of our platform.',
    type: 'website',
    url: 'https://bappacards.com/terms-of-service',
  },
};

const accordionSx = {
  mb: 2,
  border: '1px solid #e0e0e0',
  borderRadius: '4px !important',
  '&:before': { display: 'none' },
};

const summarySx = { bgcolor: '#f8f9fa' };

export default function TermsOfServicePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Terms of Service
        </Typography>
        <Typography variant="body1" color="text.secondary">
          These terms govern your access to and use of BappaCards&apos; website, services, and applications.
        </Typography>
      </Paper>

      {/* Legal page navigation */}
      <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Link href="/privacy-notice" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#EB1C24' } }}>
            Privacy Notice
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">|</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#EB1C24' }}>
          Terms of Service
        </Typography>
        <Typography variant="body2" color="text.secondary">|</Typography>
        <Link href="/affiliate-terms" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#EB1C24' } }}>
            Affiliate Terms
          </Typography>
        </Link>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        <strong>Effective Date:</strong> January 1st, 2022 | <strong>Last Updated:</strong> May 2026
      </Typography>
      <Typography variant="body1">
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of BappaCards&apos; website, services,
        and applications (collectively, the &quot;Services&quot;). Please read these Terms carefully before using our Services.
      </Typography>

      {/* 1. Acceptance of Terms */}
      <Accordion defaultExpanded sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>1. Acceptance of Terms</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            By accessing or using our Services, you acknowledge that you have read, understood, and agree to be
            bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
          </Typography>
          <Typography variant="body1">
            We may modify these Terms at any time. If we make changes, we will provide notice of such changes. Your
            continued use of our Services following notification of changes will constitute your acceptance of such changes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 2. Use of the Platform */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>2. Use of the Platform</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>2.1 Eligibility</Typography>
          <Typography variant="body1">
            To use our Services, you must be at least 18 years old and capable of forming a binding contract with BappaCards.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>2.2 Account Registration</Typography>
          <Typography variant="body1">
            To access certain features of our Services, you may need to register for an account. When you register, you agree
            to provide accurate, current, and complete information about yourself. You are responsible for safeguarding your
            account credentials and for all activities that occur under your account.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>2.3 Prohibited Activities</Typography>
          <Typography variant="body1">You agree not to engage in any of the following prohibited activities:</Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li><Typography variant="body1">Using our Services for any illegal purpose or in violation of any local, state, national, or international law</Typography></li>
            <li><Typography variant="body1">Violating or infringing other people&apos;s intellectual property, privacy, publicity, or other legal rights</Typography></li>
            <li><Typography variant="body1">Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity</Typography></li>
            <li><Typography variant="body1">Interfering with or disrupting the Services or servers or networks connected to the Services</Typography></li>
            <li><Typography variant="body1">Attempting to gain unauthorized access to any part of our Services, other accounts, or computer systems</Typography></li>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* 3. Communications & Marketing Consent */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>3. Communications and Marketing Consent</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>3.1 Email Marketing Communications</Typography>
          <Typography variant="body1">
            By creating an account and using our Services, you consent to receive marketing and promotional emails from BappaCards.
            These may include product updates, special offers, educational content, newsletters, and surveys.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>3.2 Text Messaging (SMS) Communications</Typography>
          <Typography variant="body1">
            By providing your mobile phone number and opting in to text messaging, you expressly consent to receive automated
            marketing text messages (SMS/MMS) from BappaCards. Message and data rates may apply. Message frequency may vary.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>3.3 Opting Out</Typography>
          <Typography variant="body1">
            You may opt out at any time. For emails, click the &quot;unsubscribe&quot; link at the bottom of any marketing email.
            For text messages, reply &quot;STOP&quot; to any text message.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>3.4 Communication Preferences</Typography>
          <Typography variant="body1">
            You can manage your communication preferences by logging into your account and accessing the Settings or Preferences
            section, or by contacting our support team.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 4. User Accounts */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>4. User Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>4.1 Account Responsibility</Typography>
          <Typography variant="body1">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that
            occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>4.2 Account Termination</Typography>
          <Typography variant="body1">
            We reserve the right to suspend or terminate your account and access to our Services at any time, without notice,
            for conduct that we determine violates these Terms or is harmful to other users.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 5. User Content */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>5. User Content</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>5.1 Content Ownership</Typography>
          <Typography variant="body1">
            You retain all ownership rights to the content you submit, post, or display on or through our Services.
            By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
            modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content
            in connection with providing and promoting our Services.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>5.2 Content Responsibility</Typography>
          <Typography variant="body1">
            You are solely responsible for your User Content. By uploading User Content, you represent and warrant that
            you own or have the necessary rights to use it, and that it does not violate the rights of any person or
            contain any material that is defamatory, obscene, or otherwise objectionable.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 6. Intellectual Property */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>6. Intellectual Property</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>6.1 BappaCards Intellectual Property</Typography>
          <Typography variant="body1">
            Our Services and their entire contents, features, and functionality are owned by BappaCards, its licensors, or other
            providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual
            property laws.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>6.2 License to Use</Typography>
          <Typography variant="body1">
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and
            use our Services for your personal, non-commercial use.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 7. Limitation of Liability */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>7. Limitation of Liability</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL BAPPACARDS, ITS AFFILIATES, OR THEIR LICENSORS,
            SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY
            LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, OUR SERVICES, INCLUDING
            ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
          </Typography>
          <Typography variant="body1">
            THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 8. Termination */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>8. Termination</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3 }}>
          <Typography variant="body1">
            We may terminate or suspend your account and access to our Services immediately, without prior notice or liability,
            for any reason whatsoever, including if you breach these Terms.
          </Typography>
          <Typography variant="body1">
            Upon termination, your right to use our Services will immediately cease. All provisions of these Terms which by
            their nature should survive termination shall survive, including ownership provisions, warranty disclaimers,
            indemnity, and limitations of liability.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
