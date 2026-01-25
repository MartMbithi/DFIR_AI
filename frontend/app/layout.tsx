export const metadata = {
  title: "DFIR-AI | Enterprise DFIR SaaS",
  description: "AI-powered Digital Forensics & Incident Response platform built for modern SOCs"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
