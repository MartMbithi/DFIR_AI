import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Self-Hosted vs Enterprise | DFIR-AI',
    description:
        'Compare DFIR-AI Community (self-hosted) and Enterprise editions. Understand features, deployment options, and operational trade-offs.'
};

export default function SelfHosted() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-6xl">

                    {/* ===== INTRO ===== */}
                    <h1 className="text-4xl font-extrabold mb-6">
                        Self-Hosted vs Enterprise DFIR-AI
                    </h1>

                    <p className="text-lg text-textMuted max-w-3xl mb-12">
                        DFIR-AI is available as a self-hosted Community Edition or as a fully
                        managed Enterprise platform. This comparison is intended to help
                        security teams choose the deployment model that best aligns with
                        their operational, regulatory, and scaling requirements.
                    </p>

                    {/* ===== COMPARISON TABLE ===== */}
                    <div className="overflow-x-auto mb-16">
                        <table className="w-full border border-black/10 rounded-xl overflow-hidden">
                            <thead className="bg-card">
                                <tr>
                                    <th className="text-left p-4 text-sm font-semibold">
                                        Feature
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold">
                                        Community (Self-Hosted)
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold">
                                        Enterprise (Managed)
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-black/10">
                                <Row
                                    feature="Deployment Model"
                                    community="Self-managed infrastructure"
                                    enterprise="Fully managed SaaS"
                                />
                                <Row
                                    feature="Source Code Access"
                                    community="✓ Open source"
                                    enterprise="✓ Included"
                                />
                                <Row
                                    feature="Case Management"
                                    community="✓ Core functionality"
                                    enterprise="✓ Advanced workflows"
                                />
                                <Row
                                    feature="Evidence Chain of Custody"
                                    community="✓ Manual enforcement"
                                    enterprise="✓ Enforced & audited"
                                />
                                <Row
                                    feature="AI-Assisted Analysis"
                                    community="Limited / experimental"
                                    enterprise="✓ Production-grade"
                                />
                                <Row
                                    feature="User Management"
                                    community="Local / basic"
                                    enterprise="✓ SSO, RBAC"
                                />
                                <Row
                                    feature="Compliance Alignment"
                                    community="Best-effort"
                                    enterprise="✓ ISO, SOC2, CJIS-style"
                                />
                                <Row
                                    feature="Scalability"
                                    community="Single-tenant"
                                    enterprise="✓ Multi-tenant, elastic"
                                />
                                <Row
                                    feature="Updates & Maintenance"
                                    community="Manual"
                                    enterprise="✓ Managed & automatic"
                                />
                                <Row
                                    feature="Support"
                                    community="Community-driven"
                                    enterprise="✓ Enterprise SLA"
                                />
                            </tbody>
                        </table>
                    </div>

                    {/* ===== CTA SPLIT ===== */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">

                        {/* Community */}
                        <div className="bg-card border border-black/10 rounded-xl p-6">
                            <h3 className="font-semibold text-lg mb-3">
                                Community Edition (Self-Hosted)
                            </h3>
                            <p className="text-sm text-textMuted mb-6">
                                Ideal for researchers, small teams, and organizations that need
                                full control over their DFIR environment and are comfortable
                                managing infrastructure and updates.
                            </p>

                            <a
                                href="https://github.com/MartMbithi/DFIR_AI"
                                target="_blank"
                                className="inline-block px-5 py-3 bg-background border border-black/10
                           rounded-lg font-semibold text-primary hover:underline"
                            >
                                View on GitHub →
                            </a>
                        </div>

                        {/* Enterprise */}
                        <div className="bg-card border border-black/10 rounded-xl p-6">
                            <h3 className="font-semibold text-lg mb-3">
                                Enterprise Edition (Managed)
                            </h3>
                            <p className="text-sm text-textMuted mb-6">
                                Designed for enterprises and regulated environments that require
                                scalability, compliance alignment, managed security, and support.
                            </p>

                            <a
                                href="/platform"
                                className="inline-block px-5 py-3 bg-primary rounded-lg
                           font-semibold text-textInverse hover:bg-primaryHover transition"
                            >
                                Request Enterprise Demo
                            </a>
                        </div>

                    </div>

                    {/* ===== SELF-HOSTING STEPS ===== */}
                    <h2 className="text-2xl font-extrabold mb-6">
                        Getting Started (Community Edition)
                    </h2>

                    <div className="space-y-8">

                        <Step
                            number="01"
                            title="Clone the Repository"
                            code={`git clone https://github.com/MartMbithi/DFIR_AI.git
                            cd DFIR_AI`}
                        />

                        <Step
                            number="02"
                            title="Backend Setup (FastAPI)"
                            code={`cd backend
                                python -m venv venv
                                source venv/bin/activate  # Windows: venv\\Scripts\\activate
                                pip install -r requirements.txt
                                uvicorn backend.main:app`}
                        />

                        <Step
                            number="03"
                            title="Frontend Setup (Next.js)"
                            code={`cd frontend
                            npm install
                            npm run dev`}
                        />

                        <Step
                            number="04"
                            title="Configure Environment"
                            desc="Set environment variables for database connections, secrets, and API endpoints according to your environment."
                        />

                    </div>

                </section>
            </main>

            <Footer />
        </>
    );
}

/* ===== TABLE ROW ===== */
function Row({
    feature,
    community,
    enterprise
}: {
    feature: string;
    community: string;
    enterprise: string;
}) {
    return (
        <tr>
            <td className="p-4 text-sm font-medium">
                {feature}
            </td>
            <td className="p-4 text-sm text-textMuted">
                {community}
            </td>
            <td className="p-4 text-sm">
                {enterprise}
            </td>
        </tr>
    );
}

/* ===== STEP ===== */
function Step({
    number,
    title,
    code,
    desc
}: {
    number: string;
    title: string;
    code?: string;
    desc?: string;
}) {
    return (
        <div className="bg-card border border-black/10 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-3">
                <span className="text-primary font-extrabold">{number}</span>
                <h3 className="font-semibold">{title}</h3>
            </div>

            {code && (
                <pre className="bg-background border border-black/10 rounded p-4 text-sm overflow-x-auto">
                    <code>{code}</code>
                </pre>
            )}

            {desc && (
                <p className="text-sm text-textMuted">{desc}</p>
            )}
        </div>
    );
}
