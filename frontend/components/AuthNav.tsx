'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLogout } from '@/lib/useLogout';

const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/organization', label: 'Organization' },
    { href: '/cases', label: 'Cases' },
    { href: '/profile', label: 'Profile' }
];

export default function AuthNav() {
    const pathname = usePathname();
    const logout = useLogout();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b bg-background">
            <div className="container h-14 flex items-center justify-between">

                <Link
                    href="/dashboard"
                    className="font-extrabold text-sm text-textPrimary"
                >
                    DFIR-AI
                </Link>

                {/* Desktop */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {items.map(i => (
                        <Link
                            key={i.href}
                            href={i.href}
                            className={
                                pathname.startsWith(i.href)
                                    ? 'text-primary font-semibold'
                                    : 'text-textMuted hover:text-textPrimary'
                            }
                        >
                            {i.label}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="text-red-600 hover:underline"
                    >
                        Logout
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-sm text-textPrimary"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t bg-background">
                    <nav className="flex flex-col p-4 gap-4 text-sm">
                        {items.map(i => (
                            <Link
                                key={i.href}
                                href={i.href}
                                onClick={() => setOpen(false)}
                            >
                                {i.label}
                            </Link>
                        ))}
                        <button
                            onClick={logout}
                            className="text-red-600 text-left"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
