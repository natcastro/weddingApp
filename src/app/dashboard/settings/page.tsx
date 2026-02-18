"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Download, CreditCard, DollarSign, User as UserIcon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-ivory)]">
            <DashboardSidebar />

            <main className="ml-64 p-8 max-w-4xl space-y-8">
                <header>
                    <h1 className="text-4xl font-serif text-[var(--text-olive)]">Settings</h1>
                    <p className="text-[var(--text-secondary)] mt-1">Manage your account and billing</p>
                </header>

                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <UserIcon className="text-[var(--accent-sage-dark)]" size={20} />
                        <h2 className="text-xl font-medium text-[var(--text-primary)]">Profile Settings</h2>
                    </div>

                    <Card className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First Name" defaultValue="Natalie" />
                            <Input label="Last Name" defaultValue="Castro" />
                        </div>
                        <Input label="Email Address" defaultValue="natalie@example.com" />
                        <Button>Save Changes</Button>
                    </Card>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="text-[var(--accent-sage-dark)]" size={20} />
                        <h2 className="text-xl font-medium text-[var(--text-primary)]">Billing & Payments</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">Money on Hold</h3>
                            <p className="text-3xl font-serif mt-2 mb-1 text-[var(--text-primary)]">$450.00</p>
                            <p className="text-xs text-[var(--text-secondary)]">Released upon event completion</p>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">Next Payment</h3>
                            <p className="text-3xl font-serif mt-2 mb-1 text-[var(--text-primary)]">$150.00</p>
                            <p className="text-xs text-[var(--text-secondary)]">Due in 30 days</p>
                        </Card>
                    </div>

                    <Card className="p-6">
                        <h3 className="font-medium mb-4">Payment History</h3>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--bg-beige)] last:border-0">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={16} className="text-[var(--text-secondary)]" />
                                        <span className="text-sm">Deposit Payment</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-medium">$200.00</span>
                                        <span className="text-xs text-[var(--text-secondary)]">Jan 12, 2026</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Download className="text-[var(--accent-sage-dark)]" size={20} />
                        <h2 className="text-xl font-medium text-[var(--text-primary)]">Data Export</h2>
                    </div>

                    <Card className="p-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Guest List CSV</h3>
                            <p className="text-sm text-[var(--text-secondary)]">Download all guest details and status.</p>
                        </div>
                        <Button variant="outline">
                            Download CSV
                        </Button>
                    </Card>
                </section>
            </main>
        </div>
    );
}
