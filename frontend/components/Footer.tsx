import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-black/10">
      <div
        className="
          container
          py-16
          grid grid-cols-1 md:grid-cols-4 gap-10
          text-sm
          text-textPrimary
        "
      >
        {/* Column 1 */}
        <div>
          <h4 className="font-extrabold mb-4">DFIR-AI</h4>
          <p className="text-textMuted">
            Enterprise Digital Forensics & Incident Response platform built
            for regulated environments.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h5 className="font-semibold mb-3">Platform</h5>
          <div className="text-textMuted leading-6 flex flex-col gap-1">
            <Link href="/platform" className="hover:text-primary">
              Platform
            </Link>
            <Link href="/use-cases" className="hover:text-primary">
              Use Cases
            </Link>
            <Link href="/research" className="hover:text-primary">
              Research
            </Link>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h5 className="font-semibold mb-3">Legal</h5>
          <div className="text-textMuted leading-6 flex flex-col gap-1">
            <Link href="/legal/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h5 className="font-semibold mb-3">Developed By</h5>
          <p className="text-textMuted leading-6">
            Devlan Solutions LTD<br />
            <a
              href="https://devlan.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              devlan.co.ke
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
