"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: 'default' | 'flat';
}

export const Card = ({
    children,
    className,
    variant = 'default',
    ...props
}: CardProps) => {
    const baseStyles = "bg-[var(--bg-white)] rounded-[var(--radius-lg)] overflow-hidden";

    const variants = {
        default: "shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--bg-beige)]",
        flat: "border border-[var(--bg-beige)]",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={clsx(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};
