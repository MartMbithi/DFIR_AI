'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/dashboard-layout';
import { apiFetch } from '@/lib/api';

/* ================= TYPES ================= */

type Job = {
    job_id: string;
    job_status: 'pending' | 'running' | 'completed' | 'failed';
    case_id: string;
};

type Case = {
    case_id: string;
    case_name: string;
};

type Activity = {
    id: string;
    timestamp: string;
    message: string;
};

type Storage = {
    used_gb: number;
    total_gb: number;
};

/* ================= DASHBOARD PAGE ================= */

export default function DashboardPage() {
    const router = useRouter();

    const [orgName, setOrgName] = useState('');
    const [cases, setCases] = useState<Case[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [activity, setActivity] = useState<Activity[]>([]);
    const [storage, setStorage] = useState<Storage | null>(null);
    const [loading, setLoading] = useState(true);

    /* ---------- INITIAL LOAD ---------- */
    useEffect(() => {
        async function load() {
            try {
                const org = await apiFetch('/organizations/me');
                setOrgName(org.organization_name);

                setCases(await apiFetch('/cases/'));
                setJobs(await apiFetch('/jobs/'));

                // Enable when endpoints are live
                // setActivity(await apiFetch('/activity/stream'));
                // setStorage(await apiFetch('/metrics/storage'));
            } catch {
                router.replace('/onboarding/organization');
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    /* ---------- REAL-TIME JOB POLLING ---------- */
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                setJobs(await apiFetch('/jobs/'));
            } catch {
                /* silent fail */
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    function BootLine({
        ts,
        msg,
    }: {
        ts: string;
        msg: string;
    }) {
        return (
            <div className="d-flex align-items-start mb-1">
                <span className="me-3 text-body text-opacity-50">
                    [{ts}]
                </span>
                <span>{msg}</span>
            </div>
        );
    }

    if (loading) {
        return (
            <div
                className="d-flex align-items-center justify-content-center bg-body"
                style={{ minHeight: '100vh' }}
            >
                <div className="card w-700px">

                    <div className="card-body py-5">

                        {/* ================= HEADER ================= */}
                        <div className="text-center mb-4">
                            <div
                                className="d-inline-flex align-items-center justify-content-center rounded-circle border border-theme border-opacity-50 mb-3"
                                style={{ width: 96, height: 96 }}
                            >
                                <i className="bi bi-shield-lock fs-1 text-theme"></i>
                            </div>

                            <h5 className="fw-semibold mb-1">
                                DFIR-AI Forensic Engine
                            </h5>

                            <div className="small text-body text-opacity-50">
                                Secure initialization sequence
                            </div>
                        </div>

                        {/* ================= CONSOLE ================= */}
                        <div
                            className="bg-black bg-opacity-75 rounded p-4 small font-monospace text-theme"
                            style={{ maxHeight: 260, overflow: 'hidden' }}
                        >
                            <BootLine ts="00:00:01" msg="Boot sequence initiated" />
                            <BootLine ts="00:00:02" msg="Validating analyst session" />
                            <BootLine ts="00:00:03" msg="Loading organization context" />
                            <BootLine ts="00:00:04" msg="Mounting evidence vault (read-only)" />
                            <BootLine ts="00:00:05" msg="Indexing forensic artifacts" />
                            <BootLine ts="00:00:06" msg="Restoring case timelines" />
                            <BootLine ts="00:00:07" msg="Synchronizing analysis jobs" />
                            <BootLine ts="00:00:08" msg="Verifying chain-of-custody integrity" />
                            <BootLine ts="00:00:09" msg="Initializing AI correlation engine" />
                            <BootLine ts="00:00:10" msg="Finalizing workspace state" />
                        </div>

                        {/* ================= STATUS ================= */}
                        <div className="mt-4">
                            <div className="d-flex justify-content-between small mb-1">
                                <span className="text-body text-opacity-50">
                                    System state
                                </span>
                                <span className="text-theme">
                                    OPERATIONAL
                                </span>
                            </div>

                            <div className="progress h-5px">
                                <div
                                    className="progress-bar bg-theme progress-bar-striped progress-bar-animated"
                                    style={{ width: '100%' }}
                                ></div>
                            </div>
                        </div>

                    </div>

                    {/* ================= HUD ARROWS ================= */}
                    <div className="card-arrow">
                        <div className="card-arrow-top-left"></div>
                        <div className="card-arrow-top-right"></div>
                        <div className="card-arrow-bottom-left"></div>
                        <div className="card-arrow-bottom-right"></div>
                    </div>
                </div>
            </div>
        );
    }

    const runningJobs = jobs.filter(j => j.job_status === 'running').length;
    const completedJobs = jobs.filter(j => j.job_status === 'completed').length;

    const storagePct =
        storage ? Math.round((storage.used_gb / storage.total_gb) * 100) : 0;

    return (
        <DashboardLayout>

            {/* ================= HEADER ================= */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="mb-1">{orgName}</h1>
                    <p className="text-body text-opacity-75">
                        Forensic operations & analytical state overview
                    </p>
                </div>
            </div>

            {/* ================= METRICS ================= */}
            <div className="row g-3 mb-4">
                <Metric title="Cases" value={cases.length} icon="bi-folder2-open" />
                <Metric title="Active Jobs" value={runningJobs} icon="bi-cpu" />
                <Metric title="Completed Jobs" value={completedJobs} icon="bi-check2-circle" />
                <Metric
                    title="Storage Used"
                    value={`${storage?.used_gb ?? 0} GB`}
                    icon="bi-database"
                />
            </div>

            {/* ================= TIMELINE + STORAGE ================= */}
            <div className="row g-3 mb-4">

                {/* TIMELINE HEATMAP */}
                <div className="col-lg-8">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5>Investigation Timeline Activity</h5>
                            <p className="small text-body text-opacity-75">
                                Event density across cases (ingest, analysis, reporting)
                            </p>

                            <div className="mt-3">
                                <div
                                    id="timeline-heatmap"
                                    className="ratio ratio-21x9 bg-body bg-opacity-25 rounded"
                                ></div>
                            </div>
                        </div>
                        <HudArrows />
                    </div>
                </div>

                {/* STORAGE */}
                <div className="col-lg-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5>Evidence Storage</h5>

                            <div className="mb-2">
                                <strong>{storage?.used_gb ?? 0} GB</strong> of{' '}
                                {storage?.total_gb ?? 0} GB used
                            </div>

                            <div className="progress h-5px">
                                <div
                                    className="progress-bar bg-theme"
                                    style={{ width: `${storagePct}%` }}
                                ></div>
                            </div>

                            <p className="small mt-2 text-body text-opacity-75">
                                Disk images, memory captures, logs, extracted artifacts
                            </p>
                        </div>
                        <HudArrows />
                    </div>
                </div>

            </div>

            {/* ================= ACTIVITY STREAM ================= */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5>Case & System Activity</h5>

                            <ul className="list-unstyled mt-3 mb-0">
                                {activity.length === 0 && (
                                    <li className="text-body text-opacity-50 small">
                                        No recent activity
                                    </li>
                                )}

                                {activity.slice(0, 10).map(a => (
                                    <li key={a.id} className="mb-2 small">
                                        <i className="bi bi-circle-fill text-theme fs-6px me-2"></i>
                                        {a.message}
                                        <div className="text-body text-opacity-50">
                                            {new Date(a.timestamp).toLocaleString()}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <HudArrows />
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
}

/* ================= COMPONENTS ================= */

function Metric({
    title,
    value,
    icon,
}: {
    title: string;
    value: number | string;
    icon: string;
}) {
    return (
        <div className="col-lg-3 col-md-6">
            <div className="card">
                <div className="card-body d-flex align-items-center">
                    <i className={`bi ${icon} fs-2 me-3 text-theme`}></i>
                    <div>
                        <div className="small text-body text-opacity-50">{title}</div>
                        <div className="fs-4 fw-bold">{value}</div>
                    </div>
                </div>
                <HudArrows />
            </div>
        </div>
    );
}

function HudArrows() {
    return (
        <div className="card-arrow">
            <div className="card-arrow-top-left"></div>
            <div className="card-arrow-top-right"></div>
            <div className="card-arrow-bottom-left"></div>
            <div className="card-arrow-bottom-right"></div>
        </div>
    );
}
