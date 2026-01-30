'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-nav border-b border-black/10">
      <div className="container h-16 flex items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="font-extrabold tracking-wide text-textPrimary hover:text-primary transition"
        >
          DFIR-AI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide text-textPrimary">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/platform" className="hover:text-primary transition">
            Platform
          </Link>
          <Link href="/use-cases" className="hover:text-primary transition">
            Use Cases
          </Link>
          <Link href="/research" className="hover:text-primary transition">
            Research
          </Link>
          <Link href="/compliance" className="hover:text-primary transition">
            Compliance
          </Link>
          <Link href="/self-hosted" className="hover:text-primary transition">
            Self Hosted
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/auth/register"
          className="hidden md:inline-block px-5 py-2 bg-primary rounded font-semibold text-textInverse hover:bg-primaryHover transition"
        >
          Request Demo
        </Link>

        {/* Hamburger (Mobile Only) */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          <span className="w-6 h-[2px] bg-textPrimary" />
          <span className="w-6 h-[2px] bg-textPrimary" />
          <span className="w-6 h-[2px] bg-textPrimary" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-nav border-t border-black/10">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm uppercase text-textPrimary">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/platform" onClick={() => setOpen(false)}>
              Platform
            </Link>
            <Link href="/use-cases" onClick={() => setOpen(false)}>
              Use Cases
            </Link>
            <Link href="/research" onClick={() => setOpen(false)}>
              Research
            </Link>
            <Link href="/compliance" onClick={() => setOpen(false)}>
              Compliance
            </Link>
            <Link href="/self-hosted" onClick={() => setOpen(false)}>
              Self Hosted
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-primary rounded text-textInverse text-center"
            >
              Request Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
