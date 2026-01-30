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
                                href="/register"
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
