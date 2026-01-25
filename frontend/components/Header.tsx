export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-navy/80 backdrop-blur border-b border-white/10">
            <div className="container h-16 flex items-center justify-between">
                <span className="font-extrabold tracking-wide">DFIR-AI</span>

                <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/dashboard/cases">Cases</a>
                    <a href="/docs">Docs</a>
                </nav>

                <a
                    href="/dashboard"
                    className="px-5 py-2 bg-electric rounded font-extrabold text-sm uppercase"
                >
                    Enter Platform
                </a>
            </div>
        </header>
    );
}
