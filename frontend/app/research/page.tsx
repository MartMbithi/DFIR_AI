import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Research | DFIR-AI',
    description:
        'Technical research, methodologies, and insights on digital forensics and incident response.'
};

export default function Research() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-5xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        Research & Insights
                    </h1>

                    <p className="text-lg text-textMuted mb-12">
                        DFIR-AI research focuses on advancing digital forensics and incident
                        response through applied machine learning, structured investigations,
                        and evidence-centric workflows.
                    </p>

                    <div className="space-y-10">

                        <ResearchItem
                            title="AI-Assisted Timeline Reconstruction"
                            desc="Techniques for correlating logs, endpoints, and artifacts into defensible investigation timelines."
                        />

                        <ResearchItem
                            title="Forensic Integrity in Automated Systems"
                            desc="Design patterns for maintaining chain-of-custody while introducing automation and AI."
                        />

                        <ResearchItem
                            title="Incident Response in Regulated Environments"
                            desc="Balancing speed, rigor, and compliance in enterprise and government investigations."
                        />

                        <ResearchItem
                            title="Operationalizing DFIR at Scale"
                            desc="Lessons from large-scale investigations and multi-tenant forensic platforms."
                        />

                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function ResearchItem({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-card rounded-xl p-6 border border-black/10">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-textMuted">{desc}</p>
        </div>
    );
}
