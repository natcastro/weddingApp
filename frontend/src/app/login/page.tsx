"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar'; // Reusing Navbar for consistency

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            login(email);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-ivory)] flex flex-col">
            <div className="absolute top-0 w-full p-6">
                <Link href="/" className="text-2xl font-bold tracking-tight font-serif text-[var(--text-olive)]">
                    Sigil.
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md p-8 space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-serif text-[var(--text-olive)]">Welcome Back</h1>
                        <p className="text-[var(--text-secondary)]">Sign in to manage your invitations</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Email address"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" isLoading={loading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="text-center text-sm text-[var(--text-secondary)]">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-[var(--accent-sage-dark)] hover:underline">
                            Create one
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
