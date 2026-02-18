"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { motion } from 'framer-motion';
import { Check, Upload } from 'lucide-react';

const templates = [
    { id: 1, name: "Classic Elegance", image: "https://images.unsplash.com/photo-1595053826286-2e59684f4b10?auto=format&fit=crop&q=80&w=800", style: "Traditional" },
    { id: 2, name: "Modern Minimalist", image: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?auto=format&fit=crop&q=80&w=800", style: "Clean" },
    { id: 3, name: "Boho Floral", image: "https://images.unsplash.com/photo-1605100804763-ebea4c99557b?auto=format&fit=crop&q=80&w=800", style: "Bohemian" },
    { id: 4, name: "Rustic Charm", image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0d0f7?auto=format&fit=crop&q=80&w=800", style: "Rustic" },
];

export default function DesignPage() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleContinue = () => {
        // In real app, save selection to backend
        router.push('/payment');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Simulate upload
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                setSelectedId(999); // ID for uploaded design
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)]">
            <DashboardSidebar />

            <main className="ml-64 p-8 max-w-7xl mx-auto space-y-8">
                <header>
                    <h1 className="text-4xl font-serif text-[var(--text-olive)]">Select Your Design</h1>
                    <p className="text-[var(--text-secondary)] mt-1">Choose a template or upload your own creation</p>
                </header>

                {/* Upload Section */}
                <section>
                    <h2 className="text-xl font-serif mb-4 text-[var(--text-olive)]">Upload Custom Design</h2>
                    <Card
                        className={`p-8 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${selectedId === 999 ? 'border-[var(--accent-sage)] bg-[var(--accent-sage)]/5' : 'border-[var(--bg-beige)] hover:border-[var(--accent-sage)]/50'}`}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*,application/pdf"
                            onChange={handleFileUpload}
                        />
                        <div className="w-16 h-16 rounded-full bg-[var(--bg-ivory)] flex items-center justify-center mb-4 text-[var(--accent-sage-dark)]">
                            {isUploading ? <span className="animate-spin">⌛</span> : <Upload size={24} />}
                        </div>
                        <h3 className="font-medium text-[var(--text-primary)]">Click to upload your design</h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">Supported formats: JPG, PNG, PDF</p>
                        {selectedId === 999 && !isUploading && (
                            <div className="mt-4 flex items-center text-[var(--accent-sage-dark)] font-medium">
                                <Check size={18} className="mr-2" /> File Selected
                            </div>
                        )}
                    </Card>
                </section>

                {/* Template Gallery */}
                <section>
                    <h2 className="text-xl font-serif mb-4 text-[var(--text-olive)]">Choose from Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {templates.map((template) => (
                            <motion.div
                                key={template.id}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedId(template.id)}
                                className="cursor-pointer group relative"
                            >
                                <Card className={`overflow-hidden h-full border-2 transition-all ${selectedId === template.id ? 'border-[var(--accent-sage)] shadow-lg' : 'border-transparent hover:border-[var(--bg-beige)]'}`}>
                                    <div className="aspect-[3/4] relative bg-gray-100">
                                        {/* In a real app, use Next.js Image component */}
                                        <img
                                            src={template.image}
                                            alt={template.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {selectedId === template.id && (
                                            <div className="absolute inset-0 bg-[var(--accent-sage)]/20 flex items-center justify-center backdrop-blur-[1px]">
                                                <div className="bg-white p-3 rounded-full shadow-md text-[var(--accent-sage-dark)]">
                                                    <Check size={24} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 text-center">
                                        <h3 className="font-serif text-lg text-[var(--text-primary)]">{template.name}</h3>
                                        <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mt-1">{template.style}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <div className="flex justify-end pt-8 border-t border-[var(--bg-beige)]">
                    <Button disabled={!selectedId} size="lg" onClick={handleContinue}>
                        Continue to Payment
                    </Button>
                </div>
            </main>
        </div>
    );
}
