'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingNav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy/70 backdrop-blur border-b border-white/10"
    >
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-lg tracking-wide">
          DFIR-AI
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide text-light">
          <Link href="#platform" className="hover:text-cyan transition">Platform</Link>
          <Link href="#use-cases" className="hover:text-cyan transition">Use Cases</Link>
          <Link href="#compliance" className="hover:text-cyan transition">Compliance</Link>
          <Link href="#blog" className="hover:text-cyan transition">Research</Link>
        </nav>

        {/* CTA */}
        <Link
          href="#demo"
          className="px-5 py-2 bg-gradient-to-r from-electric to-cyan rounded font-extrabold text-xs uppercase tracking-wide hover:scale-[1.03] transition"
        >
          Request Demo
        </Link>
      </div>
    </motion.header>
  );
}
