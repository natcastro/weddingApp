"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Mail, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import clsx from 'clsx';

const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/guests', label: 'Guest List', icon: Users },
    { href: '/dashboard/invites', label: 'Invitations', icon: Mail },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export const DashboardSidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-[var(--bg-white)] border-r border-[var(--bg-beige)] h-screen fixed left-0 top-0 flex flex-col pt-8 pb-6 px-4">
            <div className="px-4 mb-10">
                <Link href="/dashboard" className="text-2xl font-bold tracking-tight font-serif text-[var(--text-olive)]">
                    Sigil.
                </Link>
            </div>

            <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-sm font-medium transition-colors cursor-pointer",
                                    isActive
                                        ? "bg-[var(--accent-sage)]/10 text-[var(--accent-sage-dark)]"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-ivory)] hover:text-[var(--text-primary)]"
                                )}
                            >
                                <Icon size={18} />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-[var(--bg-beige)]">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-sm font-medium text-[var(--status-error)] hover:bg-[var(--status-error)]/5 transition-colors"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};
