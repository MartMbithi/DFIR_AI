'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function hasToken(): boolean {
    return typeof window !== 'undefined'
        && !!localStorage.getItem('token');
}

export default function AuthGuard({
    children
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        if (!hasToken()) {
            router.replace('/login');
        }
    }, []);

    return <>{children}</>;
}
