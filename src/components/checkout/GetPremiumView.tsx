'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { createCheckoutProduct } from '@/lib/api';
import { getReferralCode } from '@/lib/referral';
import { PRODUCT_IDS, PRODUCT_SLUG_MAP, UTM_KEYS, type ProductId } from '@/lib/products';

interface GetPremiumViewProps {
  productSlug?: string;
}

export default function GetPremiumView({ productSlug }: GetPremiumViewProps) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const hasInitiated = useRef(false);

  const createSessionAndRedirect = useCallback(async () => {
    const slug = productSlug?.toLowerCase() || 'platinum';
    const productId: ProductId = PRODUCT_SLUG_MAP[slug] || PRODUCT_IDS.PLATINUM;

    const affiliateCode = searchParams.get('via');
    const referralCode =
      searchParams.get('ref') ||
      searchParams.get('referral') ||
      getReferralCode();

    const utmParams: Record<string, string> = {};
    UTM_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) utmParams[key] = value;
    });

    const metadata = {
      productId,
      source: 'get_premium_redirect',
      ...utmParams,
      ...(affiliateCode && { affiliateCode }),
      ...(referralCode && { referral_code: referralCode, referral_source: referralCode }),
    };

    try {
      setStatus('loading');
      setErrorMessage('');

      const response = await createCheckoutProduct({ product: productId, metadata });

      const checkoutUrl = 'data' in response ? (response.data as { url?: string })?.url : undefined;
      if (checkoutUrl && checkoutUrl.startsWith('https://checkout.stripe.com/')) {
        window.location.href = checkoutUrl;
      } else {
        const apiErr = 'data' in response
          ? (response.data as { error?: string })?.error
          : undefined;
        throw new Error(
          apiErr ||
          ('message' in response && response.message) ||
          (checkoutUrl ? 'Unexpected checkout URL' : 'Failed to create checkout session'),
        );
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setStatus('error');
      setErrorMessage((err as Error)?.message || 'Something went wrong. Please try again.');
    }
  }, [productSlug, searchParams]);

  useEffect(() => {
    if (hasInitiated.current) return;
    hasInitiated.current = true;
    createSessionAndRedirect();
  }, [createSessionAndRedirect]);

  const handleRetry = () => {
    hasInitiated.current = false;
    createSessionAndRedirect();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fafafa', px: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Image src="/logoletterhedblk.png" alt="BappaCards" width={180} height={48} style={{ objectFit: 'contain' }} />
      </Box>

      {status === 'loading' && (
        <>
          <CircularProgress size={48} sx={{ mb: 3, color: '#1a1a1a' }} />
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
            Redirecting to checkout…
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Please wait while we prepare your session.
          </Typography>
        </>
      )}

      {status === 'error' && (
        <>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#d32f2f', mb: 1 }}>
            Unable to start checkout
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 3, textAlign: 'center', maxWidth: 400 }}>
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            onClick={handleRetry}
            sx={{
              backgroundColor: '#1a1a1a', color: '#fff',
              textTransform: 'none', px: 4, py: 1.2,
              borderRadius: 2, fontWeight: 600,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Try Again
          </Button>
        </>
      )}
    </Box>
  );
}
