'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* ===== PRIMARY NAV ===== */}
      <Nav />

      {/* ===== MAIN CONTENT ===== */}
      <main className="pt-16 bg-background text-textPrimary">

        {/* ===== HERO SECTION ===== */}
        <section className="min-h-screen flex items-center bg-gradient-to-br from-background to-card">
          <div className="container px-4 md:px-8">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

              {/* ===== TEXT BLOCK ===== */}
              <motion.div
                className="md:col-span-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h1 className="text-[36px] leading-[44px] md:text-[64px] md:leading-[72px] font-extrabold">
                  Digital Forensics &
                  <br />
                  Incident Response
                  <br />
                  <span className="text-primary">Powered by AI</span>
                </h1>

                <p className="mt-6 text-base md:text-lg max-w-xl text-textPrimary/90">
                  Investigate security incidents faster while maintaining
                  forensic integrity, evidentiary standards, and regulatory
                  compliance across enterprise environments.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/use-cases"
                    className="px-8 py-4 bg-primary rounded-lg font-semibold text-white
                               hover:bg-primaryHover transition"
                  >
                    Request a Demo
                  </Link>

                  <Link
                    href="/platform"
                    className="px-8 py-4 border border-primary rounded-lg font-semibold text-primary
                               hover:bg-primary hover:text-textInverse transition"
                  >
                    Explore Platform
                  </Link>
                </div>
              </motion.div>

              {/* ===== VISUAL BLOCK ===== */}
              <div className="hidden md:block md:col-span-6">
                <img
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c"
                  alt="Security analysts performing digital forensics investigation"
                  className="h-[420px] w-full object-cover rounded-2xl bg-card border border-white/10"
                />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
}
