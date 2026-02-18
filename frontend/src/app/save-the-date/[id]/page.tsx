"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, X } from 'lucide-react';

export default function SaveTheDatePage({ params }: { params: { id: string } }) {
    const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
    const [showConf, setShowConf] = useState(false);

    const handleRsvp = (status: 'accepted' | 'declined') => {
        setRsvpStatus(status);
        setShowConf(true);
        // In real app, API call to update guest status
    };

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent-sage)] rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent-blush)] rounded-full blur-[120px]" />
            </div>

            <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm border-[var(--bg-beige)] shadow-2xl relative z-10 overflow-hidden">
                {/* Invitation Preview Header */}
                <div className="bg-[var(--bg-beige)]/30 p-8 text-center space-y-4 border-b border-[var(--bg-beige)]">
                    <span className="text-sm font-medium tracking-widest text-[var(--text-secondary)] uppercase">Save the Date</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[var(--text-olive)]">
                        Natalie & Partner
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-[var(--text-primary)] font-serif italic text-lg">
                        <span>August 24th, 2026</span>
                        <span>•</span>
                        <span>Napa Valley, CA</span>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <p className="text-center text-[var(--text-secondary)] leading-relaxed">
                        We would be honored to have you join us as we celebrate our special day.
                        Please let us know if you can make it.
                    </p>

                    <AnimatePresence mode="wait">
                        {rsvpStatus === 'pending' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Button
                                    onClick={() => handleRsvp('accepted')}
                                    className="flex-1 bg-[var(--accent-sage)] hover:bg-[var(--accent-sage-dark)] text-white py-4"
                                >
                                    <Check className="mr-2 h-4 w-4" /> Joyfully Accept
                                </Button>
                                <Button
                                    onClick={() => handleRsvp('declined')}
                                    variant="outline"
                                    className="flex-1 py-4 border-[var(--text-olive)]/20 hover:bg-[var(--bg-beige)]"
                                >
                                    <X className="mr-2 h-4 w-4" /> Regretfully Decline
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-4"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${rsvpStatus === 'accepted' ? 'bg-[var(--accent-sage)]/20 text-[var(--accent-sage)]' : 'bg-gray-100 text-gray-400'}`}>
                                    {rsvpStatus === 'accepted' ? <Check size={32} /> : <X size={32} />}
                                </div>
                                <h3 className="text-2xl font-serif text-[var(--text-olive)]">
                                    {rsvpStatus === 'accepted' ? 'Wonderful!' : 'We will miss you.'}
                                </h3>
                                <p className="text-[var(--text-secondary)]">
                                    {rsvpStatus === 'accepted'
                                        ? "We've added you to the guest list. More details to follow."
                                        : "Thank you for letting us know."}
                                </p>
                                <Button variant="ghost" size="sm" onClick={() => setRsvpStatus('pending')}>
                                    Change Response
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>

            <footer className="mt-8 text-[var(--text-secondary)]/60 text-sm font-light">
                Powered by <span className="font-serif">Sigil.</span>
            </footer>
        </div>
    );
}
