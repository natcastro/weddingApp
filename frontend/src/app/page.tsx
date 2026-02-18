"use client";

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat animate-slow-zoom"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-white/60" /> {/* Stronger Light Overlay for contrast */}
      </div>

      <Navbar />

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--bg-white)]/60 backdrop-blur-md border border-[var(--text-olive)]/20 text-[var(--text-olive)] text-sm tracking-wide font-medium">
              Elegance Simplified
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--text-olive)] drop-shadow-sm leading-tight">
              Welcome to Sigil
            </h1>
          </div>

          <p className="text-lg md:text-xl text-[var(--text-olive)]/80 max-w-xl mx-auto font-light leading-relaxed">
            We design, send, and manage your wedding invitations — so you can focus on enjoying your special day.
          </p>

          <div className="pt-8">
            <Link href="/signup">
              <Button
                size="lg"
                className="px-10 py-5 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer-like bottom area */}
      <div className="relative z-10 pb-8 text-center">
        <p className="text-[var(--bg-white)]/60 text-sm font-light">
          Sigil &copy; {new Date().getFullYear()} – Made for Love.
        </p>
      </div>
    </div>
  );
}
