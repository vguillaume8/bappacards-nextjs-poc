import type { Metadata } from 'next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ThemeRegistry from '@/components/ThemeRegistry';
import { AuthProvider } from '@/context/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaPixelProvider from '@/components/analytics/MetaPixelProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bappacards.com'),
  title: {
    default: 'BappaCards — Digital Business Cards with NFC',
    template: '%s | BappaCards',
  },
  description:
    'BappaCards is the modern digital business card platform with NFC tap sharing, QR codes, video backgrounds, and real-time analytics.',
  openGraph: {
    type: 'website',
    siteName: 'BappaCards',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bappacards',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <GoogleAnalytics />
        <MetaPixelProvider />
        <ThemeRegistry>
          <AuthProvider>
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
            >
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </GoogleReCaptchaProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
