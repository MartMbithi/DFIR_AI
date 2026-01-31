'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';
import { checkPassword, passwordStrength } from '@/lib/passwordPolicy';
import { logout } from '@/lib/auth';

/* ================= TYPES ================= */

type User = {
    user_id: string;
    email: string;
};

/* ================= PAGE ================= */

export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    /* ---------------- EMAIL ---------------- */
    const [email, setEmail] = useState('');
    const [emailSaving, setEmailSaving] = useState(false);
    const [emailMessage, setEmailMessage] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    /* ---------------- PASSWORD ---------------- */
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

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
        setEmailMessage(null);
        setEmailError(null);
        setEmailSaving(true);

        try {
            await apiFetch('/users/me/email', {
                method: 'PUT',
                body: JSON.stringify({ email })
            });

            setEmailMessage('Email updated successfully.');
        } catch {
            setEmailError('Failed to update email.');
        } finally {
            setEmailSaving(false);
        }
    }

    /* ================= UPDATE PASSWORD ================= */

    const policy = checkPassword(newPassword);
    const strength = passwordStrength(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    async function updatePassword(e: React.FormEvent) {
        e.preventDefault();
        setPasswordError(null);

        if (!currentPassword) {
            setPasswordError('Current password is required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        if (!policy.valid) {
            setPasswordError('Password does not meet security requirements.');
            return;
        }

        setPasswordSaving(true);

        try {
            const res = await apiFetch('/users/me/password', {
                method: 'PUT',
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword
                })
            });

            // ✅ ONLY logout if backend confirms success
            if (res?.detail === 'Password updated successfully') {
                logout();
                router.replace('/login');
            } else {
                setPasswordError('Unexpected response from server.');
            }

        } catch (err: any) {
            // ❌ NO LOGOUT HERE
            setPasswordError('Current password is incorrect.');
        } finally {
            setPasswordSaving(false);
        }
    }


    if (!user) return <div className="p-8">Loading…</div>;

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-10 max-w-5xl space-y-10">

                {/* HEADER */}
                <section>
                    <h1 className="text-2xl font-extrabold">Profile</h1>
                    <p className="text-sm text-textMuted">
                        Manage your account credentials
                    </p>
                </section>

                {/* INLINE FORMS */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* EMAIL */}
                    <div className="border rounded-lg bg-card p-6 space-y-4">
                        <h2 className="font-semibold">Email Address</h2>

                        <form onSubmit={updateEmail} className="space-y-4">
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

                            {emailMessage && (
                                <div className="rounded bg-green-50 text-green-700 px-3 py-2 text-sm">
                                    {emailMessage}
                                </div>
                            )}

                            {emailError && (
                                <div className="rounded bg-red-50 text-red-700 px-3 py-2 text-sm">
                                    {emailError}
                                </div>
                            )}

                            <button
                                disabled={emailSaving}
                                className="px-4 py-2 bg-primary text-textInverse rounded disabled:opacity-50"
                            >
                                {emailSaving ? 'Saving…' : 'Update Email'}
                            </button>
                        </form>
                    </div>

                    {/* PASSWORD */}
                    <div className="border rounded-lg bg-card p-6 space-y-4">
                        <h2 className="font-semibold">Change Password</h2>

                        <form onSubmit={updatePassword} className="space-y-4">

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

                            {/* STRENGTH */}
                            <div className="space-y-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded ${strength >= i
                                                ? strength <= 2
                                                    ? 'bg-red-500'
                                                    : strength <= 4
                                                        ? 'bg-yellow-500'
                                                        : 'bg-green-600'
                                                : 'bg-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <ul className="text-xs space-y-1">
                                    <Rule ok={policy.checks.length} text="Minimum length" />
                                    <Rule ok={policy.checks.upper} text="Uppercase letter" />
                                    <Rule ok={policy.checks.lower} text="Lowercase letter" />
                                    <Rule ok={policy.checks.number} text="Number" />
                                    <Rule ok={policy.checks.symbol} text="Symbol" />
                                </ul>
                            </div>

                            {passwordError && (
                                <div className="rounded bg-red-50 text-red-700 px-3 py-2 text-sm">
                                    {passwordError}
                                </div>
                            )}

                            <button
                                disabled={!policy.valid || !passwordsMatch || passwordSaving}
                                className="px-4 py-2 bg-primary text-textInverse rounded disabled:opacity-50"
                            >
                                {passwordSaving ? 'Saving…' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </AuthGuard>
    );
}

/* ================= HELPERS ================= */

function Rule({ ok, text }: { ok: boolean; text: string }) {
    return (
        <li className={ok ? 'text-green-600' : 'text-textMuted'}>
            {ok ? '✓' : '•'} {text}
        </li>
    );
}
