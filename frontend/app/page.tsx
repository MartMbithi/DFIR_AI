import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="text-center py-32">
        <img src="/logo.svg" className="mx-auto w-28 mb-6" />
        <h1 className="text-5xl font-bold">DFIR-AI</h1>
        <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
          A next-generation Digital Forensics & Incident Response SaaS platform
          for SOC teams, MSSPs, and enterprises.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/pricing" className="px-6 py-3 bg-cyan-500 text-black rounded-lg">View Pricing</Link>
          <Link href="/use-cases" className="px-6 py-3 border border-cyan-500 rounded-lg">Use Cases</Link>
        </div>
      </section>
    </main>
  );
}
