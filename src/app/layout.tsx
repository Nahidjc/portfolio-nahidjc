import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import MuiProvider from '@/providers/MuiProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MD. NAHID — Software Engineer',
  description:
    'Software Engineer specializing in Node.js, React.js, AWS Lambda, and fintech systems. 4+ years experience building scalable, production-ready software.',
  keywords: [
    'Software Engineer',
    'Node.js',
    'React.js',
    'AWS Lambda',
    'Backend Developer',
    'Bangladesh',
  ],
  authors: [{ name: 'MD. NAHID' }],
  openGraph: {
    title: 'MD. NAHID — Software Engineer',
    description: 'Software Engineer building scalable systems and reliable software.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body style={{ margin: 0 }}>
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
