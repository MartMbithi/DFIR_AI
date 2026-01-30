'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';

type Case = {
    case_id: string;
    case_name: string;
    case_description?: string;
    case_status: string;
    case_created_at: string;
};

const PAGE_SIZE = 8;

export default function CasesPage() {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);

    // table UI
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    // modal state
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Case | null>(null);

    // form
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);

    /* ================= LOAD ================= */

    async function loadCases() {
        setLoading(true);
        const data = await apiFetch('/cases/');
        setCases(data);
        setLoading(false);
    }

    useEffect(() => {
        loadCases();
    }, []);

    /* ================= FILTER + PAGINATION ================= */

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return cases.filter(c =>
            c.case_name.toLowerCase().includes(q) ||
            (c.case_description || '').toLowerCase().includes(q)
        );
    }, [cases, search]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

    const pagedCases = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, page]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    /* ================= CRUD ================= */

    function openCreate() {
        setEditing(null);
        setName('');
        setDescription('');
        setOpen(true);
    }

    function openEdit(c: Case) {
        setEditing(c);
        setName(c.case_name);
        setDescription(c.case_description || '');
        setOpen(true);
    }

    async function saveCase(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        try {
            if (editing) {
                await apiFetch(`/cases/${editing.case_id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        case_name: name,
                        case_description: description
                    })
                });
            } else {
                await apiFetch('/cases/', {
                    method: 'POST',
                    body: JSON.stringify({
                        case_name: name,
                        case_description: description
                    })
                });
            }

            setOpen(false);
            loadCases();
        } finally {
            setSaving(false);
        }
    }

    async function deleteCase(id: string) {
        if (!confirm('Delete this case? This action cannot be undone.')) return;
        await apiFetch(`/cases/${id}`, { method: 'DELETE' });
        loadCases();
    }

    /* ================= UI ================= */

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-8 space-y-6">

                {/* TOP BAR */}
                <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-textPrimary">
                            Cases
                        </h1>
                        <p className="text-xs text-textMuted">
                            {filtered.length} of {cases.length} cases
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            placeholder="Search cases…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="h-9 w-56 border rounded px-3 text-sm bg-background"
                        />
                        <button
                            onClick={openCreate}
                            className="h-9 px-4 bg-primary text-textInverse rounded text-sm font-medium"
                        >
                            + New Case
                        </button>
                    </div>
                </section>

                {/* TABLE */}
                <section className="border rounded-lg bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-background border-b">
                            <tr className="text-left text-textMuted">
                                <th className="px-4 py-3">Case</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center">
                                        Loading…
                                    </td>
                                </tr>
                            )}

                            {!loading && pagedCases.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center">
                                        No cases found.
                                    </td>
                                </tr>
                            )}

                            {pagedCases.map(c => (
                                <tr key={c.case_id} className="border-t hover:bg-background">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{c.case_name}</div>
                                        <div className="text-xs text-textMuted truncate max-w-md">
                                            {c.case_description || '—'}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        <StatusPill status={c.case_status} />
                                    </td>

                                    <td className="px-4 py-3">
                                        {new Date(c.case_created_at).toLocaleString()}
                                    </td>

                                    <td className="px-4 py-3 text-right space-x-3">
                                        <Link
                                            href={`/cases/${c.case_id}`}
                                            className="text-primary hover:underline"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => openEdit(c)}
                                            className="text-textMuted hover:text-textPrimary"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCase(c.case_id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <section className="flex justify-end gap-2 text-sm">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            Prev
                        </button>
                        <span className="text-textMuted">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </section>
                )}
            </main>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-card rounded-lg p-6 w-full max-w-lg">
                        <h2 className="font-semibold mb-4">
                            {editing ? 'Edit Case' : 'Create Case'}
                        </h2>

                        <form onSubmit={saveCase} className="space-y-4">
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                placeholder="Case name"
                                className="w-full border rounded px-3 py-2 bg-background"
                            />

                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Description (optional)"
                                className="w-full border rounded px-3 py-2 bg-background"
                                rows={3}
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={saving}
                                    className="px-4 py-2 bg-primary text-textInverse rounded"
                                >
                                    {saving ? 'Saving…' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthGuard>
    );
}

/* ================= STATUS ================= */

function StatusPill({ status }: { status: string }) {
    const map: Record<string, string> = {
        open: 'bg-blue-100 text-blue-700',
        running: 'bg-amber-100 text-amber-700',
        closed: 'bg-green-100 text-green-700'
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${map[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
}
