'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';

export default function OrganizationPage() {
    const router = useRouter();

    const [orgId, setOrgId] = useState('');
    const [orgName, setOrgName] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const org = await apiFetch('/organizations/me');
                setOrgId(org.organization_id);
                setOrgName(org.organization_name);
                setCreatedAt(org.organization_created_at);
            } catch {
                router.replace('/onboarding/organization');
            }
        }

        load();
    }, []);

    async function save(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await apiFetch('/organizations/me', {
                method: 'PUT',
                body: JSON.stringify({
                    organization_name: orgName
                })
            });

            setMessage('Organization updated successfully.');
        } catch {
            setMessage('Failed to update organization.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-12 space-y-12">

                {/* ================= HEADER ================= */}
                <section className="space-y-1">
                    <h1 className="text-2xl font-extrabold text-textPrimary">
                        Organization
                    </h1>
                    <p className="text-sm text-textMuted">
                        Manage organization-level settings and operational context
                    </p>
                </section>

                {/* ================= OVERVIEW ================= */}
                <section className="border rounded-lg p-6 bg-card space-y-4">
                    <h2 className="font-semibold text-textPrimary">
                        Overview
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <p className="text-textMuted">Organization ID</p>
                            <p className="font-mono break-all text-textPrimary">
                                {orgId}
                            </p>
                        </div>

                        <div>
                            <p className="text-textMuted">Created</p>
                            <p className="text-textPrimary">
                                {new Date(createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================= SETTINGS ================= */}
                <section className="border rounded-lg p-8 bg-card space-y-6">
                    <h2 className="font-semibold text-textPrimary">
                        Settings
                    </h2>

                    {/* INLINE FORM */}
                    <form
                        onSubmit={save}
                        className="
              flex flex-col
              md:flex-row
              md:items-end
              gap-4
              max-w-4xl
            "
                    >
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 text-textPrimary">
                                Organization Name
                            </label>
                            <input
                                value={orgName}
                                onChange={e => setOrgName(e.target.value)}
                                required
                                className="
                  w-full
                  border
                  rounded
                  px-3 py-2
                  bg-background
                  text-textPrimary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/40
                "
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                px-6 py-2
                rounded
                bg-primary
                text-textInverse
                font-medium
                disabled:opacity-60
                transition
              "
                        >
                            {saving ? 'Saving…' : 'Save'}
                        </button>
                    </form>

                    {message && (
                        <p className="text-sm text-textMuted">
                            {message}
                        </p>
                    )}
                </section>

                {/* ================= OPERATIONAL CONTEXT ================= */}
                <section className="border rounded-lg p-6 bg-card space-y-3">
                    <h2 className="font-semibold text-textPrimary">
                        Operational Context
                    </h2>

                    <p className="text-sm text-textMuted">
                        This organization owns all cases, artifacts, jobs, and reports
                        created within this environment. Access controls and data
                        isolation are enforced at the organization boundary.
                    </p>

                    <p className="text-sm text-textMuted">
                        Changes to organization settings affect all users operating
                        under this organization.
                    </p>
                </section>

            </main>
        </AuthGuard>
    );
}
