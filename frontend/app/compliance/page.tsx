import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Compliance & Trust | DFIR-AI',
    description:
        'Compliance, security controls, and forensic integrity principles supported by DFIR-AI.'
};

export default function Compliance() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-5xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        Compliance & Trust
                    </h1>

                    <p className="text-lg text-textMuted mb-12">
                        DFIR-AI is designed to support investigations conducted in regulated
                        environments, with security, auditability, and evidentiary integrity
                        built into the platform architecture.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">

                        <ComplianceItem
                            title="ISO/IEC 27001 Alignment"
                            desc="Information security management principles aligned with ISO/IEC 27001 controls and risk management practices."
                        />

                        <ComplianceItem
                            title="SOC 2 Readiness"
                            desc="Designed to support SOC 2 Trust Service Criteria, including security, availability, and confidentiality."
                        />

                        <ComplianceItem
                            title="CJIS-Style Controls"
                            desc="Role-based access, audit logging, and data handling patterns consistent with CJIS security expectations."
                        />

                        <ComplianceItem
                            title="Forensic Chain of Custody"
                            desc="Evidence handling workflows designed to preserve integrity, traceability, and accountability."
                        />

                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function ComplianceItem({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-card rounded-xl p-6 border border-black/10">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-textMuted">{desc}</p>
        </div>
    );
}
