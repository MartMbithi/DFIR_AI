'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { apiFetch } from '@/lib/api';

export default function Register() {
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
            await apiFetch('/users/', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            // After successful signup → login
            router.push('/auth/login');
        } catch (err: any) {
            setError('Account creation failed. Email may already exist.');
            
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
                                Create Your Account
                            </h1>

                            <p className="text-sm text-textMuted mb-8">
                                Sign up to start using DFIR-AI.
                            </p>

                            <form onSubmit={submit} className="space-y-6">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-black/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-black/10"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-lg bg-primary font-semibold text-textInverse hover:bg-primaryHover transition"
                                >
                                    {loading ? 'Creating account…' : 'Create Account'}
                                </button>

                                {error && (
                                    <p className="text-sm text-alert text-center">
                                        {error}
                                    </p>
                                )}
                            </form>

                            <p className="text-sm text-textMuted text-center mt-6">
                                Already have an account?{' '}
                                <a href="/auth/login" className="text-primary hover:underline">
                                    Sign in
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
