'use client';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="bg-navy text-white">

      {/* ================= HERO ================= */}
      <section
        id="platform"
        className="min-h-screen bg-gradient-to-r from-navy via-slate to-electric flex items-center"
      >
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* TEXT */}
          <div className="md:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-[40px] leading-[48px] md:text-[64px] md:leading-[72px] font-extrabold tracking-tight"
            >
              Digital Forensics &
              <br />
              Incident Response,
              <br />
              <span className="text-cyan">Re-Engineered with AI</span>
            </motion.h1>

            <p className="mt-8 text-lg text-light max-w-xl">
              DFIR-AI is an enterprise-grade platform that helps security teams
              investigate incidents faster, preserve forensic integrity, and
              meet regulatory obligations — without sacrificing rigor.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a
                href="#demo"
                className="px-10 py-4 bg-gradient-to-r from-electric to-cyan rounded-lg font-semibold
                           hover:scale-[1.04] hover:shadow-[0_0_30px_#00D4FF55] transition"
              >
                Request a Demo
              </a>
              <a
                href="#use-cases"
                className="px-10 py-4 border border-cyan rounded-lg font-semibold
                           hover:bg-cyan hover:text-navy transition"
              >
                Explore Use Cases
              </a>
            </div>
          </div>

          {/* VISUAL (hidden on mobile) */}
          <div className="md:col-span-6 relative hidden md:block">
            <div className="relative h-[520px] rounded-2xl bg-slate border border-electric/30 overflow-hidden shadow-2xl">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00D4FF33,transparent_65%)]" />

              <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 text-xs uppercase tracking-wide">
                <span>DFIR-AI Console</span>
                <span className="text-cyan">Live Analysis</span>
              </div>

              <div className="relative z-10 grid grid-cols-12 gap-4 p-6">

                <div className="col-span-5 bg-navy rounded-lg p-4">
                  <p className="text-xs font-extrabold uppercase text-cyan mb-3">
                    Active Case
                  </p>
                  <p className="text-sm font-semibold">IR-2026-014</p>
                  <p className="text-xs text-light mt-2">
                    Ransomware intrusion with lateral movement detected.
                  </p>
                </div>

                <div className="col-span-7 bg-navy rounded-lg p-4">
                  <p className="text-xs font-extrabold uppercase text-cyan mb-3">
                    Evidence Correlation
                  </p>

                  <svg viewBox="0 0 200 80" className="w-full h-20">
                    <rect x="10" y="30" width="15" height="40" fill="#0080FF" />
                    <rect x="40" y="10" width="15" height="60" fill="#00D4FF" />
                    <rect x="70" y="40" width="15" height="30" fill="#0080FF" />
                    <rect x="100" y="5" width="15" height="65" fill="#00D4FF" />
                  </svg>

                  <p className="mt-3 text-xs text-light">
                    AI-driven artifact linkage across endpoints and logs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section id="use-cases" className="bg-navy">
        <div className="container text-center max-w-5xl">
          <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
            Built for Real-World DFIR Scenarios
          </h2>
          <p className="text-light mb-16">
            Designed for the investigations security teams actually conduct —
            not theoretical workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">

            {[
              {
                title: 'Incident Response',
                desc: 'Coordinate end-to-end investigations with timelines, evidence, and audit trails.'
              },
              {
                title: 'Ransomware Analysis',
                desc: 'Trace intrusion paths, identify blast radius, and preserve forensic artifacts.'
              },
              {
                title: 'Insider Threat',
                desc: 'Correlate user activity, access patterns, and suspicious behavior with AI support.'
              }
            ].map((uc, i) => (
              <div
                key={i}
                className="bg-slate rounded-xl p-8 border border-electric/10 hover:border-electric/30 transition"
              >
                <h3 className="text-xl font-semibold mb-4">{uc.title}</h3>
                <p className="text-sm text-light">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPLIANCE & TRUST ================= */}
      <section id="compliance" className="bg-slate">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-6">
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
              Compliance Is Not Optional
            </h2>
            <p className="text-light max-w-lg">
              DFIR-AI is engineered for regulated environments where chain of
              custody, auditability, and access control are non-negotiable.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-6 text-sm">
            {[
              'ISO/IEC 27001 Aligned',
              'SOC 2 Type II Ready',
              'CJIS-Style Controls',
              'Forensic Chain of Custody'
            ].map((badge, i) => (
              <div
                key={i}
                className="p-6 bg-navy rounded-lg border border-electric/10 text-center font-semibold"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section id="demo" className="bg-gradient-to-r from-navy to-electric">
        <div className="container text-center max-w-3xl">
          <h2 className="text-[36px] md:text-[48px] font-extrabold mb-6">
            See DFIR-AI in Action
          </h2>
          <p className="text-light mb-10">
            Discover how modern DFIR teams investigate faster without
            compromising forensic integrity.
          </p>
          <a
            href="#"
            className="px-12 py-5 bg-cyan text-navy rounded-lg font-semibold
                       hover:scale-[1.04] transition"
          >
            Request Enterprise Demo
          </a>
        </div>
      </section>

    </main>
  );
}
