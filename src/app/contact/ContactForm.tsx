'use client';

import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { sendContactUs } from '@/lib/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  message: string;
  website: string;
}

interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    company: '',
    message: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setNotification({ show: true, message: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification({ show: true, message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const concernText =
        [formData.role, formData.company].filter(Boolean).join(' at ') || 'general';

      const recaptchaToken = executeRecaptcha ? await executeRecaptcha('contact') : '';

      await sendContactUs({
        name: fullName,
        email: formData.email,
        concern: concernText,
        message: formData.message,
        honeypot: formData.website,
        recaptchaToken,
      });

      setNotification({
        show: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
        type: 'success',
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        company: '',
        message: '',
        website: '',
      });
    } catch {
      setNotification({
        show: true,
        message: 'Failed to send message. Please try again or contact us directly at support@bappacards.com',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const handleScheduleDemo = () => {
    setFormData((prev) => ({ ...prev, message: "I'd like to schedule a demo" }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Contact Form Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Box ref={formRef} sx={{ maxWidth: '800px', margin: '0 auto', px: { xs: 2, md: 0 } }}>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Get in Touch
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Honeypot field */}
            <Box
              sx={{
                position: 'absolute',
                left: '-9999px',
                opacity: 0,
                height: 0,
                overflow: 'hidden',
              }}
              aria-hidden="true"
            >
              <TextField
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                label="Website"
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  required
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Box>
              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Company / Institution"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Box>
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  bgcolor: '#EB1C24',
                  '&:hover': { bgcolor: '#D71920' },
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '8px',
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Additional Contact Info */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#F8F8F8' }}>
        <Box sx={{ maxWidth: '900px', margin: '0 auto', px: { xs: 2, md: 0 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                component="button"
                onClick={handleScheduleDemo}
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  color: 'inherit',
                  textDecoration: 'underline',
                  textDecorationColor: 'transparent',
                  transition: 'text-decoration-color 0.2s ease',
                  '&:hover': { textDecorationColor: 'currentColor' },
                }}
              >
                Schedule a Demo
              </Typography>
              <Typography variant="body1" color="text.secondary">
                See Bappa in action with a personalized demo tailored to your needs.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                Request Pricing
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get custom pricing based on your volume and integration requirements.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                Partnership Opportunities
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Interested in partnering with Bappa? Let&apos;s explore opportunities together.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={notification.show}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{
            width: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px',
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
