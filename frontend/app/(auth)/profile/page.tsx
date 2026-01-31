'use client';

import { useEffect, useState } from 'react';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';

/* ================= TYPES ================= */

type User = {
    user_id: string;
    email: string;
};

/* ================= PAGE ================= */

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);

    /* Email */
    const [email, setEmail] = useState('');
    const [emailSaving, setEmailSaving] = useState(false);

    /* Password */
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSaving, setPasswordSaving] = useState(false);

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    /* ================= LOAD USER ================= */

    useEffect(() => {
        async function load() {
            const me = await apiFetch('/users/me');
            setUser(me);
            setEmail(me.email);
        }

        load();
    }, []);

    /* ================= UPDATE EMAIL ================= */

    async function updateEmail(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setEmailSaving(true);

        try {
            await apiFetch('/users/me/email', {
                method: 'PUT',
                body: JSON.stringify({ email })
            });

            setMessage('Email updated successfully.');
        } catch {
            setError('Failed to update email.');
        } finally {
            setEmailSaving(false);
        }
    }

    /* ================= UPDATE PASSWORD ================= */

    async function updatePassword(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        setPasswordSaving(true);

        try {
            await apiFetch('/users/me/password', {
                method: 'PUT',
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword
                })
            });

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Password updated successfully.');
        } catch {
            setError('Failed to update password.');
        } finally {
            setPasswordSaving(false);
        }
    }

    if (!user) return <div className="p-8">Loading…</div>;

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-10 space-y-10 max-w-3xl">

                {/* HEADER */}
                <section>
                    <h1 className="text-2xl font-extrabold">Profile</h1>
                    <p className="text-sm text-textMuted">
                        Manage your account credentials
                    </p>
                </section>

                {/* EMAIL */}
                <section className="border rounded-lg bg-card p-6 space-y-4">
                    <h2 className="font-semibold">Email Address</h2>

                    <form onSubmit={updateEmail} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 bg-background"
                            />
                        </div>

                        <button
                            disabled={emailSaving}
                            className="px-4 py-2 bg-primary text-textInverse rounded disabled:opacity-50"
                        >
                            {emailSaving ? 'Saving…' : 'Update Email'}
                        </button>
                    </form>
                </section>

                {/* PASSWORD */}
                <section className="border rounded-lg bg-card p-6 space-y-4">
                    <h2 className="font-semibold">Change Password</h2>

                    <form onSubmit={updatePassword} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 bg-background"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 bg-background"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 bg-background"
                            />
                        </div>

                        <button
                            disabled={passwordSaving}
                            className="px-4 py-2 bg-primary text-textInverse rounded disabled:opacity-50"
                        >
                            {passwordSaving ? 'Saving…' : 'Update Password'}
                        </button>
                    </form>
                </section>

                {/* FEEDBACK */}
                {(message || error) && (
                    <section>
                        {message && (
                            <p className="text-sm text-green-600">{message}</p>
                        )}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}
                    </section>
                )}

            </main>
        </AuthGuard>
    );
}
