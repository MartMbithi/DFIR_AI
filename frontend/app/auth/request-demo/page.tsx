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
        } catch {
            setError('Unable to submit request. Please try again.');
        }
    }

    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary min-h-screen flex items-center">
                <section className="container px-4 flex justify-center">
                    <div className="w-full max-w-md">

                        {/* Card */}
                        <div className="bg-card border border-black/10 rounded-xl p-8 shadow-sm">
                            <h1 className="text-3xl font-extrabold mb-2">
                                Request a Demo
                            </h1>

                            <p className="text-sm text-textMuted mb-8">
                                Get access to DFIR-AI and see how modern teams investigate
                                incidents with speed and integrity.
                            </p>

                            {!sent ? (
                                <form onSubmit={submit} className="space-y-6">

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Work Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="
                        w-full
                        px-4 py-3
                        rounded-lg
                        bg-background
                        border border-black/10
                        focus:outline-none
                        focus:ring-2 focus:ring-primary
                      "
                                        />
                                    </div>

                                    {/* CTA */}
                                    <button
                                        type="submit"
                                        className="
                      w-full
                      py-3
                      rounded-lg
                      bg-primary
                      font-semibold
                      text-textInverse
                      hover:bg-primaryHover
                      transition
                    "
                                    >
                                        Continue
                                    </button>

                                    {error && (
                                        <p className="text-sm text-alert text-center">
                                            {error}
                                        </p>
                                    )}
                                </form>
                            ) : (
                                <p className="text-textMuted text-sm">
                                    Thanks — check your email to complete account setup.
                                </p>
                            )}
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
