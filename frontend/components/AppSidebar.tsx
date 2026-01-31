'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/lib/useLogout';

const items = [
    { href: '/dashboard', icon: 'bi-speedometer2', label: 'Overview' },
    { href: '/cases', icon: 'bi-folder2-open', label: 'Cases' },
    { href: '/jobs', icon: 'bi-cpu', label: 'Analysis Jobs' },
    { href: '/reports', icon: 'bi-file-earmark-text', label: 'Reports' },
    { href: '/organization', icon: 'bi-buildings', label: 'Organization' },
    { href: '/profile', icon: 'bi-person-circle', label: 'Profile' }
];

export default function AppSidebar() {
    const pathname = usePathname();
    const logout = useLogout();

    return (
        <div id="sidebar" className="app-sidebar">
            <div className="app-sidebar-content" data-scrollbar="true">

                {/* BRAND */}
                <div className="menu px-3 py-3">
                    <div className="fw-bold text-theme fs-5">
                        DFIR-AI
                    </div>
                    <div className="small text-body text-opacity-50">
                        Digital Forensics Platform
                    </div>
                </div>

                {/* NAV */}
                <div className="menu">
                    <div className="menu-header">Operations</div>

                    {items.map(item => (
                        <div
                            key={item.href}
                            className={`menu-item ${pathname.startsWith(item.href) ? 'active' : ''}`}
                        >
                            <Link href={item.href} className="menu-link">
                                <span className="menu-icon">
                                    <i className={`bi ${item.icon}`}></i>
                                </span>
                                <span className="menu-text">{item.label}</span>
                            </Link>
                        </div>
                    ))}

                    <div className="menu-divider"></div>

                    <div className="menu-header">Session</div>

                    <div className="menu-item">
                        <button onClick={logout} className="menu-link w-100 text-start">
                            <span className="menu-icon">
                                <i className="bi bi-box-arrow-right"></i>
                            </span>
                            <span className="menu-text text-danger">Logout</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
