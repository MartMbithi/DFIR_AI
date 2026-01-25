'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
        const active = stored ?? 'dark';
        setTheme(active);
        document.documentElement.setAttribute('data-theme', active);
    }, []);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-card border border-black/10
        flex items-center justify-center
        text-xl
        shadow-lg
        hover:scale-105 transition
      "
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    );
}
