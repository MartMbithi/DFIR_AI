'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        async function check() {
            try {
                await apiFetch('/organizations/me');
            } catch {
                router.replace('/onboarding/organization');
            }
        }
        check();
    }, []);

    return <div>Dashboard loading…</div>;
}
