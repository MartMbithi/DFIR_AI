'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';

/* ================= TYPES ================= */

type Case = {
    case_id: string;
    case_name: string;
    case_description?: string;
};

type Upload = {
    upload_id: string;
    upload_filename: string;
    upload_mime_type?: string;
    upload_size: number;
    uploaded_at: string;
};

type Job = {
    job_id: string;
    job_status: string;
    created_at: string;
};

const PAGE_SIZE = 6;

/* ================= PAGE ================= */

export default function CaseDetailPage() {
    const { case_id } = useParams<{ case_id: string }>();

    const [caseData, setCaseData] = useState<Case | null>(null);
    const [uploads, setUploads] = useState<Upload[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());

    /* Modal */
    const [uploadOpen, setUploadOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    /* ================= LOAD ================= */

    async function load() {
        const c = await apiFetch(`/cases/${case_id}`);
        setCaseData(c);

        const u = await apiFetch(`/cases/${case_id}/uploads`);
        setUploads(u);

        const j = await apiFetch(`/jobs?case_id=${case_id}`);
        setJobs(j);
    }

    useEffect(() => {
        load();
    }, []);

    /* ================= FILTER + PAGINATION ================= */

    const filteredUploads = useMemo(() => {
        const q = search.toLowerCase();
        return uploads.filter(u =>
            u.upload_filename.toLowerCase().includes(q)
        );
    }, [uploads, search]);

    const totalPages = Math.ceil(filteredUploads.length / PAGE_SIZE);
    const pageUploads = filteredUploads.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    useEffect(() => setPage(1), [search]);

    /* ================= UPLOAD ================= */

    async function uploadFiles(e: React.FormEvent) {
        e.preventDefault();
        if (!files.length) return;

        setUploading(true);

        try {
            for (const file of files) {
                const form = new FormData();
                form.append('file', file);

                await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/cases/${case_id}/artifacts/upload`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: form
                    }
                );
            }

            setFiles([]);
            setUploadOpen(false);
            await load();
        } finally {
            setUploading(false);
        }
    }

    /* ================= JOB QUEUE ================= */

    async function queueJob() {
        if (selected.size === 0) return;

        await apiFetch('/jobs/', {
            method: 'POST',
            body: JSON.stringify({
                case_id,
                upload_ids: Array.from(selected),
                job_type: 'dfir_run'
            })
        });

        setSelected(new Set());
        load();
    }

    /* ================= DELETE UPLOAD ================= */

    async function deleteUpload(id: string) {
        if (!confirm('Delete this upload?')) return;
        await apiFetch(`/cases/uploads/${id}`, { method: 'DELETE' });
        load();
    }

    if (!caseData) return <div className="p-8">Loading…</div>;

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-8 space-y-6">

                {/* HEADER */}
                <section>
                    <h1 className="text-xl font-extrabold">{caseData.case_name}</h1>
                    <p className="text-sm text-textMuted">
                        {caseData.case_description || 'No description'}
                    </p>
                </section>

                {/* GRID */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* UPLOADS */}
                    <div className="lg:col-span-8 space-y-4">

                        {/* TOOLBAR */}
                        <div className="flex items-center justify-between">
                            <input
                                placeholder="Search uploads…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="h-9 w-56 border rounded px-3 text-sm bg-background"
                            />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setUploadOpen(true)}
                                    className="h-9 px-4 border rounded text-sm"
                                >
                                    Upload
                                </button>

                                <button
                                    onClick={queueJob}
                                    disabled={selected.size === 0}
                                    className="h-9 px-4 bg-primary text-textInverse rounded text-sm disabled:opacity-40"
                                >
                                    Queue Job
                                </button>
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="border rounded bg-card overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-background">
                                    <tr className="text-left text-textMuted">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">File</th>
                                        <th className="px-3 py-2">Size</th>
                                        <th className="px-3 py-2">Uploaded</th>
                                        <th className="px-3 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageUploads.map(u => (
                                        <tr key={u.upload_id} className="border-t hover:bg-background">
                                            <td className="px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has(u.upload_id)}
                                                    onChange={() => {
                                                        const s = new Set(selected);
                                                        s.has(u.upload_id)
                                                            ? s.delete(u.upload_id)
                                                            : s.add(u.upload_id);
                                                        setSelected(s);
                                                    }}
                                                />
                                            </td>
                                            <td className="px-3 py-2 font-mono text-xs break-all">
                                                {u.upload_filename}
                                            </td>
                                            <td className="px-3 py-2">
                                                {(u.upload_size / 1024).toFixed(1)} KB
                                            </td>
                                            <td className="px-3 py-2">
                                                {new Date(u.uploaded_at).toLocaleString()}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <button
                                                    onClick={() => deleteUpload(u.upload_id)}
                                                    className="text-red-600 text-xs hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* JOB ACTIVITY */}
                    <div className="lg:col-span-4 border rounded bg-card p-4 space-y-4">
                        <h2 className="font-semibold">Job Activity</h2>

                        {jobs.length === 0 && (
                            <p className="text-sm text-textMuted">
                                No jobs queued yet.
                            </p>
                        )}

                        {jobs.map(j => (
                            <div key={j.job_id} className="border rounded p-3 text-sm">
                                <p className="font-mono text-xs break-all">{j.job_id}</p>
                                <p className="text-xs text-textMuted">Status: {j.job_status}</p>
                                <p className="text-xs text-textMuted">
                                    {new Date(j.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                </section>
            </main>

            {/* UPLOAD MODAL */}
            {uploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-card rounded-lg p-6 w-full max-w-md space-y-4">
                        <h2 className="font-semibold">Upload Files</h2>

                        <form onSubmit={uploadFiles} className="space-y-4">
                            <input
                                type="file"
                                multiple
                                onChange={e => setFiles(Array.from(e.target.files || []))}
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setUploadOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={uploading}
                                    className="px-4 py-2 bg-primary text-textInverse rounded"
                                >
                                    {uploading ? 'Uploading…' : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthGuard>
    );
}
