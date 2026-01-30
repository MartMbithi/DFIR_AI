'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function CreateOrganization() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await apiFetch('/organizations/', {
                method: 'POST',
                body: JSON.stringify({ organization_name: name })
            });

            router.push('/dashboard');
        } catch {
            setError('Failed to create organization.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <form
                onSubmit={submit}
                className="bg-card border border-black/10 rounded-xl p-8 w-full max-w-md"
            >
                <h1 className="text-2xl font-extrabold mb-4">
                    Create Your Organization
                </h1>

                <p className="text-sm text-textMuted mb-6">
                    Set up your organization to start managing cases and investigations.
                </p>

                <input
                    required
                    placeholder="Organization name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 mb-6 rounded bg-background border border-black/10"
                />

                <button
                    disabled={loading}
                    className="w-full py-3 bg-primary rounded font-semibold text-textInverse"
                >
                    {loading ? 'Creating…' : 'Create Organization'}
                </button>

                {error && (
                    <p className="mt-4 text-sm text-alert text-center">
                        {error}
                    </p>
                )}
            </form>
        </main>
    );
}
