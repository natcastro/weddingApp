"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-transparent backdrop-blur-[2px]">
            <Link href="/" className="text-2xl font-bold tracking-tight font-serif text-[var(--text-olive)] drop-shadow-sm">
                Sigil.
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="ghost" className="text-[var(--text-olive)] hover:bg-[var(--accent-sage)]/10">
                        Log In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button variant="primary" className="shadow-lg">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    );
};
