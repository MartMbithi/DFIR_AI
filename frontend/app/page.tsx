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
