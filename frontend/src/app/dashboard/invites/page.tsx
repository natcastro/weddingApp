"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Mail, Send, CheckCircle, Clock } from 'lucide-react';

export default function InvitationsPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-ivory)]">
            <DashboardSidebar />

            <main className="ml-64 p-8 max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-serif text-[var(--text-olive)]">Invitations</h1>
                        <p className="text-[var(--text-secondary)] mt-1">Track delivery and opens</p>
                    </div>
                    <Button>
                        <Send className="mr-2 h-4 w-4" /> Send New Batch
                    </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[var(--accent-sage)]/10 rounded-full text-[var(--accent-sage-dark)]">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif">150</h3>
                                <p className="text-xs text-[var(--text-secondary)] uppercase">Sent</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif">142</h3>
                                <p className="text-xs text-[var(--text-secondary)] uppercase">Delivered</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif">8</h3>
                                <p className="text-xs text-[var(--text-secondary)] uppercase">Bounced / Pending</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-6">
                    <h3 className="text-lg font-serif mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[var(--bg-ivory)]/50 rounded-[var(--radius-sm)] border border-[var(--bg-beige)]">
                                <div className="flex items-center gap-4">
                                    <Mail size={18} className="text-[var(--text-secondary)]" />
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">Batch #2024-{i}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">Sent to 25 guests</p>
                                    </div>
                                </div>
                                <span className="text-xs text-[var(--text-secondary)]">2 hours ago</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
}
