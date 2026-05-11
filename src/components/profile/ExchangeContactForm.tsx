'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Alert,
  InputAdornment,
  SvgIcon,
  type SvgIconProps,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { LoadingButton } from '@mui/lab';
import type { SxProps, Theme } from '@mui/material';
import type { BappaProfile } from '@/lib/api';
import { createContact, trackLinkClick } from '@/lib/api';

// react-phone-input-2 imports CSS so we lazy-load it client-only
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

const TikTokIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 50 50">
    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
  </SvgIcon>
);

interface ExchangeContactFormProps {
  profileId: string;
  profile: BappaProfile;
  mode?: 'page' | 'modal';
  open?: boolean;
  defaultLocation?: string;
  hideNotes?: boolean;
  onSuccess?: () => void;
}

export default function ExchangeContactForm({
  profileId,
  profile,
  mode = 'page',
  open,
  defaultLocation = '',
  hideNotes = false,
  onSuccess,
}: ExchangeContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(defaultLocation);

  const isPage = mode === 'page';

  const reset = () => {
    setFirstName(''); setLastName(''); setPhoneNumber(''); setPhoneError(false);
    setEmail(''); setInstagram(''); setTiktok(''); setNotes('');
    setLocation(defaultLocation); setShowSuccess(false); setShowError(false);
    setErrorMessage(''); setLoading(false);
  };

  useEffect(() => {
    if (mode === 'modal' && !open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode]);

  const isPhoneValid = (phone: string) => {
    if (!phone) return false;
    return phone.replace(/\D/g, '').length > 3;
  };

  const handlePhoneChange = (value: string, data: { dialCode?: string; format?: string }) => {
    if (phoneError) setPhoneError(false);
    if (value && data?.dialCode && !value.startsWith(data.dialCode)) {
      const format = data.format || '';
      const expectedTotal = (format.match(/\./g) || []).length;
      if (expectedTotal > 0) {
        const expectedNational = expectedTotal - (data.dialCode?.length ?? 0);
        if (value.length === expectedNational) {
          setPhoneNumber(data.dialCode + value);
          return;
        }
      }
    }
    setPhoneNumber(value);
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInstagram(v.startsWith('@') ? v : `@${v}`);
  };

  const handleTiktokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTiktok(v.startsWith('@') ? v : `@${v}`);
  };

  const submitContact = async () => {
    setShowError(false); setErrorMessage(''); setShowSuccess(false);

    if (phoneNumber && !isPhoneValid(phoneNumber)) {
      setPhoneError(true);
      return;
    }

    setLoading(true);

    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const fullName = `${cap(firstName)} ${cap(lastName)}`.trim();
    const cleanPhone = phoneNumber.replace(/^\+/, '');

    const body = {
      full_name: fullName,
      phone_number: cleanPhone ? `+${cleanPhone}` : '',
      email,
      instagram: instagram.replace(/@/g, ''),
      tiktok: tiktok.replace(/@/g, ''),
      notes,
      send_email: true,
      ...(location && { contact_location: { name: location } }),
    };

    try {
      const response = await createContact(profileId, body);
      if (!response) {
        setErrorMessage('No response received from server');
        setShowError(true);
        setLoading(false);
        return;
      }
      if (response.status === 200 || response.status === 201) {
        try {
          await trackLinkClick({
            profile_id: profileId,
            link_type: 'exchange_contact_submit',
            link_identifier: 'exchange_contact_submit',
            friendly_name: null,
          });
        } catch (_) {}

        setShowSuccess(true);
        if (isPage) {
          setTimeout(() => { reset(); onSuccess?.(); }, 2000);
        } else {
          setTimeout(() => { onSuccess?.(); }, 1500);
        }
      } else {
        const msg =
          ('data' in response && (response.data as Record<string, string>)?.error) ||
          ('message' in response && response.message) ||
          `Request failed with status ${response.status}`;
        setErrorMessage(String(msg));
        setShowError(true);
      }
    } catch (err) {
      console.error('Error creating contact:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setShowError(true);
    }
    setLoading(false);
  };

  const fieldSx: SxProps<Theme> = isPage
    ? {
        '& .MuiFilledInput-root': { minHeight: '64px', fontSize: '18px' },
        '& .MuiInputLabel-root': { fontSize: '16px' },
      }
    : {};

  return (
    <Box>
      <Typography
        variant={isPage ? 'h5' : 'h6'}
        component="h2"
        align="center"
        sx={{ pb: isPage ? 3 : 2.5, fontWeight: isPage ? 600 : undefined }}
      >
        {isPage
          ? `Share your contact info with ${profile.firstname}`
          : `Exchange your information back with ${profile.firstname}`}
      </Typography>

      <Stack direction="column" spacing={isPage ? 2.5 : 2}>
        <Stack direction="row" spacing={2}>
          <TextField
            value={firstName} label="First Name" required variant="filled" fullWidth
            autoComplete={isPage ? 'off' : 'given-name'}
            onChange={(e) => setFirstName(e.target.value)} sx={fieldSx}
          />
          <TextField
            value={lastName} label="Last Name" required variant="filled" fullWidth
            autoComplete={isPage ? 'off' : 'family-name'}
            onChange={(e) => setLastName(e.target.value)} sx={fieldSx}
          />
        </Stack>

        <Box>
          {/* PhoneInput is lazy-loaded (no SSR) */}
          <PhoneInput
            country="us"
            value={phoneNumber}
            onChange={handlePhoneChange}
            disableCountryGuess
            isValid={() => !phoneError}
            specialLabel="Phone Number"
            inputProps={{ autoComplete: isPage ? 'off' : 'tel', 'aria-label': 'Phone number' }}
            inputStyle={{
              width: '100%', height: isPage ? '64px' : '56px',
              fontSize: isPage ? '18px' : '16px', paddingLeft: '48px',
              border: 'none', borderBottom: phoneError ? '2px solid #d32f2f' : '1px solid rgba(0,0,0,0.42)',
              borderRadius: '4px 4px 0 0', backgroundColor: 'rgba(0,0,0,0.06)',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            }}
            containerStyle={{ width: '100%' }}
            buttonStyle={{
              border: 'none', borderBottom: phoneError ? '2px solid #d32f2f' : '1px solid rgba(0,0,0,0.42)',
              borderRadius: '4px 0 0 0', backgroundColor: 'rgba(0,0,0,0.06)',
              minWidth: '48px', minHeight: isPage ? '64px' : '48px',
            }}
            enableSearch preferredCountries={['us', 'ca', 'gb', 'mx']}
          />
          {phoneError && (
            <Typography variant="caption" sx={{ color: '#d32f2f', ml: '14px', mt: '3px', display: 'block' }}>
              Please enter a valid phone number
            </Typography>
          )}
        </Box>

        <TextField
          value={email} label="Email" type="email" variant="filled"
          autoComplete={isPage ? 'off' : 'email'}
          onChange={(e) => setEmail(e.target.value)} sx={fieldSx}
        />

        {isPage && (
          <TextField
            value={location} label="Location" variant="filled"
            autoComplete="off" placeholder="e.g. Atlanta, GA"
            onChange={(e) => setLocation(e.target.value)}
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><LocationOnIcon color="action" /></InputAdornment>
                ),
              },
            }}
          />
        )}

        <TextField
          value={instagram} label="Instagram" variant="filled"
          autoComplete="off" placeholder="@username"
          onChange={handleInstagramChange} sx={fieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start"><InstagramIcon color="action" /></InputAdornment>
              ),
            },
          }}
        />

        <TextField
          value={tiktok} label="TikTok" variant="filled"
          autoComplete="off" placeholder="@username"
          onChange={handleTiktokChange} sx={fieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start"><TikTokIcon color="action" /></InputAdornment>
              ),
            },
          }}
        />

        {!hideNotes && (
          <TextField
            value={notes} label="Notes" multiline variant="filled"
            minRows={isPage ? 3 : undefined}
            autoComplete="off"
            onChange={(e) => setNotes(e.target.value)} sx={fieldSx}
          />
        )}

        <Typography variant="caption" sx={{ color: '#888', textAlign: 'center', display: 'block', mt: 1 }}>
          By submitting, you agree to receive email from Bappa Cards.
        </Typography>

        <LoadingButton
          loading={loading}
          disabled={!firstName || !lastName}
          variant="contained"
          onClick={submitContact}
          fullWidth={isPage}
          size={isPage ? 'large' : undefined}
          sx={isPage ? {
            height: '56px', fontSize: '18px', fontWeight: 600,
            borderRadius: '12px', textTransform: 'none', mt: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.2)' },
          } : {}}
        >
          Submit
        </LoadingButton>

        {showSuccess && !showError && (
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            Your information has been submitted!
          </Alert>
        )}
        {showError && !showSuccess && (
          <Alert severity="error" onClose={() => setShowError(false)}>
            {errorMessage}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
