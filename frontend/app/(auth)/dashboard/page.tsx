/*
 *   Crafted On Fri Jan 30 2026
 *   From his finger tips, through his IDE to your deployment environment at full throttle with no bugs, loss of data,
 *   fluctuations, signal interference, or doubt—it can only be
 *   the legendary coding wizard, Martin Mbithi (martin@devlan.co.ke, www.martmbithi.github.io)
 *   
 *   www.devlan.co.ke
 *   hello@devlan.co.ke
 *
 *
 *   The Devlan Solutions LTD Super Duper User License Agreement
 *   Copyright (c) 2022 Devlan Solutions LTD
 *
 *
 *   1. LICENSE TO BE AWESOME
 *   Congrats, you lucky human! Devlan Solutions LTD hereby bestows upon you the magical,
 *   revocable, personal, non-exclusive, and totally non-transferable right to install this epic system
 *   on not one, but TWO separate computers for your personal, non-commercial shenanigans.
 *   Unless, of course, you've leveled up with a commercial license from Devlan Solutions LTD.
 *   Sharing this software with others or letting them even peek at it? Nope, that's a big no-no.
 *   And don't even think about putting this on a network or letting a crowd join the fun unless you
 *   first scored a multi-user license from us. Sharing is caring, but rules are rules!
 *
 *   2. COPYRIGHT POWER-UP
 *   This Software is the prized possession of Devlan Solutions LTD and is shielded by copyright law
 *   and the forces of international copyright treaties. You better not try to hide or mess with
 *   any of our awesome proprietary notices, labels, or marks. Respect the swag!
 *
 *
 *   3. RESTRICTIONS, NO CHEAT CODES ALLOWED
 *   You may not, and you shall not let anyone else:
 *   (a) reverse engineer, decompile, decode, decrypt, disassemble, or do any sneaky stuff to
 *   figure out the source code of this software;
 *   (b) modify, remix, distribute, or create your own funky version of this masterpiece;
 *   (c) copy (except for that one precious backup), distribute, show off in public, transmit, sell, rent,
 *   lease, or otherwise exploit the Software like it's your own.
 *
 *
 *   4. THE ENDGAME
 *   This License lasts until one of us says 'Game Over'. You can call it quits anytime by
 *   destroying the Software and all the copies you made (no hiding them under your bed).
 *   If you break any of these sacred rules, this License self-destructs, and you must obliterate
 *   every copy of the Software, no questions asked.
 *
 *
 *   5. NO GUARANTEES, JUST PIXELS
 *   DEVLAN SOLUTIONS LTD doesn’t guarantee this Software is flawless—it might have a few
 *   quirks, but who doesn’t? DEVLAN SOLUTIONS LTD washes its hands of any other warranties,
 *   implied or otherwise. That means no promises of perfect performance, marketability, or
 *   non-infringement. Some places have different rules, so you might have extra rights, but don’t
 *   count on us for backup if things go sideways. Use at your own risk, brave adventurer!
 *
 *
 *   6. SEVERABILITY—KEEP THE GOOD STUFF
 *   If any part of this License gets tossed out by a judge, don’t worry—the rest of the agreement
 *   still stands like a boss. Just because one piece fails doesn’t mean the whole thing crumbles.
 *
 *
 *   7. NO DAMAGE, NO DRAMA
 *   Under no circumstances will Devlan Solutions LTD or its squad be held responsible for any wild,
 *   indirect, or accidental chaos that might come from using this software—even if we warned you!
 *   And if you ever think you’ve got a claim, the most you’re getting out of us is the license fee you
 *   paid—if any. No drama, no big payouts, just pixels and code.
 *
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthNav from '@/components/AuthNav';
import AuthGuard from '@/components/AuthGuard';
import { apiFetch } from '@/lib/api';

type Case = {
    case_id: string;
    case_name: string;
};

type Job = {
    job_id: string;
    job_status: string;
};

export default function Dashboard() {
    const router = useRouter();

    const [orgName, setOrgName] = useState('');
    const [cases, setCases] = useState<Case[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const org = await apiFetch('/organizations/me');
                setOrgName(org.organization_name);

                const casesData = await apiFetch('/cases/');
                setCases(casesData);

                const jobsData = await apiFetch('/jobs/');
                setJobs(jobsData);
            } catch {
                router.replace('/onboarding/organization');
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return <div className="p-8">Loading dashboard…</div>;
    }

    const activeJobs = jobs.filter(j => j.job_status === 'running').length;
    const completedJobs = jobs.filter(j => j.job_status === 'completed').length;

    return (
        <AuthGuard>
            <AuthNav />

            <main className="container py-1 space-y-1">

                {/* ===== ORG HEADER ===== */}
                <section className="space-y-2">
                    <h1 className="text-2xl font-extrabold">
                        {orgName}
                    </h1>
                    <p className="text-sm text-textMuted">
                        Organization-level DFIR operational overview
                    </p>
                </section>

                {/* ===== STAT GRID ===== */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                        title="Cases"
                        value={cases.length}
                        hint="Investigations under management"
                        accent="border-l-blue-500"
                    />
                    <StatCard
                        title="Active Jobs"
                        value={activeJobs}
                        hint="Currently processing evidence"
                        accent="border-l-amber-500"
                    />
                    <StatCard
                        title="Completed Jobs"
                        value={completedJobs}
                        hint="Analysis runs completed"
                        accent="border-l-green-500"
                    />
                    <StatCard
                        title="Artifacts"
                        value="—"
                        hint="Evidence ingested (coming soon)"
                        accent="border-l-gray-400"
                    />
                </section>

                {/* ===== ACTIVITY STRIP ===== */}
                <section className="rounded-lg border bg-card p-6 space-y-2">
                    <h2 className="font-semibold">System Activity</h2>

                    {activeJobs > 0 ? (
                        <p className="text-sm text-amber-600">
                            ⚙️ {activeJobs} job{activeJobs > 1 && 's'} currently running across cases
                        </p>
                    ) : (
                        <p className="text-sm text-textMuted">
                            No active background processing at the moment
                        </p>
                    )}
                </section>

                {/* ===== QUICK ACTIONS ===== */}
                <section className="space-y-4">
                    <h2 className="font-semibold">Quick Actions</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ActionCard
                            title="Create Case"
                            description="Start a new forensic investigation"
                            onClick={() => router.push('/cases')}
                        />
                        <ActionCard
                            title="Upload Evidence"
                            description="Attach artifacts to an existing case"
                            onClick={() => router.push('/cases')}
                        />
                        <ActionCard
                            title="View Reports"
                            description="Access generated forensic reports"
                            onClick={() => router.push('/reports')}
                        />
                    </div>
                </section>

            </main>
        </AuthGuard>
    );
}

/* ---------- Components ---------- */

function StatCard({
    title,
    value,
    hint,
    accent
}: {
    title: string;
    value: number | string;
    hint: string;
    accent: string;
}) {
    return (
        <div className={`border rounded p-6 border-l-4 ${accent}`}>
            <p className="text-sm text-textMuted">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-textMuted mt-1">{hint}</p>
        </div>
    );
}

function ActionCard({
    title,
    description,
    onClick
}: {
    title: string;
    description: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="
        border rounded-lg p-6 text-left
        hover:border-primary
        hover:bg-card
        transition
      "
        >
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-textMuted mt-1">{description}</p>
        </button>
    );
}


