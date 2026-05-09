'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Nfc, Recycling, LocalShipping, Diamond } from '@mui/icons-material';
import Link from 'next/link';
import { createCheckoutDesignLater } from '@/lib/api';

interface Product {
  id: string;
  topLine: string;
  headline: string;
  price: number;
  description: string;
  features: Array<{ text: string; isNegative?: boolean }>;
  mostPopular?: boolean;
}

const products: Product[] = [
  {
    id: 'bappa-platinum',
    topLine: 'Metal Premium',
    headline: 'Bappa Platinum',
    price: 100,
    description:
      'Make an unforgettable first impression. Precision-engraved metal card that commands attention and communicates premium quality instantly.',
    features: [
      { text: 'Premium metal material' },
      { text: 'Laser engraved details' },
      { text: 'Name, title & logo engraving' },
      { text: 'NFC enabled' },
      { text: 'Ultimate durability' },
      { text: 'Luxury packaging' },
    ],
    mostPopular: true,
  },
  {
    id: 'bappa-custom',
    topLine: 'Custom Design',
    headline: 'Bappa Custom',
    price: 70,
    description:
      'Your brand, your way. Upload your logo, photo, or custom design for a completely personalized card that stands out from the crowd.',
    features: [
      { text: 'Fully custom design' },
      { text: 'Print any high-quality image' },
      { text: 'Premium PVC material' },
      { text: 'NFC enabled' },
      { text: 'QR code included' },
      { text: 'Waterproof & durable' },
    ],
  },
  {
    id: 'bappa-preferred',
    topLine: 'Essential',
    headline: 'Bappa Preferred',
    price: 50,
    description:
      'Perfect for professionals who want instant credibility. Our signature BappaCards design with your contact info — ready to impress in just 3 clicks.',
    features: [
      { text: 'BappaCards branded design' },
      { text: 'Premium PVC material' },
      { text: 'NFC enabled' },
      { text: 'QR code included' },
      { text: 'Waterproof & durable' },
      { text: 'No custom images', isNegative: true },
    ],
  },
];

const testimonials = [
  {
    name: 'Jane',
    role: 'Marketing Director',
    location: 'New York, NY',
    text: 'In marketing, every touchpoint matters. BappaCards gave me a sleek, professional card that instantly shares my portfolio and LinkedIn with a single tap. It\'s made networking at industry events so much easier - no more lost paper cards or awkward contact exchanges.',
  },
  {
    name: 'Manny',
    role: 'Publicist',
    company: 'Spotlight PR Agency',
    location: 'Atlanta, GA',
    text: 'In PR, timing is everything and fumbling with paper cards wastes precious moments. BappaCards lets me share my entire media kit instantly with journalists and clients. The analytics feature helps me track which contacts engage most with my information.',
  },
  {
    name: 'Jamaal',
    role: 'Mechanical Engineer',
    company: 'Precision Engineering Solutions',
    location: 'Atlanta, GA',
    text: 'I was skeptical at first, but BappaCards has revolutionized how I network at engineering conferences. The metal card feels substantial and professional, and being able to update my contact info when I changed firms saved me from reprinting 500 cards.',
  },
];

const faqs = [
  {
    question: 'How does the NFC technology work?',
    answer:
      'Simply tap your BappaCard on any NFC-enabled smartphone to instantly share your contact information, social media profiles, and more. No app required - it works automatically!',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days within the continental US.',
  },
  {
    question: 'Can I customize my card design?',
    answer:
      'Absolutely! Our Bappa Custom and Bappa Platinum options allow full customization. Upload your logo, choose your colors, and add your personal touch. Our Bappa Preferred option features our signature design.',
  },
  {
    question: 'Do you offer bulk pricing?',
    answer:
      'Yes! Contact our sales team for pricing on larger orders. We offer special rates for businesses ordering multiple cards for their team.',
  },
];

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleDesignNow = (productId: string) => {
    const designerUrl = `https://designer.bappacards.com/?product=${productId}`;
    window.location.href = designerUrl;
  };

  const handleDesignLater = (productId: string) => {
    setCurrentProduct(productId);
    setIsEmailDialogOpen(true);
  };

  const handleDesignLaterSubmit = async () => {
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (!currentProduct) return;

    setIsLoading(true);
    setIsEmailDialogOpen(false);

    try {
      const response = await createCheckoutDesignLater({
        email,
        product: currentProduct,
        engraving_color: 'gold',
        success_url: `${window.location.origin}/products?purchase_success=true&product_id=${currentProduct}`,
        cancel_url: `${window.location.origin}/products`,
      });

      const responseData = response as { data?: { url?: string } };
      if (responseData?.data?.url) {
        window.location.href = responseData.data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
      setEmail('');
      setCurrentProduct(null);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 5, md: 8 },
          background: '#000000',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2.75rem', md: '4rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Premium Business Cards
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 400,
              mb: 6,
              maxWidth: '760px',
              mx: 'auto',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Smart NFC-enabled business cards that make networking seamless. One tap to share everything.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: <Nfc />, text: 'NFC Enabled' },
              { icon: <Recycling />, text: 'Eco-Friendly' },
              { icon: <LocalShipping />, text: 'Fast Shipping' },
              { icon: <Diamond />, text: 'Premium Quality' },
            ].map((benefit, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'rgba(235,28,36,0.15)',
                  border: '1px solid rgba(235,28,36,0.3)',
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#EB1C24' }}>
                  {benefit.icon}
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {benefit.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Products Grid */}
      <Box
        component="section"
        sx={{
          py: { xs: 5, md: 8 },
          background: 'linear-gradient(to bottom, #f8f9fa, #f0f2f5)',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}
          >
            Our Premium Collections
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: '#555', mb: 8, maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}
          >
            Each card collection is designed with meticulous attention to detail and premium materials
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, maxWidth: '1200px', mx: 'auto' }}>
            {products.map((product) => (
              <Box key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)' },
                    position: 'relative',
                    border: product.mostPopular ? '3px solid #EB1C24' : 'none',
                  }}
                >
                  {product.mostPopular && (
                    <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 3 }}>
                      <Chip
                        label="MOST POPULAR"
                        sx={{
                          bgcolor: '#EB1C24',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  )}

                  {/* Placeholder image area */}
                  <Box
                    sx={{
                      height: { xs: 220, md: 280 },
                      bgcolor: product.mostPopular ? '#1a1a1a' : '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        color: product.mostPopular ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)',
                        fontSize: '4rem',
                        fontWeight: 700,
                      }}
                    >
                      {product.topLine.charAt(0)}
                    </Typography>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      sx={{ fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem', mb: 1 }}
                    >
                      {product.topLine}
                    </Typography>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2, color: '#263238' }}>
                      {product.headline}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: '#EB1C24', mb: 2 }}
                    >
                      ${product.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {product.description}
                    </Typography>

                    {/* Features */}
                    <Box sx={{ mb: 4 }}>
                      {product.features.map((feature, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: feature.isNegative ? '#ffebee' : '#e8f5e9',
                              color: feature.isNegative ? '#d32f2f' : '#2e7d32',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              flexShrink: 0,
                            }}
                          >
                            {feature.isNegative ? '✗' : '✓'}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {feature.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* CTAs */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleDesignNow(product.id)}
                        disabled={isLoading}
                        sx={{
                          bgcolor: '#EB1C24',
                          '&:hover': { bgcolor: '#c2003c', transform: 'translateY(-2px)' },
                          borderRadius: '12px',
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Design Now
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDesignLater(product.id)}
                        disabled={isLoading}
                        sx={{
                          borderColor: '#EB1C24',
                          color: '#EB1C24',
                          borderWidth: '2px',
                          '&:hover': {
                            borderColor: '#c2003c',
                            borderWidth: '2px',
                            backgroundColor: 'rgba(235,28,36,0.08)',
                          },
                          borderRadius: '12px',
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Design Later
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box component="section" sx={{ py: { xs: 5, md: 8 }, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 600, mb: 2 }}>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#555', mb: 6, maxWidth: '700px', mx: 'auto' }}>
            Join thousands of professionals who trust BappaCards
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {testimonials.map((t, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ width: 64, height: 64, border: '3px solid #EB1C24', bgcolor: '#EB1C24', fontWeight: 700, fontSize: '1.5rem' }}>
                      {t.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        {t.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {t.role}
                      </Typography>
                      {t.company && (
                        <Typography variant="caption" color="text.secondary">
                          {t.company}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} component="span" sx={{ color: '#EB1C24', fontSize: '1.25rem' }}>★</Typography>
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, fontStyle: 'italic', color: 'rgba(0,0,0,0.8)', mb: 2 }}>
                    &ldquo;{t.text}&rdquo;
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    📍 {t.location}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 5, md: 8 }, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 600, mb: 2 }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#555', mb: 6 }}>
            Everything you need to know about BappaCards
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                borderRadius: '12px !important',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Design Later Email Dialog */}
      <Dialog
        open={isEmailDialogOpen}
        onClose={() => { setIsEmailDialogOpen(false); setEmail(''); setCurrentProduct(null); }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>Design Your Card Later</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Enter your email to complete your purchase. We&apos;ll send you a link to design your card after checkout.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleDesignLaterSubmit(); } }}
            variant="outlined"
            placeholder="your@email.com"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => { setIsEmailDialogOpen(false); setEmail(''); setCurrentProduct(null); }} variant="outlined" sx={{ borderRadius: '8px' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDesignLaterSubmit}
            variant="contained"
            disabled={isLoading || !email}
            sx={{ bgcolor: '#EB1C24', '&:hover': { bgcolor: '#c2003c' }, borderRadius: '8px', minWidth: '160px' }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue to Checkout'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(errorMsg)}
        autoHideDuration={6000}
        onClose={() => setErrorMsg(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorMsg(null)} severity="error" sx={{ width: '100%', borderRadius: '12px' }}>
          {errorMsg}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={Boolean(successMsg)}
        autoHideDuration={6000}
        onClose={() => setSuccessMsg(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMsg(null)} severity="success" sx={{ width: '100%', borderRadius: '12px' }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
