'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { apiFetch } from '@/lib/api';

export default function RequestDemo() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            await apiFetch('/auth/request-demo', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            setSent(true);
        } catch (err: any) {
            setError('Unable to submit request. Please try again.');
        }
    }

    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container py-24 max-w-md">
                    <h1 className="text-3xl font-extrabold mb-6">
                        Request a Demo
                    </h1>

                    {!sent ? (
                        <form onSubmit={submit} className="space-y-6">
                            <input
                                type="email"
                                required
                                placeholder="work@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded bg-card border border-black/10"
                            />

                            <button className="w-full bg-primary py-3 rounded font-semibold text-textInverse">
                                Continue
                            </button>

                            {error && (
                                <p className="text-sm text-alert">{error}</p>
                            )}
                        </form>
                    ) : (
                        <p className="text-textMuted">
                            Check your email to complete account setup.
                        </p>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
