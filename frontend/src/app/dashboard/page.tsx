"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Users, Mail, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const [daysToGo, setDaysToGo] = useState(0);

    useEffect(() => {
        // Calculate days to a mock date (e.g., 6 months from now)
        // In real app, this would come from the user's wedding date in DB/LocalStorage
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() + 6);
        const diff = targetDate.getTime() - new Date().getTime();
        setDaysToGo(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)]">
            <DashboardSidebar />

            <main className="ml-64 p-8 max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-serif text-[var(--text-olive)]">Dashboard</h1>
                        <p className="text-[var(--text-secondary)] mt-2">Welcome back, Natalie & Partner</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Countdown</div>
                        <div className="text-3xl font-serif text-[var(--accent-sage-dark)]">{daysToGo} Days to Go</div>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon={Users} label="Total Guests" value="142" sublabel="Expected" />
                    <StatCard icon={CheckCircle} label="Confirmed" value="89" sublabel="62% Response" variant="success" />
                    <StatCard icon={Clock} label="Pending" value="45" sublabel="Awaiting Reply" variant="warning" />
                    <StatCard icon={Mail} label="Invites Sent" value="150" sublabel="All Delivered" />
                </div>

                {/* Recent Activity / Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 p-6">
                        <h3 className="text-xl font-serif mb-4">Recent Activity</h3>
                        <ul className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <li key={i} className="flex items-center justify-between p-3 hover:bg-[var(--bg-ivory)] rounded-[var(--radius-sm)] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[var(--accent-sage)]/20 flex items-center justify-center text-[var(--accent-sage-dark)]">
                                            <Users size={14} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-[var(--text-primary)]">Sarah Jenkins confirmed attendance</p>
                                            <p className="text-xs text-[var(--text-secondary)]">2 hours ago</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6 bg-[var(--accent-sage)]/5 border-none">
                        <h3 className="text-xl font-serif mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Button className="w-full justify-start" variant="primary">Send Reminder Email</Button>
                            <Button className="w-full justify-start" variant="secondary">Add New Guest</Button>
                            <Button className="w-full justify-start" variant="ghost">Edit Wedding Details</Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, sublabel, variant = 'default' }: any) {
    const colors = {
        default: "text-[var(--text-primary)]",
        success: "text-[var(--status-success)]",
        warning: "text-amber-600"
    };

    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
                    <h3 className="text-3xl font-serif mt-2 mb-1">{value}</h3>
                    <p className={`text-xs ${(colors as any)[variant] || colors.default}`}>{sublabel}</p>
                </div>
                <div className={`p-2 rounded-full ${variant === 'success' ? 'bg-[var(--status-success)]/10 text-[var(--status-success)]' : 'bg-[var(--bg-beige)] text-[var(--text-secondary)]'}`}>
                    <Icon size={20} />
                </div>
            </div>
        </Card>
    )
}
