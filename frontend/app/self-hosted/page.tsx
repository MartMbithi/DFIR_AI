import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Self-Hosted (Community) | DFIR-AI',
    description:
        'Self-host the DFIR-AI Community Edition. Clone, deploy, and run DFIR-AI in your own environment.'
};

export default function SelfHosted() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-5xl">

                    <h1 className="text-4xl font-extrabold mb-6">
                        Self-Hosted DFIR-AI (Community Edition)
                    </h1>

                    <p className="text-lg text-textMuted mb-10">
                        The Community Edition of DFIR-AI allows security practitioners,
                        researchers, and organizations to deploy the platform in their own
                        environment. This option provides full control over data, infrastructure,
                        and security posture.
                    </p>

                    {/* GitHub Link */}
                    <div className="mb-12">
                        <a
                            href="https://github.com/MartMbithi/DFIR_AI"
                            target="_blank"
                            className="inline-block px-6 py-3 bg-card border border-black/10
                         rounded-lg font-semibold text-primary hover:underline"
                        >
                            View Source on GitHub →
                        </a>
                    </div>

                    {/* Steps */}
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
uvicorn app.main:app --reload`}
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
                            title="Environment Configuration"
                            desc="Configure environment variables for database connections, secrets, and API endpoints as required for your deployment."
                        />

                        <Step
                            number="05"
                            title="Run & Extend"
                            desc="Once running, you can extend the platform with custom analysis modules, integrations, and workflows specific to your DFIR needs."
                        />

                    </div>

                    {/* Note */}
                    <div className="mt-16 bg-card border border-black/10 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Community vs Enterprise</h3>
                        <p className="text-sm text-textMuted">
                            The Community Edition is self-managed and does not include hosted
                            services, managed authentication, or enterprise support. For a
                            fully managed DFIR-AI experience with advanced features, request
                            an enterprise demo.
                        </p>
                    </div>

                </section>
            </main>

            <Footer />
        </>
    );
}

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
