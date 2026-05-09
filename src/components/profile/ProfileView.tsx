'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  IconButton,
  Chip,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { BappaProfile } from '@/lib/api';
import { captureAffiliateFromProfile } from '@/lib/referral';
import ExchangeContactModal from './ExchangeContactModal';
import ProfileSkeleton from './ProfileSkeleton';

const SOCIAL_LABELS: Record<string, string> = {
  website: 'Website',
  instagram: 'Instagram',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  snapchat: 'Snapchat',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  cashapp: 'Cash App',
  venmo: 'Venmo',
  paypal: 'PayPal',
};

function buildSocialLinks(profile: BappaProfile) {
  const links = profile.links || {};
  const order = links.social_order?.length
    ? links.social_order
    : Object.keys(SOCIAL_LABELS);

  const entries: { key: string; label: string; url: string }[] = [];

  const addLinks = (key: string, values: string[] | undefined, buildUrl: (v: string) => string) => {
    (values || []).forEach((v) => {
      if (v) entries.push({ key, label: SOCIAL_LABELS[key] ?? key, url: buildUrl(v) });
    });
  };

  // Build in order
  for (const key of order) {
    switch (key) {
      case 'website': addLinks(key, links.websites, (v) => v.startsWith('http') ? v : `https://${v}`); break;
      case 'instagram': addLinks(key, links.instagram_usernames, (v) => `https://instagram.com/${v.replace('@','')}`); break;
      case 'twitter': addLinks(key, links.twitter_usernames, (v) => `https://twitter.com/${v.replace('@','')}`); break;
      case 'linkedin': addLinks(key, links.linkedin_urls, (v) => v.startsWith('http') ? v : `https://linkedin.com/in/${v}`); break;
      case 'snapchat': addLinks(key, links.snapchat_usernames, (v) => `https://snapchat.com/add/${v.replace('@','')}`); break;
      case 'tiktok': addLinks(key, links.tiktok_usernames, (v) => `https://tiktok.com/@${v.replace('@','')}`); break;
      case 'facebook': addLinks(key, links.facebook_urls, (v) => v.startsWith('http') ? v : `https://facebook.com/${v}`); break;
      case 'youtube': addLinks(key, links.youtube_urls, (v) => v.startsWith('http') ? v : `https://youtube.com/${v}`); break;
      case 'whatsapp': addLinks(key, links.whatsapp_numbers, (v) => `https://wa.me/${v.replace(/\D/g,'')}`); break;
      case 'cashapp': addLinks(key, links.cashapp_usernames, (v) => `https://cash.app/$${v.replace('$','')}`); break;
      case 'venmo': addLinks(key, links.venmo_usernames, (v) => `https://venmo.com/${v.replace('@','')}`); break;
      case 'paypal': addLinks(key, links.paypal_usernames, (v) => `https://paypal.me/${v.replace('@','')}`); break;
    }
  }

  return entries;
}

interface ProfileViewProps {
  profile: BappaProfile;
  initialExchangeOpen?: boolean;
}

export default function ProfileView({ profile, initialExchangeOpen = false }: ProfileViewProps) {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [exchangeOpen, setExchangeOpen] = useState(initialExchangeOpen);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    if (profile.affiliate_tag) captureAffiliateFromProfile(profile.affiliate_tag);
  }, [profile.affiliate_tag]);

  // Handle redirect from LinkedIn OAuth
  useEffect(() => {
    if (searchParams.get('openExchangeContact') === 'true') {
      setExchangeOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete('openExchangeContact');
      router.replace(url.pathname + (url.search || ''), { scroll: false });
    }
  }, [searchParams, router]);

  const prefs = profile.preferences || {};
  const socialLinks = buildSocialLinks(profile);
  const fullName = [profile.firstname, profile.lastname].filter(Boolean).join(' ');

  const bgColor = prefs.background_color || '#ffffff';
  const linkColor = prefs.link_color || theme.palette.primary.main;

  const isVideo = profile.background_type === 'video' && profile.background_video;

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <Container
      maxWidth="sm"
      disableGutters={isSmall}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: isSmall ? 0 : 3,
        touchAction: 'pan-y pan-x pinch-zoom',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          borderRadius: isSmall ? 0 : 3,
          overflow: 'hidden',
          boxShadow: isSmall ? 'none' : '0 8px 32px rgba(0,0,0,0.12)',
          backgroundColor: bgColor,
        }}
      >
        {/* Cover image or video */}
        {isVideo ? (
          <Box sx={{ width: '100%', aspectRatio: '2/1', position: 'relative', bgcolor: '#000' }}>
            <video
              src={profile.background_video}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>
        ) : profile.background_photo ? (
          <Box
            sx={{
              width: '100%',
              aspectRatio: '2/1',
              backgroundImage: `url(${profile.background_photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : null}

        <Box sx={{ px: 3, pb: 3 }}>
          {/* Avatar + company photo */}
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mt: -4 }}>
            <Avatar
              src={profile.profile_photo}
              alt={fullName}
              sx={{
                width: 80,
                height: 80,
                border: '3px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            />
            {profile.company_photo && (
              <Avatar
                src={profile.company_photo}
                variant="rounded"
                sx={{ width: 48, height: 48, border: '2px solid #fff' }}
              />
            )}
          </Stack>

          {/* Name, title, gold badge */}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {fullName}
            </Typography>
            {profile.is_bappa_gold && (
              <Chip label="Gold" size="small" sx={{ bgcolor: '#FFD700', color: '#000', fontWeight: 700, fontSize: 11 }} />
            )}
          </Stack>

          {profile.title && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {profile.title}
            </Typography>
          )}
          {profile.company && (
            <Typography variant="body2" color="text.secondary">
              {profile.company}
            </Typography>
          )}

          {/* CTA buttons */}
          <Stack direction="row" spacing={1.5} sx={{ mt: 2, flexWrap: 'wrap' }}>
            {prefs.showExchangeContactButton && (
              <Button
                variant="contained"
                size="small"
                onClick={() => setExchangeOpen(true)}
                sx={{
                  flex: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  bgcolor: linkColor,
                  '&:hover': { bgcolor: linkColor, opacity: 0.9 },
                }}
              >
                Exchange Contact
              </Button>
            )}
            {prefs.showSaveContactButton && profile.profile_id && (
              <Button
                variant="outlined"
                size="small"
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/profiles/${profile.profile_id}/vcard`}
                sx={{
                  flex: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: linkColor,
                  color: linkColor,
                }}
              >
                Save Contact
              </Button>
            )}
          </Stack>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {socialLinks.map((link, i) => (
                  <Button
                    key={i}
                    variant="outlined"
                    fullWidth
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      borderColor: linkColor,
                      color: linkColor,
                      justifyContent: 'center',
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Box>
      </Box>

      <ExchangeContactModal
        open={exchangeOpen}
        onClose={() => setExchangeOpen(false)}
        profileId={profile.profile_id ?? ''}
        profile={profile}
      />
    </Container>
  );
}
