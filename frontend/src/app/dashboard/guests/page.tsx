"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Plus, Search, Upload, MoreHorizontal, Check, X } from 'lucide-react';

type Guest = {
  id: number;
  name: string;
  email: string;
  status: string;
  phone: string;
};

export default function GuestListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState<number | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const fetchGuests = async () => {
        setFetchError(null);
        try {
            const res = await fetch('/api/guests');
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Failed to fetch (${res.status})`);
            }
            const data = await res.json();
            setGuests(data);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to fetch guests';
            setFetchError(msg + '. Ensure backend is running (npm run dev:backend) and database is set up.');
            setGuests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    const handleApprove = async (id: number) => {
        setApprovingId(id);
        try {
            const res = await fetch(`/api/guests/${id}/approve`, { method: 'PATCH' });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to approve');
            }
            const updated = await res.json();
            setGuests(prev => prev.map(g => g.id === id ? updated : g));
        } catch (err) {
            console.error(err);
        } finally {
            setApprovingId(null);
        }
    };

    const handleReject = (id: number) => {
        setGuests(prev => prev.map(g => g.id === id ? { ...g, status: 'Declined' } : g));
    };

    const filteredGuests = guests.filter(guest =>
        (filter === 'All' || guest.status === filter) &&
        (guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)]">
            <DashboardSidebar />

            <main className="ml-64 p-8 max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-serif text-[var(--text-olive)]">Guest List</h1>
                        <p className="text-[var(--text-secondary)] mt-1">Manage attendance and approvals</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" /> Import CSV
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Guest
                        </Button>
                    </div>
                </header>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6 gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                            <Input
                                placeholder="Search guests..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            {['All', 'Confirmed', 'Pending Approval', 'Declined'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${filter === status
                                            ? 'bg-[var(--accent-sage)] text-white'
                                            : 'bg-[var(--bg-ivory)] text-[var(--text-secondary)] hover:bg-[var(--bg-beige)]'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-12 text-center text-[var(--text-secondary)]">Loading guests...</div>
                    ) : fetchError ? (
                        <div className="py-12 text-center space-y-4">
                            <p className="text-[var(--status-error)]">{fetchError}</p>
                            <Button variant="outline" onClick={() => { setLoading(true); fetchGuests(); }}>
                                Retry
                            </Button>
                        </div>
                    ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--bg-beige)]">
                                    <th className="text-left py-4 px-4 font-medium text-[var(--text-secondary)]">Name</th>
                                    <th className="text-left py-4 px-4 font-medium text-[var(--text-secondary)]">Contact</th>
                                    <th className="text-left py-4 px-4 font-medium text-[var(--text-secondary)]">Status</th>
                                    <th className="text-right py-4 px-4 font-medium text-[var(--text-secondary)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGuests.map((guest) => (
                                    <tr key={guest.id} className="border-b border-[var(--bg-beige)] last:border-0 hover:bg-[var(--bg-ivory)]/50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-[var(--text-primary)]">{guest.name}</td>
                                        <td className="py-4 px-4 text-[var(--text-secondary)]">
                                            <div className="text-sm">{guest.email}</div>
                                            <div className="text-xs text-[var(--text-secondary)]/70">{guest.phone}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${guest.status === 'Confirmed' ? 'bg-[var(--status-success)]/10 text-[var(--status-success)]' :
                                                    guest.status === 'Pending Approval' ? 'bg-amber-100 text-amber-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {guest.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            {guest.status === 'Pending Approval' ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="ghost" onClick={() => handleApprove(guest.id)} disabled={approvingId === guest.id} isLoading={approvingId === guest.id} className="text-[var(--status-success)] hover:bg-[var(--status-success)]/10">
                                                        <Check size={16} />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" onClick={() => handleReject(guest.id)} className="text-[var(--status-error)] hover:bg-[var(--status-error)]/10">
                                                        <X size={16} />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
