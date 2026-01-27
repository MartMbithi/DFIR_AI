'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function Register() {
    const params = useSearchParams();
    const token = params.get('token');
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ token, password })
            });

            router.push('/auth/login');
        } catch {
            setError('Registration failed. The link may be invalid or expired.');
        }
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <form onSubmit={submit} className="bg-card p-8 rounded max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">
                    Create Account
                </h1>

                <input
                    type="password"
                    required
                    placeholder="Set password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-background border border-black/10"
                />

                <button className="w-full bg-primary py-3 rounded text-textInverse">
                    Complete Registration
                </button>

                {error && (
                    <p className="mt-4 text-sm text-alert">{error}</p>
                )}
            </form>
        </main>
    );
}
