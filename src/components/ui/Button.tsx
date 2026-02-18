"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className,
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[var(--accent-terracotta)] text-white hover:bg-[var(--accent-terracotta-dark)] shadow-[0_4px_14px_0_rgba(214,90,66,0.39)]",
        secondary: "bg-[var(--bg-beige)] text-[var(--text-olive)] hover:bg-[#E5DCCF]",
        outline: "border border-[var(--text-olive)] text-[var(--text-olive)] hover:bg-[var(--bg-beige)]",
        ghost: "text-[var(--text-olive)] hover:bg-[var(--bg-beige)]/50",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-[var(--radius-sm)]",
        md: "px-6 py-3 text-base rounded-[var(--radius-md)]",
        lg: "px-8 py-4 text-lg rounded-[var(--radius-md)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {children}
        </motion.button>
    );
};
