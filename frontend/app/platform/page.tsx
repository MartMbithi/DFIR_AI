import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Platform Overview'
};

export default function Platform() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container py-24 max-w-4xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        DFIR-AI Platform
                    </h1>

                    <p className="text-lg mb-8">
                        DFIR-AI provides an integrated environment for digital forensics
                        and incident response, combining case management, evidence handling,
                        and AI-assisted analysis.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-card p-8 rounded-xl">
                            <h3 className="font-semibold mb-3">Case Management</h3>
                            <p className="text-sm">
                                Centralized investigations with immutable audit trails.
                            </p>
                        </div>

                        <div className="bg-card p-8 rounded-xl">
                            <h3 className="font-semibold mb-3">Evidence Handling</h3>
                            <p className="text-sm">
                                Chain-of-custody enforced by design.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
