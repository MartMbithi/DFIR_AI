'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/lib/useLogout';

const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/organization', label: 'Organization' },
    { href: '/cases', label: 'Cases' },
    { href: '/reports', label: 'Reports' },
    { href: '/profile', label: 'Profile' }
];

export default function AuthNav() {
    const logout = useLogout();
    const pathname = usePathname();

    return (
        <header className="border-b border-black/10 bg-background">
            <div className="container flex items-center justify-between h-14">

                {/* Brand */}
                <Link
                    href="/dashboard"
                    className="font-extrabold text-sm text-textPrimary tracking-wide"
                >
                    DFIR-AI
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6 text-sm">

                    {navItems.map(item => {
                        const active = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  transition
                  ${active
                                        ? 'text-primary font-semibold'
                                        : 'text-textMuted hover:text-textPrimary'}
                `}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <span className="h-4 w-px bg-black/10" />

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="
              text-sm
              text-red-600
              hover:text-red-700
              transition
            "
                    >
                        Logout
                    </button>

                </nav>
            </div>
        </header>
    );
}
