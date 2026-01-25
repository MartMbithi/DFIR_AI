import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Platform'
};

export default function Platform() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-5xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        DFIR-AI Platform
                    </h1>

                    <p className="text-lg text-textMuted mb-12">
                        DFIR-AI provides an integrated environment for digital forensics
                        and incident response, combining case management, evidence handling,
                        and AI-assisted analysis.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Feature title="Case Management">
                            Centralized investigations with immutable audit trails.
                        </Feature>
                        <Feature title="Evidence Handling">
                            Chain-of-custody enforced by design across all artifacts.
                        </Feature>
                        <Feature title="AI Analysis">
                            Automated timelines, correlation, and anomaly detection.
                        </Feature>
                        <Feature title="Reporting">
                            Court-ready, compliance-aligned investigation reports.
                        </Feature>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function Feature({ title, children }: { title: string; children: string }) {
    return (
        <div className="bg-card rounded-xl p-6 border border-black/10">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-textMuted">{children}</p>
        </div>
    );
}
