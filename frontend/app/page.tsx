'use client';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      {/* ================= PRIMARY NAV ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-nav border-b border-white/10">
        <nav className="container h-16 flex items-center justify-between">
          <span className="font-extrabold tracking-wide text-textPrimary">
            DFIR-AI
          </span>

          <div className="hidden md:flex gap-8 text-sm uppercase tracking-wide text-textPrimary">
            <a className="hover:text-primary transition">Platform</a>
            <a className="hover:text-primary transition">Use Cases</a>
            <a className="hover:text-primary transition">Research</a>
            <a className="hover:text-primary transition">Compliance</a>
          </div>

          <a className="px-5 py-2 bg-primary rounded font-semibold text-sm text-white hover:bg-primaryHover transition">
            Request Demo
          </a>
        </nav>
      </header>

      <main className="pt-16 bg-background text-textPrimary">

        {/* ================= HERO ================= */}
        <section className="min-h-screen flex items-center bg-gradient-to-br from-background to-card">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            {/* TEXT */}
            <motion.div
              className="md:col-span-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[40px] leading-[48px] md:text-[64px] md:leading-[72px] font-extrabold">
                Digital Forensics &
                <br />
                Incident Response
                <br />
                <span className="text-primary">Powered by AI</span>
              </h1>

              <p className="mt-8 text-lg max-w-xl text-textPrimary/90">
                DFIR-AI enables security teams to investigate incidents faster,
                preserve forensic integrity, and meet regulatory requirements
                with confidence.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <a className="px-10 py-4 bg-primary rounded-lg font-semibold text-white hover:bg-primaryHover hover:scale-[1.03] transition">
                  Request a Demo
                </a>

                <a className="px-10 py-4 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-textInverse transition">
                  Explore Platform
                </a>
              </div>
            </motion.div>

            {/* ================= HERO MOCK ================= */}
            <div className="md:col-span-6 hidden md:block">
              <div className="rounded-2xl bg-card border border-white/10 shadow-2xl overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-xs uppercase tracking-wide">
                  <span>DFIR-AI Console</span>
                  <span className="text-primary">Live Investigation</span>
                </div>

                <div className="p-6 grid grid-cols-12 gap-4">

                  {/* Case Panel */}
                  <div className="col-span-5 bg-background rounded-lg p-4">
                    <p className="text-xs uppercase font-semibold text-primary mb-2">
                      Active Case
                    </p>
                    <p className="text-sm font-semibold">IR-2026-014</p>
                    <p className="text-xs text-textPrimary/80 mt-2">
                      Ransomware intrusion with lateral movement detected.
                    </p>

                    <div className="mt-4 space-y-2">
                      <Status label="Initial Access" color="bg-alert" />
                      <Status label="Privilege Escalation" color="bg-alert" />
                      <Status label="Containment" color="bg-success" />
                    </div>
                  </div>

                  {/* Evidence Panel */}
                  <div className="col-span-7 bg-background rounded-lg p-4">
                    <p className="text-xs uppercase font-semibold text-primary mb-2">
                      Evidence Correlation
                    </p>

                    <svg viewBox="0 0 200 90" className="w-full h-24">
                      <rect x="10" y="35" width="18" height="45" className="fill-primary" />
                      <rect x="45" y="15" width="18" height="65" className="fill-success" />
                      <rect x="80" y="50" width="18" height="30" className="fill-primary" />
                      <rect x="115" y="10" width="18" height="70" className="fill-alert" />
                      <rect x="150" y="25" width="18" height="55" className="fill-primary" />
                    </svg>

                    <p className="mt-3 text-xs text-textPrimary/80">
                      Automated correlation across endpoints, logs, and artifacts.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-card border-t border-white/10">
          <div className="container py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-textPrimary/80">

            <div>
              <h4 className="font-extrabold text-textPrimary mb-4">DFIR-AI</h4>
              <p>
                Enterprise Digital Forensics & Incident Response platform built
                for regulated environments.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-textPrimary mb-3">Platform</h5>
              <p>Platform Overview<br />Use Cases<br />Research</p>
            </div>

            <div>
              <h5 className="font-semibold text-textPrimary mb-3">Legal</h5>
              <p>Privacy Policy<br />Terms of Service</p>
            </div>

            <div>
              <h5 className="font-semibold text-textPrimary mb-3">Developed By</h5>
              <p>
                Devlan Solutions LTD<br />
                <a
                  href="https://devlan.co.ke"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  devlan.co.ke
                </a>
              </p>
            </div>

          </div>
        </footer>

      </main>
    </>
  );
}

function Status({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
