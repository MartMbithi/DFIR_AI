'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';

type Case = {
    case_id: string;
    case_name: string;
    case_description?: string;
    case_status: string;
};

type Artifact = {
    artifact_id: string;
    artifact_type?: string;
    ingested_at: string;
};

type Job = {
    job_id: string;
    job_status: string;
    created_at: string;
};

export default function CaseDetailPage() {
    const { case_id } = useParams();

    const [caseData, setCaseData] = useState<Case | null>(null);
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    async function load() {
        const c = await apiFetch(`/cases/${case_id}`);
        setCaseData(c);

        const a = await apiFetch(`/artifacts/artifacts/${case_id}`);
        setArtifacts(a);

        const j = await apiFetch(`/jobs?case_id=${case_id}`);
        setJobs(j);
    }

    useEffect(() => {
        load();
    }, []);

    async function uploadArtifacts(e: React.FormEvent) {
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
            await load();
        } finally {
            setUploading(false);
        }
    }

    if (!caseData) {
        return <div className="p-8">Loading case…</div>;
    }

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-10 space-y-12">

                {/* ================= CASE HEADER ================= */}
                <section className="space-y-2">
                    <h1 className="text-2xl font-extrabold">
                        {caseData.case_name}
                    </h1>
                    <p className="text-sm text-textMuted">
                        {caseData.case_description || 'No description provided'}
                    </p>
                </section>

                {/* ================= ARTIFACTS ================= */}
                <section className="border rounded-lg p-6 bg-card space-y-6">
                    <h2 className="font-semibold">Artifacts</h2>

                    <form onSubmit={uploadArtifacts} className="space-y-4">
                        <input
                            type="file"
                            multiple
                            onChange={e =>
                                setFiles(Array.from(e.target.files || []))
                            }
                        />

                        <button
                            disabled={uploading}
                            className="px-4 py-2 bg-primary text-textInverse rounded"
                        >
                            {uploading ? 'Uploading…' : 'Upload Artifacts'}
                        </button>
                    </form>

                    <table className="w-full text-sm">
                        <thead className="border-b">
                            <tr className="text-left text-textMuted">
                                <th className="p-2">Artifact ID</th>
                                <th className="p-2">Type</th>
                                <th className="p-2">Ingested</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artifacts.map(a => (
                                <tr key={a.artifact_id} className="border-t">
                                    <td className="p-2 font-mono break-all">
                                        {a.artifact_id}
                                    </td>
                                    <td className="p-2">
                                        {a.artifact_type || '—'}
                                    </td>
                                    <td className="p-2">
                                        {new Date(a.ingested_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* ================= JOBS ================= */}
                <section className="border rounded-lg p-6 bg-card space-y-4">
                    <h2 className="font-semibold">Jobs</h2>

                    <table className="w-full text-sm">
                        <thead className="border-b">
                            <tr className="text-left text-textMuted">
                                <th className="p-2">Job ID</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(j => (
                                <tr key={j.job_id} className="border-t">
                                    <td className="p-2 font-mono break-all">
                                        {j.job_id}
                                    </td>
                                    <td className="p-2">
                                        {j.job_status}
                                    </td>
                                    <td className="p-2">
                                        {new Date(j.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </main>
        </AuthGuard>
    );
}
