import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Use Cases'
};

export default function UseCases() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-5xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        DFIR Use Cases
                    </h1>

                    <p className="text-lg text-textMuted mb-12">
                        DFIR-AI is built for real-world security investigations conducted
                        by enterprise, government, and regulated organizations.
                    </p>

                    <div className="space-y-8">
                        <UseCase
                            title="Incident Response"
                            desc="Coordinate investigations, track timelines, and preserve evidence integrity."
                        />
                        <UseCase
                            title="Ransomware Analysis"
                            desc="Trace intrusion paths, identify impact, and support recovery decisions."
                        />
                        <UseCase
                            title="Insider Threat"
                            desc="Correlate user activity, access patterns, and forensic artifacts."
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function UseCase({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-card rounded-xl p-6 border border-black/10">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-textMuted">{desc}</p>
        </div>
    );
}
