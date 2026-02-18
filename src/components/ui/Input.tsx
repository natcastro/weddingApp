"use client";

import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-[var(--text-olive)]">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={clsx(
                        "w-full px-4 py-3 bg-[var(--bg-white)] border border-[#E0E0E0] rounded-[var(--radius-md)]",
                        "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--accent-sage)]/20 focus:border-[var(--accent-sage)]",
                        "transition-all duration-200",
                        error && "border-[var(--status-error)] focus:ring-[var(--status-error)]/20 focus:border-[var(--status-error)]",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-[var(--status-error)]">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
