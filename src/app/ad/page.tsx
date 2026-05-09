'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DiamondIcon from '@mui/icons-material/Diamond';
import NfcIcon from '@mui/icons-material/Nfc';
import RecyclingIcon from '@mui/icons-material/Recycling';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { createCheckoutWithImageUpload } from '@/lib/api';

// Constants
const ORIGINAL_PRICE = 100;
const ENGRAVING_COLOR = 'gold';
const PRODUCT_ID = 'platinum';

const PLATINUM_FEATURES = [
  'Laser-Engraved Metal Card',
  'NFC Tap-to-Share Technology',
  'Custom Digital Profile',
  'Lifetime Free App Access',
  'Eco-Friendly Materials',
  'Gold Engraving Finish',
];

function clampDiscount(raw: string | null): number {
  const n = parseInt(raw ?? '0', 10);
  if (isNaN(n) || n < 0) return 0;
  if (n > 75) return 75;
  return n;
}

function AdContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') ?? 'ad';
  const campaign = searchParams.get('campaign') ?? 'generic';
  const via = searchParams.get('via');
  const discount = clampDiscount(searchParams.get('discount'));

  const discountedPrice = discount > 0 ? ORIGINAL_PRICE * (1 - discount / 100) : ORIGINAL_PRICE;
  const savings = ORIGINAL_PRICE - discountedPrice;

  const [isLoading, setIsLoading] = useState(false);
  const [cardName, setCardName] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [error, setError] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [success, setSuccess] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Check for Stripe return
  useEffect(() => {
    if (searchParams.get('purchase_success') === 'true') {
      setSuccess({
        show: true,
        message:
          "Thank you for your purchase! Your premium metal card has been ordered and will be processed shortly. You'll receive a confirmation email with all the details.",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const valid = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!valid.includes(file.type)) {
      setError({ show: true, message: 'Please upload a valid image file (PNG, JPG, or SVG)' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError({ show: true, message: 'File size must be less than 5MB' });
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const getErrorMessage = (err: unknown): string => {
    const e = err as { response?: { status: number }; code?: string; message?: string };
    if (e.response?.status === 401) return 'Please log in to complete your purchase.';
    if (e.response?.status === 403) return "You don't have permission to complete this purchase.";
    if ((e.response?.status ?? 0) >= 500) return 'Our servers are experiencing issues. Please try again in a moment.';
    if (e.code === 'NETWORK_ERROR' || e.message?.includes('network')) return 'Please check your internet connection and try again.';
    if (e.message?.includes('timeout')) return 'The request timed out. Please try again.';
    return 'An unexpected error occurred. Please try again later.';
  };

  const handleOrderNow = async () => {
    if (!cardName && !logoFile) {
      setError({ show: true, message: 'Please provide either a name for your card or upload a logo' });
      return;
    }
    setIsLoading(true);
    try {
      const successUrl = `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&product=${PRODUCT_ID}`;
      const metadata: Record<string, string> = {
        productId: PRODUCT_ID,
        source: `ad_landing_${source}`,
        campaign,
        discount_percentage: discount.toString(),
        original_price: ORIGINAL_PRICE.toString(),
        discounted_price: discountedPrice.toFixed(2),
        savings: savings.toFixed(2),
      };
      if (cardName) metadata.card_name = cardName;
      if (via) metadata.affiliateCode = via;

      const response = await createCheckoutWithImageUpload({
        product: PRODUCT_ID,
        engraving_color: ENGRAVING_COLOR,
        success_url: successUrl,
        cancel_url: window.location.href,
        cardName: cardName || undefined,
        logoFile: logoFile || undefined,
        metadata,
        discount: discount > 0
          ? { percentage: discount, source: 'ad', originalPrice: ORIGINAL_PRICE, discountedPrice }
          : undefined,
      });

      if ('data' in response && (response.data as { url?: string }).url) {
        window.location.href = (response.data as { url: string }).url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      setError({ show: true, message: getErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          background: 'linear-gradient(160deg, #000000 0%, #1a0a1e 30%, #2d1535 60%, #0a0a1f 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          px: { xs: 2, md: 0 },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.03,
            zIndex: 1,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Orb 1 */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: { xs: '400px', md: '700px' },
            height: { xs: '400px', md: '700px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(235,28,36,0.4) 0%, rgba(255,51,120,0.25) 40%, rgba(235,28,36,0) 70%)',
            filter: 'blur(100px)',
            animation: 'adFloat 20s ease-in-out infinite',
            zIndex: 0,
          }}
        />
        {/* Orb 2 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: { xs: '300px', md: '600px' },
            height: { xs: '300px', md: '600px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,61,255,0.35) 0%, rgba(96,47,229,0.2) 40%, rgba(139,61,255,0) 70%)',
            filter: 'blur(90px)',
            animation: 'adFloat 25s ease-in-out infinite reverse',
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Discount badge */}
          {discount > 0 && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Chip
                label={`${discount}% OFF — LIMITED TIME OFFER`}
                sx={{
                  background: 'linear-gradient(135deg, #EB1C24 0%, #ff1744 50%, #ff3378 100%)',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  letterSpacing: '1.5px',
                  px: { xs: 3, md: 5 },
                  py: { xs: 3, md: 3.5 },
                  animation: 'adPulse 2s ease-in-out infinite',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(235,28,36,0.5)',
                  textTransform: 'uppercase',
                }}
              />
            </Box>
          )}

          {/* Two-column layout */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 6, md: 10 },
            }}
          >
            {/* Left — product placeholder */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 10px 40px rgba(235,28,36,0.15)',
                  position: 'relative',
                  transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(-2deg) translateY(-8px)',
                    boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 15px 60px rgba(235,28,36,0.25)',
                  },
                }}
              >
                {/* Most Popular badge */}
                <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 3 }}>
                  <Chip
                    icon={<DiamondIcon sx={{ color: 'white !important', fontSize: '1rem' }} />}
                    label="MOST POPULAR"
                    sx={{
                      bgcolor: '#EB1C24',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      px: 2.5,
                      py: 0.75,
                      borderRadius: '24px',
                      boxShadow: '0 6px 20px rgba(235,28,36,0.5)',
                      border: '2px solid rgba(255,255,255,0.3)',
                    }}
                  />
                </Box>

                {/* Product image placeholder */}
                <Box
                  sx={{
                    height: { xs: 320, sm: 380, md: 440 },
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <DiamondIcon sx={{ fontSize: '4rem', color: '#FFD700' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '1.1rem' }}>
                    Bappa Platinum
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    Premium Metal NFC Business Card
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right — product details + form */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  mb: 2,
                  color: '#EB1C24',
                }}
              >
                Premium Metal NFC Card
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: '2.25rem', md: '3rem' },
                  lineHeight: 1.1,
                }}
              >
                The Card That Opens Doors
              </Typography>

              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.85, lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.1rem' } }}
              >
                Tap, share, and make an impression that lasts. Bappa Platinum is a laser-engraved
                metal NFC business card with a lifetime digital profile — no app required on the
                other end.
              </Typography>

              {/* Pricing box */}
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(235,28,36,0.15) 0%, rgba(235,28,36,0.05) 100%)',
                  border: '2px solid rgba(235,28,36,0.3)',
                  boxShadow: '0 8px 32px rgba(235,28,36,0.2)',
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.5px', display: 'block', mb: 1 }}
                >
                  {discount > 0 ? 'SPECIAL OFFER PRICE' : 'ONE-TIME PRICE'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      color: '#FFFFFF',
                      fontSize: { xs: '3rem', md: '4rem' },
                      lineHeight: 1,
                      textShadow: '0 4px 16px rgba(235,28,36,0.4)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    ${discountedPrice.toFixed(2)}
                  </Typography>
                  {discount > 0 && (
                    <Typography
                      variant="h5"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'rgba(255,255,255,0.4)',
                        fontWeight: 600,
                        fontSize: { xs: '1.5rem', md: '1.8rem' },
                      }}
                    >
                      ${ORIGINAL_PRICE.toFixed(2)}
                    </Typography>
                  )}
                </Box>
                {discount > 0 && (
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 2,
                      py: 0.75,
                      borderRadius: '8px',
                      bgcolor: 'rgba(0,255,136,0.15)',
                      border: '1px solid rgba(0,255,136,0.3)',
                    }}
                  >
                    <Typography sx={{ color: '#00ff88', fontWeight: 700, fontSize: '0.95rem' }}>
                      You save ${savings.toFixed(2)} ({discount}% off)
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Features */}
              <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {PLATINUM_FEATURES.map((f, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <Box component="span" sx={{ color: '#EB1C24', fontWeight: 700 }}>✓</Box>
                    {f}
                  </Typography>
                ))}
              </Box>

              {/* Customize form */}
              <Box
                sx={{
                  mb: 3,
                  p: 2.5,
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'white', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  Customize Your Card
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Provide at least a name or logo. You can fully customize your card after checkout.
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Name on Card (Optional)"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    variant="outlined"
                    placeholder="e.g., Jane Smith"
                    helperText="The name that will appear on your business card"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.08)',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&.Mui-focused fieldset': { borderColor: '#EB1C24' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.5)' },
                    }}
                  />

                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                      Logo (Optional)
                    </Typography>
                    {logoPreview ? (
                      <Box
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1.5,
                          border: '2px solid #EB1C24',
                          borderRadius: '10px',
                          bgcolor: 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <Avatar src={logoPreview} alt="Logo preview" variant="rounded" sx={{ width: 50, height: 50 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'white' }}>
                            {logoFile?.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            {((logoFile?.size ?? 0) / 1024).toFixed(1)} KB
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                          sx={{
                            position: 'absolute', top: -8, right: -8,
                            bgcolor: 'error.main', color: 'white',
                            '&:hover': { bgcolor: 'error.dark' },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{
                          borderRadius: '10px',
                          borderStyle: 'dashed',
                          borderWidth: 2,
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: 'rgba(255,255,255,0.9)',
                          py: 1.5,
                          '&:hover': {
                            borderStyle: 'dashed',
                            borderColor: 'rgba(255,255,255,0.3)',
                            bgcolor: 'rgba(255,255,255,0.05)',
                          },
                          textTransform: 'none',
                        }}
                      >
                        Upload Logo
                        <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                      </Button>
                    )}
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mt: 0.5 }}>
                      PNG, JPG, or SVG • Max 5MB
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* CTA */}
              <Button
                variant="contained"
                size="large"
                onClick={handleOrderNow}
                disabled={isLoading}
                fullWidth
                sx={{
                  bgcolor: '#EB1C24',
                  color: 'white',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 800,
                  py: { xs: 2, md: 2.5 },
                  borderRadius: '16px',
                  boxShadow: '0 12px 40px rgba(235,28,36,0.5)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    bgcolor: '#d01620',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 16px 48px rgba(235,28,36,0.7)',
                  },
                  '&:active': { transform: 'translateY(-2px) scale(0.98)' },
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  textTransform: 'none',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover::before': { left: '100%' },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : discount > 0 ? (
                  `Order Now — Save $${savings.toFixed(2)} →`
                ) : (
                  `Order Now — $${ORIGINAL_PRICE.toFixed(2)} →`
                )}
              </Button>

              {/* Trust badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
                {[
                  { icon: <RecyclingIcon />, text: 'Eco-Friendly' },
                  { icon: <NfcIcon />, text: 'NFC Enabled' },
                ].map((badge, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                    {badge.icon}
                    {badge.text}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Keyframe animations */}
        <style>{`
          @keyframes adFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes adPulse {
            0%, 100% { box-shadow: 0 4px 24px rgba(235,28,36,0.5), 0 0 0 0 rgba(235,28,36,0.4); }
            50% { box-shadow: 0 8px 32px rgba(235,28,36,0.8), 0 0 0 10px rgba(235,28,36,0); }
          }
        `}</style>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={error.show}
        autoHideDuration={6000}
        onClose={() => setError((p) => ({ ...p, show: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: { xs: 16, sm: 24 } }}
      >
        <Alert
          onClose={() => setError((p) => ({ ...p, show: false }))}
          severity="error"
          sx={{ width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', borderRadius: '12px' }}
        >
          {error.message}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={success.show}
        autoHideDuration={8000}
        onClose={() => setSuccess((p) => ({ ...p, show: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: { xs: 16, sm: 24 } }}
      >
        <Alert
          onClose={() => setSuccess((p) => ({ ...p, show: false }))}
          severity="success"
          sx={{ width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', borderRadius: '12px' }}
        >
          {success.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function AdPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000' }}>
          <CircularProgress sx={{ color: '#EB1C24' }} />
        </Box>
      }
    >
      <AdContent />
    </Suspense>
  );
}
