'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

interface StepItem {
  title: string;
  content: string;
}

function StepList({ steps }: { steps: StepItem[] }) {
  return (
    <Box>
      {steps.map((step, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 3, mb: 4 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#EB1C24',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            {i + 1}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 1 }}>
              {step.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
              {step.content}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function AccordionSection({ items }: { items: StepItem[] }) {
  return (
    <Box>
      {items.map((item, i) => (
        <Accordion
          key={i}
          elevation={0}
          sx={{ border: '1px solid rgba(0,0,0,0.08)', mb: 1, '&:before': { display: 'none' }, borderRadius: '8px !important' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, fontFamily: "'Poppins', serif" }}>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
              {item.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

const TABS = [
  'Getting Started',
  'Personal Info',
  'Media',
  'Social Media',
  'Analytics',
  'Subscriptions',
  'Settings & Contacts',
  'Profile',
];

export default function GuideContent() {
  const [tab, setTab] = useState(0);

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EB1C24 0%, #8B0000 100%)',
          color: '#fff',
          py: { xs: 10, md: 14 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            User Guide
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, mb: 4 }}>
            Everything you need to get the most out of your BappaCards digital business card
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/quick-guide"
            sx={{
              backgroundColor: '#fff',
              color: '#EB1C24',
              fontWeight: 700,
              px: 4,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            }}
          >
            Quick Start Guide
          </Button>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <Container maxWidth="lg">
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': { fontFamily: "'Poppins', serif", fontWeight: 500, fontSize: '0.85rem' },
              '& .MuiTabs-indicator': { backgroundColor: '#EB1C24' },
            }}
          >
            {TABS.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Getting Started */}
        <TabPanel value={tab} index={0}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Getting Started
          </Typography>

          {/* Video */}
          <Box sx={{ mb: 6, borderRadius: 3, overflow: 'hidden', maxWidth: 720 }}>
            <video
              controls
              style={{ width: '100%', display: 'block', borderRadius: 12 }}
              src="https://res.cloudinary.com/dn2gadqqz/video/upload/v1773447015/How_to_Setup_Bappa_Card_h0it1s.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </Box>

          <StepList
            steps={[
              {
                title: 'Create Your Account',
                content: 'Go to bappacards.com/sign-up and sign up with Google or your email address. The process takes under 2 minutes.',
              },
              {
                title: 'Activate Your Card',
                content: 'If you purchased a physical BappaCard, navigate to Settings and enter the card\'s serial number to link it to your profile.',
              },
              {
                title: 'Complete Your Profile',
                content: 'Fill in your personal information, upload a professional photo, and add your links. A complete profile gets significantly more engagement.',
              },
              {
                title: 'Share Your Card',
                content: 'Tap your BappaCard to any smartphone, show your QR code, or share your direct link. Recipients don\'t need an app to view your card.',
              },
            ]}
          />
        </TabPanel>

        {/* Personal Info */}
        <TabPanel value={tab} index={1}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Personal Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
            Your personal information is the foundation of your digital business card. Keep it accurate and up to date — changes apply instantly everywhere your card is shared.
          </Typography>
          <AccordionSection
            items={[
              {
                title: 'Name & Title',
                content: 'Enter your First Name, Last Name, and professional Title exactly as you want them displayed. Your title appears prominently beneath your name on your card.',
              },
              {
                title: 'Contact Information',
                content: 'Add your primary Email and Phone number. You can choose which fields are visible on your public profile in the Settings section.',
              },
              {
                title: 'Company & Location',
                content: 'Add your Company name and Location to give context to your role. These fields help viewers understand your professional background at a glance.',
              },
              {
                title: 'Bio',
                content: 'Write a short bio (2–3 sentences) describing what you do and the value you provide. This is your elevator pitch — make it clear and compelling.',
              },
              {
                title: 'Pronouns',
                content: 'Optionally add your pronouns to your profile to create a more inclusive and personalized experience.',
              },
            ]}
          />
        </TabPanel>

        {/* Media */}
        <TabPanel value={tab} index={2}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Media
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
            Stand out with high-quality visual media. BappaCards supports profile photos, cover images, and even video backgrounds for premium subscribers.
          </Typography>
          <AccordionSection
            items={[
              {
                title: 'Profile Photo',
                content: 'Upload a professional headshot. Use a square image (1:1 ratio) at least 400×400px for best results. Supported formats: JPG, PNG, WebP.',
              },
              {
                title: 'Cover Image',
                content: 'Add a cover/banner image to the top of your card. Recommended size: 1200×400px. Use this to showcase your brand, company, or professional environment.',
              },
              {
                title: 'Video Background (Premium)',
                content: 'Premium subscribers can add a short video background to their card. Upload an MP4 file up to 30 seconds. Keep file size under 50MB for best performance.',
              },
              {
                title: 'Gallery',
                content: 'Add a portfolio gallery to showcase your work, products, or services. Each image can include a caption and optional link.',
              },
              {
                title: 'Logo',
                content: 'Add your company or personal brand logo. This appears alongside your name and reinforces your professional identity.',
              },
            ]}
          />
        </TabPanel>

        {/* Social Media */}
        <TabPanel value={tab} index={3}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Social Media &amp; Links
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
            Connect all your digital presence in one place. Add social profiles, websites, payment links, and custom URLs to your BappaCard.
          </Typography>
          <AccordionSection
            items={[
              {
                title: 'Website',
                content: 'Add your primary website or portfolio URL. This gets prominent placement on your card.',
              },
              {
                title: 'Social Profiles',
                content: 'Add links to Instagram, LinkedIn, Twitter/X, TikTok, Facebook, YouTube, and more. Each platform has its own icon on your card.',
              },
              {
                title: 'Payment Links',
                content: 'Add Venmo, Cash App, PayPal, or other payment links so clients and contacts can pay you directly from your card.',
              },
              {
                title: 'Custom Links',
                content: 'Add any custom URL with a title of your choice. Use this for booking pages, product pages, Linktree, or any other URL you want to highlight.',
              },
              {
                title: 'Link Ordering',
                content: 'Drag and drop your links to reorder them. Put your most important links at the top for maximum visibility.',
              },
            ]}
          />
        </TabPanel>

        {/* Analytics */}
        <TabPanel value={tab} index={4}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Analytics
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
            Understand how people engage with your digital business card. Analytics are available to all users, with advanced insights for Premium subscribers.
          </Typography>
          <StepList
            steps={[
              {
                title: 'View Total Taps & Views',
                content: 'See how many times your card has been tapped (NFC), scanned (QR), or viewed via direct link. Totals update in real time.',
              },
              {
                title: 'Track Link Clicks',
                content: 'See which links on your card are getting the most clicks. Use this data to optimize the order and content of your links.',
              },
              {
                title: 'View Engagement Over Time',
                content: 'Premium subscribers can see engagement trends over days, weeks, and months to understand when and how their card is performing.',
              },
              {
                title: 'Contact Saves',
                content: 'Track how many people have saved your contact information directly from your card.',
              },
            ]}
          />
        </TabPanel>

        {/* Subscriptions */}
        <TabPanel value={tab} index={5}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Subscriptions
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
            BappaCards offers free and premium plans. Upgrade to unlock advanced features like video backgrounds, advanced analytics, and more.
          </Typography>
          <AccordionSection
            items={[
              {
                title: 'Free Plan',
                content: 'Create a complete digital business card with your photo, bio, contact info, and social links. Share via QR code or direct link.',
              },
              {
                title: 'Bappa Premium ($5/month)',
                content: 'Unlock advanced analytics, video backgrounds, custom themes, Apple Wallet integration, and more.',
              },
              {
                title: 'Bappa Premium Plus ($12/month)',
                content: 'Everything in Bappa Premium, plus Bappa Connect — our AI-powered relationship management platform.',
              },
              {
                title: 'Teams Plan ($10/month + $1/user)',
                content: 'Manage cards for your entire team. Includes admin dashboard, bulk updates, and team analytics.',
              },
              {
                title: 'Managing Your Subscription',
                content: 'Go to Settings > Subscription to upgrade, downgrade, or cancel your plan. Changes take effect at the next billing cycle.',
              },
            ]}
          />
        </TabPanel>

        {/* Settings & Contacts */}
        <TabPanel value={tab} index={6}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Settings &amp; Contacts
          </Typography>
          <AccordionSection
            items={[
              {
                title: 'Privacy Settings',
                content: 'Control which fields are visible on your public profile. Toggle email, phone, and other fields on or off as needed.',
              },
              {
                title: 'Custom URL / Username',
                content: 'Claim a custom URL for your profile (e.g., bappacards.com/yourname) to make sharing easier and more professional.',
              },
              {
                title: 'Card Activation',
                content: 'Link your physical BappaCard to your profile by entering the serial number found on the back of the card.',
              },
              {
                title: 'Contact Management',
                content: 'View and manage contacts who have shared their information with you via the Contact Exchange feature.',
              },
              {
                title: 'Contact Exchange',
                content: 'Enable Contact Exchange to prompt viewers to share their contact info when they view your card. Great for lead generation.',
              },
              {
                title: 'Notification Settings',
                content: 'Configure email notifications for new card taps, contact exchanges, and product updates.',
              },
              {
                title: 'Account & Password',
                content: 'Update your email address or password from the Account Settings section. For Google sign-in users, authentication is managed by Google.',
              },
            ]}
          />
        </TabPanel>

        {/* Profile */}
        <TabPanel value={tab} index={7}>
          <Typography component="h2" variant="h4" sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4 }}>
            Your Public Profile
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
            Your public profile is what people see when they tap your card or scan your QR code. Here&apos;s how to make it stand out.
          </Typography>
          <StepList
            steps={[
              {
                title: 'Preview Your Profile',
                content: 'Use the Preview button in your dashboard to see exactly how your card looks to recipients on mobile and desktop.',
              },
              {
                title: 'Share Your Profile Link',
                content: 'Copy your profile link from the dashboard and share it via text, email, or social media. Recipients can view your card on any device without an app.',
              },
              {
                title: 'Download Your QR Code',
                content: 'Download a high-resolution PNG of your QR code to print on materials, email signatures, or presentations.',
              },
              {
                title: 'Embed on Your Website',
                content: 'Premium subscribers can embed their card on any website using an HTML embed code available in the Share section.',
              },
            ]}
          />
        </TabPanel>
      </Container>
    </>
  );
}
