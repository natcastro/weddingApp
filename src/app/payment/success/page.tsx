"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, Copy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
    // Mock generating a unique link
    const uniqueLink = "https://sigil.app/save-the-date/natalie-and-partner";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(uniqueLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)] flex flex-col items-center justify-center p-4">
            <Card className="max-w-xl w-full p-10 text-center space-y-8 shadow-2xl border-none">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-24 h-24 bg-[var(--status-success)] rounded-full mx-auto flex items-center justify-center text-white shadow-lg"
                >
                    <Check size={48} />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-serif text-[var(--text-olive)]">You are all set!</h1>
                    <p className="text-[var(--text-secondary)] text-lg">
                        Your payment has been processed and your invitation is ready to share.
                    </p>
                </div>

                <div className="bg-[var(--bg-beige)] p-6 rounded-[var(--radius-md)] space-y-4">
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">
                        Your Save the Date Link
                    </p>
                    <div className="flex items-center gap-2 bg-white p-2 rounded-[var(--radius-sm)] border border-[var(--bg-beige)]">
                        <input
                            readOnly
                            value={uniqueLink}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-[var(--text-primary)] text-sm px-2"
                        />
                        <Button size="sm" variant="ghost" onClick={handleCopy}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </Button>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                        Share this link with your guests so they can RSVP.
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8">
                            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
