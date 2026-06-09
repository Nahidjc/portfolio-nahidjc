import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import MuiProvider from '@/providers/MuiProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nahid.ppimscaa.com'),
  title: {
    default: 'MD. NAHID | Software Engineer',
    template: '%s | MD. NAHID',
  },
  description:
    'Software Engineer specializing in Node.js, React.js, React Native, MySQL, and AWS Lambda. 4+ years of experience building scalable backend services and fintech systems.',
  keywords: [
    'MD. NAHID',
    'Nahidjc',
    'Software Engineer',
    'Backend Developer',
    'Node.js Developer',
    'React Developer',
    'React Native',
    'AWS Lambda',
    'Serverless Engineer',
    'Fintech Developer',
    'Dhaka Bangladesh',
    'Full Stack Engineer',
  ],
  authors: [{ name: 'MD. NAHID', url: 'https://github.com/nahidjc' }],
  creator: 'MD. NAHID',
  publisher: 'MD. NAHID',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MD. NAHID | Software Engineer',
    description:
      'Software Engineer specializing in Node.js, React.js, React Native, MySQL, and AWS Lambda.',
    url: 'https://nahidjc.com',
    siteName: 'MD. NAHID Portfolio',
    images: [
      {
        url: 'https://avatars.githubusercontent.com/u/50502837?v=4',
        width: 1200,
        height: 630,
        alt: 'MD. NAHID — Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD. NAHID | Software Engineer',
    description:
      'Software Engineer specializing in Node.js, React.js, React Native, MySQL, and AWS Lambda.',
    creator: '@nahidjc',
    images: ['https://avatars.githubusercontent.com/u/50502837?v=4'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <AppRouterCacheProvider>
          <MuiProvider>
            <Navbar />
            {children}
            <Footer />
          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
