import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Terms of Service | DFIR-AI'
};

export default function TermsOfService() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-4xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        Terms of Service
                    </h1>

                    <p className="text-textMuted mb-6">
                        By accessing or using DFIR-AI, you agree to comply with and be
                        bound by these Terms of Service.
                    </p>

                    <h2 className="font-semibold text-xl mt-10 mb-3">
                        Use of the Platform
                    </h2>
                    <p className="text-textMuted mb-6">
                        DFIR-AI may be used only for lawful purposes and in accordance
                        with applicable regulations and policies.
                    </p>

                    <h2 className="font-semibold text-xl mt-10 mb-3">
                        Intellectual Property
                    </h2>
                    <p className="text-textMuted mb-6">
                        All content, software, and trademarks associated with DFIR-AI
                        remain the property of their respective owners.
                    </p>

                    <h2 className="font-semibold text-xl mt-10 mb-3">
                        Limitation of Liability
                    </h2>
                    <p className="text-textMuted">
                        DFIR-AI is provided “as is” without warranties of any kind. Use
                        of the platform is at your own risk.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
}
