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

import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />

      <main className="pt-16 bg-background text-textPrimary">

        <section className="min-h-screen flex items-center bg-gradient-to-br from-background to-card">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

              {/* TEXT */}
              <motion.div
                className="md:col-span-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h1 className="text-[36px] md:text-[64px] leading-tight font-extrabold">
                  Digital Forensics &
                  <br />
                  Incident Response
                  <br />
                  <span className="text-primary">Powered by AI</span>
                </h1>

                <p className="mt-6 text-base md:text-lg max-w-xl text-textMuted">
                  Investigate security incidents faster while maintaining
                  forensic integrity, evidentiary standards, and regulatory
                  compliance across enterprise environments.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/use-cases"
                    className="px-8 py-4 bg-primary rounded-lg font-semibold text-textInverse hover:bg-primaryHover transition"
                  >
                    View Use Cases
                  </Link>

                  <Link
                    href="/platform"
                    className="px-8 py-4 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-textInverse transition"
                  >
                    Explore Platform
                  </Link>
                </div>
              </motion.div>

              {/* REAL UI MOCK */}
              <div className="hidden md:block md:col-span-6">
                <div className="bg-card rounded-2xl border border-black/10 shadow-lg overflow-hidden">

                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 text-xs uppercase text-textMuted">
                    <span>DFIR-AI Console</span>
                    <span className="text-primary">Live Investigation</span>
                  </div>

                  {/* Body */}
                  <div className="p-6 grid grid-cols-12 gap-4">

                    {/* Case Panel */}
                    <div className="col-span-5 bg-background rounded-lg p-4">
                      <p className="text-xs uppercase font-semibold text-primary mb-2">
                        Active Case
                      </p>
                      <p className="text-sm font-semibold">IR-2026-014</p>
                      <p className="text-xs text-textMuted mt-2">
                        Ransomware intrusion with lateral movement detected.
                      </p>

                      <div className="mt-4 space-y-2 text-xs">
                        <Status label="Initial Access" color="bg-alert" />
                        <Status label="Privilege Escalation" color="bg-alert" />
                        <Status label="Containment" color="bg-success" />
                      </div>
                    </div>

                    {/* Evidence Chart */}
                    <div className="col-span-7 bg-background rounded-lg p-4">
                      <p className="text-xs uppercase font-semibold text-primary mb-2">
                        Evidence Correlation
                      </p>

                      <svg viewBox="0 0 200 90" className="w-full h-24">
                        <rect x="10" y="40" width="16" height="40" className="fill-primary" />
                        <rect x="40" y="20" width="16" height="60" className="fill-success" />
                        <rect x="70" y="55" width="16" height="25" className="fill-primary" />
                        <rect x="100" y="10" width="16" height="70" className="fill-alert" />
                        <rect x="130" y="30" width="16" height="50" className="fill-primary" />
                      </svg>

                      <p className="mt-3 text-xs text-textMuted">
                        AI-driven linkage across endpoints, logs, and artifacts.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

function Status({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
