'use client';

import AuthGuard from '@/components/AuthGuard';
import AppSidebar from '@/components/AppSidebar';
import AppTopBar from '@/components/AppTopBar';
import Script from 'next/script';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <>
                {/* ================= THEME CSS ================= */}
                <link
                    rel="stylesheet"
                    href="/assets/css/vendor.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/app.min.css"
                />

                {/* ================= APP SHELL ================= */}
                <div
                    id="app"
                    className="app app-header-fixed app-sidebar-fixed"
                    data-bs-theme="dark"
                >
                    {/* TOP BAR */}
                    <AppTopBar />

                    {/* SIDEBAR */}
                    <AppSidebar />

                    {/* CONTENT */}
                    <div id="content" className="app-content">
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>
                </div>

                {/* ================= THEME JS ================= */}
                <Script
                    src="/assets/js/vendor.min.js"
                    strategy="afterInteractive"
                />
                <Script
                    src="/assets/js/app.min.js"
                    strategy="afterInteractive"
                />
            </>
        </AuthGuard>
    );
}
