import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
export const metadata = {
  title: {
    default: 'DFIR-AI | Enterprise DFIR Platform',
    template: '%s | DFIR-AI'
  },
  description:
    'Enterprise-grade AI-powered Digital Forensics & Incident Response platform.',
  authors: [{ name: 'Devlan Solutions LTD', url: 'https://devlan.co.ke' }],
  creator: 'Devlan Solutions LTD',
  publisher: 'Devlan Solutions LTD'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0E27] text-[#F5F6F8] antialiased">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
