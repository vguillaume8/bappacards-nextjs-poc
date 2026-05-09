import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const metadata: Metadata = {
  title: 'Affiliate Program Terms — BappaCards',
  description:
    'BappaCards Affiliate Program Terms and Conditions. Learn about commissions, payouts, obligations, and policies for BappaCards affiliates.',
  openGraph: {
    title: 'Affiliate Program Terms — BappaCards',
    description: 'BappaCards Affiliate Program Terms and Conditions.',
    type: 'website',
    url: 'https://bappacards.com/affiliate-terms',
  },
};

const accordionSx = {
  mb: 2,
  border: '1px solid #e0e0e0',
  borderRadius: '4px !important',
  '&:before': { display: 'none' },
};

const summarySx = { bgcolor: '#f8f9fa' };

export default function AffiliateTermsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Affiliate Program Terms
        </Typography>
        <Typography variant="body1" color="text.secondary">
          These terms govern your participation in the BappaCards Affiliate Program.
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
        <Link href="/terms-of-service" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: '#EB1C24' } }}>
            Terms of Service
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">|</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#EB1C24' }}>
          Affiliate Terms
        </Typography>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        <strong>Effective Date:</strong> March 27, 2026 | <strong>Last Updated:</strong> May 2026
      </Typography>
      <Typography variant="body1">
        These Affiliate Program Terms and Conditions (&quot;Affiliate Terms&quot;) govern your participation in the
        BappaCards Affiliate Program. By signing up as an affiliate, you agree to be bound by these Affiliate Terms
        in addition to our general Terms of Service.
      </Typography>

      {/* 1. Program Overview */}
      <Accordion defaultExpanded sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>1. Program Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            The BappaCards Affiliate Program allows approved participants (&quot;Affiliates&quot;) to earn commissions
            by referring new customers to BappaCards through unique referral links. Participation in the program is
            free and open to all registered BappaCards users.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 2. Commission Structure */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>2. Commission Structure</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Affiliates earn a 20% commission on each qualifying sale made through their unique referral link. A
            &quot;qualifying sale&quot; is defined as a completed purchase of a BappaCards product or subscription
            by a new customer who clicked the Affiliate&apos;s referral link.
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="Commissions are calculated based on the net sale amount (excluding taxes, shipping, and refunds)." /></ListItem>
            <ListItem><ListItemText primary="Referral attribution is tracked via cookies and link parameters. The referral window is 30 days from the initial click." /></ListItem>
            <ListItem><ListItemText primary="BappaCards reserves the right to adjust commission rates with 30 days' written notice to Affiliates." /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* 3. Payouts */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>3. Payouts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Commissions are accumulated and paid out at the end of each calendar month, provided the Affiliate has
            met the minimum payout threshold of $20.00 USD.
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="Payouts are processed via the payment method on file (e.g., Stripe, PayPal, or bank transfer as available)." /></ListItem>
            <ListItem><ListItemText primary="If the minimum threshold is not met, the balance rolls over to the following month." /></ListItem>
            <ListItem><ListItemText primary="Affiliates are responsible for any applicable taxes on commissions earned." /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* 4. Affiliate Obligations */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>4. Affiliate Obligations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">As an Affiliate, you agree to:</Typography>
          <List dense>
            <ListItem><ListItemText primary="Promote BappaCards in a truthful, non-misleading manner consistent with our brand guidelines." /></ListItem>
            <ListItem><ListItemText primary="Not engage in spam, unsolicited messaging, or any deceptive marketing practices." /></ListItem>
            <ListItem><ListItemText primary="Not use paid search ads that bid on BappaCards branded keywords without prior written approval." /></ListItem>
            <ListItem><ListItemText primary="Not create fake accounts, self-refer, or engage in any fraudulent activity to generate commissions." /></ListItem>
            <ListItem><ListItemText primary="Clearly disclose your affiliate relationship when promoting BappaCards, in compliance with FTC guidelines and applicable laws." /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* 5. Prohibited Conduct */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>5. Prohibited Conduct</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            The following activities are strictly prohibited and may result in immediate termination from the program
            and forfeiture of unpaid commissions:
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="Cookie stuffing, click fraud, or any form of artificial traffic generation." /></ListItem>
            <ListItem><ListItemText primary="Using BappaCards trademarks or intellectual property in domain names, social media handles, or ad copy without permission." /></ListItem>
            <ListItem><ListItemText primary="Making false or exaggerated claims about BappaCards products or earnings potential." /></ListItem>
            <ListItem><ListItemText primary="Violating any applicable laws, regulations, or third-party terms of service in connection with your promotional activities." /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* 6. Termination */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>6. Termination</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Either party may terminate the affiliate relationship at any time, for any reason, with or without notice.
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="BappaCards may immediately terminate your affiliate account if you violate these Affiliate Terms." /></ListItem>
            <ListItem><ListItemText primary="Upon termination, any pending commissions that have met the minimum payout threshold will be paid within 30 days, unless termination was due to fraud or policy violations." /></ListItem>
            <ListItem><ListItemText primary="Upon termination, you must cease all use of BappaCards branding, referral links, and promotional materials." /></ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* 7. Limitation of Liability */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>7. Limitation of Liability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            BappaCards is not liable for any indirect, incidental, or consequential damages arising from your
            participation in the Affiliate Program. Our total liability shall not exceed the total commissions paid
            to you in the 12 months preceding any claim.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 8. Modifications */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>8. Modifications to These Terms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            BappaCards reserves the right to modify these Affiliate Terms at any time. Material changes will be
            communicated via email or through the affiliate dashboard. Continued participation in the program after
            changes take effect constitutes acceptance of the updated terms.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* 9. Contact */}
      <Accordion sx={accordionSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={summarySx}>
          <Typography sx={{ fontWeight: 'bold' }}>9. Contact</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            If you have questions about these Affiliate Terms, please contact us at{' '}
            <strong>support@bappacards.com</strong> or use our{' '}
            <Link href="/contact" style={{ color: '#EB1C24' }}>Contact page</Link>.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
