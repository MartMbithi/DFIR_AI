export default function Footer() {
  return (
    <footer className="bg-slate mt-24 border-t border-white/10">
      <div className="container py-16 grid md:grid-cols-3 gap-12 text-sm text-light">

        <div>
          <h4 className="font-extrabold mb-4">DFIR-AI</h4>
          <p>Enterprise Digital Forensics & Incident Response Platform.</p>
        </div>

        <div>
          <h4 className="font-extrabold mb-4">Compliance</h4>
          <p>ISO 27001 • SOC 2 • CJIS-Aligned</p>
        </div>

        <div>
          <h4 className="font-extrabold mb-4">Security</h4>
          <p>Chain of Custody • Audit Trails • Zero Trust</p>
        </div>

      </div>
    </footer>
  );
}
