"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/layout/Navbar';
import { CreditCard, Lock } from 'lucide-react';

export default function PaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            router.push('/payment/success');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)]">
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white/80 backdrop-blur-md border-b border-[var(--bg-beige)]">
                <div className="text-2xl font-bold tracking-tight font-serif text-[var(--text-olive)]">
                    Sigil.
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 flex justify-center">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-serif text-[var(--text-olive)]">Complete Your Order</h1>
                        <Card className="p-6 space-y-4">
                            <h2 className="font-medium text-[var(--text-primary)]">Order Summary</h2>

                            <div className="flex justify-between py-2 border-b border-[var(--bg-beige)]">
                                <span className="text-[var(--text-secondary)]">Wedding Invitation Package</span>
                                <span className="font-medium">$450.00</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--bg-beige)]">
                                <span className="text-[var(--text-secondary)]">Platform Fee</span>
                                <span className="font-medium">$15.00</span>
                            </div>

                            <div className="flex justify-between py-2 text-lg font-bold text-[var(--text-olive)]">
                                <span>Total Due</span>
                                <span>$465.00</span>
                            </div>

                            <div className="bg-[var(--accent-sage)]/10 p-4 rounded-[var(--radius-sm)] text-sm text-[var(--accent-sage-dark)]">
                                <p><strong>Note:</strong> Your payment will be held in escrow ("Money on Hold") until your event date passes.</p>
                            </div>
                        </Card>
                    </div>

                    {/* Payment Form */}
                    <Card className="p-8 h-fit">
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Lock size={16} className="text-[var(--text-secondary)]" />
                                <h2 className="text-lg font-medium">Secure Payment</h2>
                            </div>

                            <Input label="Cardholder Name" placeholder="Jane Doe" required />
                            <Input label="Card Number" placeholder="0000 0000 0000 0000" required />

                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Expiry Date" placeholder="MM/YY" required />
                                <Input label="CVC" placeholder="123" required />
                            </div>

                            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                                Pay $465.00
                            </Button>

                            <p className="text-center text-xs text-[var(--text-secondary)]">
                                Encrypted and secured.
                            </p>
                        </form>
                    </Card>

                </div>
            </main>
        </div>
    );
}
