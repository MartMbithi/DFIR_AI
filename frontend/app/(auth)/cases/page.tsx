'use client';

import { useEffect, useState } from 'react';
import AuthNav from '@/components/AuthNav';
import { apiFetch } from '@/lib/api';

export default function CasesPage() {
    const [cases, setCases] = useState<any[]>([]);
    const [name, setName] = useState('');

    async function loadCases() {
        const data = await apiFetch('/cases/');
        setCases(data);
    }

    async function createCase(e: React.FormEvent) {
        e.preventDefault();

        await apiFetch('/cases/', {
            method: 'POST',
            body: JSON.stringify({
                case_name: name
            })
        });

        setName('');
        loadCases();
    }

    useEffect(() => {
        loadCases();
    }, []);

    return (
        <>
            <AuthNav />

            <main className="container py-10 space-y-8">
                <h1 className="text-xl font-bold">Cases</h1>

                <form onSubmit={createCase} className="flex gap-4">
                    <input
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="New case name"
                        className="border px-3 py-2 rounded w-64"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded">
                        Create
                    </button>
                </form>

                <ul className="space-y-2">
                    {cases.map(c => (
                        <li
                            key={c.case_id}
                            className="border p-3 rounded"
                        >
                            <strong>{c.case_name}</strong>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}
