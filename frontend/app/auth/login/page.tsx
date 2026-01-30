'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { apiFetch } from '@/lib/api';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            localStorage.setItem('token', data.access_token);
            try {
                await apiFetch('/organizations/me');
                router.push('/dashboard');
            } catch {
                router.push('/onboarding/organization');
            }
        } catch {
            setError('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary min-h-screen flex items-center">
                <section className="container px-4 flex justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-card border border-black/10 rounded-xl p-8">

                            <h1 className="text-3xl font-extrabold mb-2">
                                Sign In
                            </h1>

                            <p className="text-sm text-textMuted mb-8">
                                Access your DFIR-AI workspace.
                            </p>

                            <form onSubmit={submit} className="space-y-6">

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-black/10"
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-black/10"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-lg bg-primary font-semibold text-textInverse hover:bg-primaryHover transition"
                                >
                                    {loading ? 'Signing in…' : 'Sign In'}
                                </button>

                                {error && (
                                    <p className="text-sm text-alert text-center">
                                        {error}
                                    </p>
                                )}
                            </form>

                            <p className="text-sm text-textMuted text-center mt-6">
                                New to DFIR-AI?{' '}
                                <a href="/auth/register" className="text-primary hover:underline">
                                    Create an account
                                </a>
                            </p>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
