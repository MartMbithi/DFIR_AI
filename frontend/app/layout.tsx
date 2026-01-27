import './globals.css'
import type { Metadata } from 'next';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: {
    default: 'DFIR-AI | Digital Forensics & Incident Response',
    template: '%s | DFIR-AI'
  },
  description:
    'Enterprise-grade Digital Forensics & Incident Response platform designed for regulated environments.',
  metadataBase: new URL('https://dfir-ai.dev'),
  openGraph: {
    title: 'DFIR-AI',
    description:
      'AI-powered Digital Forensics & Incident Response for enterprise and government.',
    url: 'https://dfir-ai.dev',
    siteName: 'DFIR-AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DFIR-AI Platform'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DFIR-AI',
    description:
      'AI-powered Digital Forensics & Incident Response platform.',
    images: ['/og-image.png']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-textPrimary antialiased">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
