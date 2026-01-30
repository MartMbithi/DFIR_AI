/*
 *   Crafted On Fri Jan 30 2026
 *   From his finger tips, through his IDE to your deployment environment at full throttle with no bugs, loss of data,
 *   fluctuations, signal interference, or doubt—it can only be
 *   the legendary coding wizard, Martin Mbithi (martin@devlan.co.ke, www.martmbithi.github.io)
 *   
 *   www.devlan.co.ke
 *   hello@devlan.co.ke
 *
 *
 *   The Devlan Solutions LTD Super Duper User License Agreement
 *   Copyright (c) 2022 Devlan Solutions LTD
 *
 *
 *   1. LICENSE TO BE AWESOME
 *   Congrats, you lucky human! Devlan Solutions LTD hereby bestows upon you the magical,
 *   revocable, personal, non-exclusive, and totally non-transferable right to install this epic system
 *   on not one, but TWO separate computers for your personal, non-commercial shenanigans.
 *   Unless, of course, you've leveled up with a commercial license from Devlan Solutions LTD.
 *   Sharing this software with others or letting them even peek at it? Nope, that's a big no-no.
 *   And don't even think about putting this on a network or letting a crowd join the fun unless you
 *   first scored a multi-user license from us. Sharing is caring, but rules are rules!
 *
 *   2. COPYRIGHT POWER-UP
 *   This Software is the prized possession of Devlan Solutions LTD and is shielded by copyright law
 *   and the forces of international copyright treaties. You better not try to hide or mess with
 *   any of our awesome proprietary notices, labels, or marks. Respect the swag!
 *
 *
 *   3. RESTRICTIONS, NO CHEAT CODES ALLOWED
 *   You may not, and you shall not let anyone else:
 *   (a) reverse engineer, decompile, decode, decrypt, disassemble, or do any sneaky stuff to
 *   figure out the source code of this software;
 *   (b) modify, remix, distribute, or create your own funky version of this masterpiece;
 *   (c) copy (except for that one precious backup), distribute, show off in public, transmit, sell, rent,
 *   lease, or otherwise exploit the Software like it's your own.
 *
 *
 *   4. THE ENDGAME
 *   This License lasts until one of us says 'Game Over'. You can call it quits anytime by
 *   destroying the Software and all the copies you made (no hiding them under your bed).
 *   If you break any of these sacred rules, this License self-destructs, and you must obliterate
 *   every copy of the Software, no questions asked.
 *
 *
 *   5. NO GUARANTEES, JUST PIXELS
 *   DEVLAN SOLUTIONS LTD doesn’t guarantee this Software is flawless—it might have a few
 *   quirks, but who doesn’t? DEVLAN SOLUTIONS LTD washes its hands of any other warranties,
 *   implied or otherwise. That means no promises of perfect performance, marketability, or
 *   non-infringement. Some places have different rules, so you might have extra rights, but don’t
 *   count on us for backup if things go sideways. Use at your own risk, brave adventurer!
 *
 *
 *   6. SEVERABILITY—KEEP THE GOOD STUFF
 *   If any part of this License gets tossed out by a judge, don’t worry—the rest of the agreement
 *   still stands like a boss. Just because one piece fails doesn’t mean the whole thing crumbles.
 *
 *
 *   7. NO DAMAGE, NO DRAMA
 *   Under no circumstances will Devlan Solutions LTD or its squad be held responsible for any wild,
 *   indirect, or accidental chaos that might come from using this software—even if we warned you!
 *   And if you ever think you’ve got a claim, the most you’re getting out of us is the license fee you
 *   paid—if any. No drama, no big payouts, just pixels and code.
 *
 */
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
          <Link href="/login" className="hover:text-primary transition">
            Login
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/register"
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
             <Link href="/login" onClick={() => setOpen(false)}>
              Login
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
