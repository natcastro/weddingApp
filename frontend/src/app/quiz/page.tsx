"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/layout/Navbar';

// Quiz Steps
const steps = [
    { id: 'date', title: 'When is the big day?', description: 'This helps us plan your timeline.' },
    { id: 'guests', title: 'How many guests?', description: 'An estimate is fine for now.' },
    { id: 'events', title: 'Events planned?', description: 'Ceremony, Reception, Dinner, etc.' },
    { id: 'style', title: 'Design Preference?', description: 'What vibe are you going for?' },
];

export default function QuizPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        date: '',
        guestCount: '',
        eventCount: '',
        style: '',
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Finish quiz - save to local storage or context if needed
            localStorage.setItem('sigil_wedding_data', JSON.stringify(formData));
            router.push('/dashboard/design'); // Redirect to design selection
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const currentStepData = steps[currentStep];

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)] flex flex-col">
            <div className="absolute top-0 w-full p-6">
                <div className="text-2xl font-bold tracking-tight font-serif text-[var(--text-olive)]">
                    Sigil.
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-xl space-y-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-[var(--bg-beige)] h-2 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--accent-sage)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <Card className="p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 flex-1"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-serif text-[var(--text-olive)]">{currentStepData.title}</h2>
                                    <p className="text-[var(--text-secondary)]">{currentStepData.description}</p>
                                </div>

                                <div className="pt-4">
                                    {currentStep === 0 && (
                                        <Input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleChange('date', e.target.value)}
                                            className="text-lg"
                                        />
                                    )}
                                    {currentStep === 1 && (
                                        <Input
                                            type="number"
                                            placeholder="e.g. 150"
                                            value={formData.guestCount}
                                            onChange={(e) => handleChange('guestCount', e.target.value)}
                                            className="text-lg"
                                        />
                                    )}
                                    {currentStep === 2 && (
                                        <Input
                                            type="number"
                                            placeholder="Number of events"
                                            value={formData.eventCount}
                                            onChange={(e) => handleChange('eventCount', e.target.value)}
                                            className="text-lg"
                                        />
                                    )}
                                    {currentStep === 3 && (
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { id: 'Modern', image: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?auto=format&fit=crop&q=80&w=400" },
                                                { id: 'Classic', image: "https://images.unsplash.com/photo-1595053826286-2e59684f4b10?auto=format&fit=crop&q=80&w=400" },
                                                { id: 'Boho', image: "https://images.unsplash.com/photo-1605100804763-ebea4c99557b?auto=format&fit=crop&q=80&w=400" },
                                                { id: 'Rustic', image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0d0f7?auto=format&fit=crop&q=80&w=400" }
                                            ].map((styleOption) => (
                                                <button
                                                    key={styleOption.id}
                                                    onClick={() => handleChange('style', styleOption.id)}
                                                    className={`p-4 rounded-[var(--radius-md)] border text-left transition-all flex flex-col items-center justify-center space-y-2 ${formData.style === styleOption.id
                                                        ? 'border-[var(--accent-sage)] bg-[var(--accent-sage)]/10 text-[var(--accent-sage-dark)]'
                                                        : 'border-[var(--bg-beige)] hover:border-[var(--accent-sage)]'
                                                        }`}
                                                >
                                                    <img src={styleOption.image} alt={styleOption.id} className="w-full h-24 object-cover rounded-[var(--radius-sm)] mb-2" />
                                                    <span className="font-medium">{styleOption.id}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between pt-8">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={currentStep === 0 ? 'invisible' : ''}
                            >
                                Back
                            </Button>
                            <Button onClick={handleNext}>
                                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>

                        <p className="text-center text-xs text-[var(--text-secondary)]/60 mt-4">
                            Step {currentStep + 1} of {steps.length}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
