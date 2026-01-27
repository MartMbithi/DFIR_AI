'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            localStorage.setItem('token', data.access_token);
            router.push('/dashboard');
        } catch {
            setError('Invalid credentials.');
        }
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <form onSubmit={submit} className="bg-card p-8 rounded max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">
                    Sign In
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-background border border-black/10"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 rounded bg-background border border-black/10"
                />

                <button className="w-full bg-primary py-3 rounded text-textInverse">
                    Login
                </button>

                {error && (
                    <p className="mt-4 text-sm text-alert">{error}</p>
                )}
            </form>
        </main>
    );
}
