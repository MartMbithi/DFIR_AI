import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Privacy Policy | DFIR-AI'
};

export default function PrivacyPolicy() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-4xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        Privacy Policy
                    </h1>

                    <p className="text-textMuted mb-6">
                        DFIR-AI respects your privacy. This Privacy Policy outlines how
                        information is collected, used, and protected when using the
                        DFIR-AI platform and related services.
                    </p>

                    <h2 className="font-semibold text-xl mt-10 mb-3">
                        Information We Collect
                    </h2>
                    <p className="text-textMuted mb-6">
                        We may collect limited information such as contact details,
                        technical metadata, and usage data necessary to operate and
                        improve the platform.
                    </p>

                    <h2 className="font-semibold text-xl mt-10 mb-3">
                        Use of Information
                    </h2>
                    <p className="text-textMuted mb-6">
                        Information is used solely for providing, maintaining, and
                        improving DFIR-AI services. We do not sell personal data.
                    </p>

                    <h2 className="font-semibold text-xl mt-10 mb-3">
                        Data Protection
                    </h2>
                    <p className="text-textMuted">
                        Reasonable administrative and technical safeguards are applied
                        to protect information against unauthorized access.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
}
