"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlueprintButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "schematic";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

export function BlueprintButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  href,
  onClick,
  className,
  external,
  disabled,
}: BlueprintButtonProps) {
  const variants = {
    primary:
      "bg-[var(--blueprint-line)] text-[var(--blueprint-bg)] hover:bg-[var(--blueprint-accent)] hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]",
    secondary:
      "border border-[var(--blueprint-line)] text-[var(--blueprint-line)] hover:bg-[var(--blueprint-line)]/10",
    ghost:
      "text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] hover:bg-[var(--blueprint-line)]/5",
    schematic:
      "border border-dashed border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)] hover:text-[var(--blueprint-line)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 font-mono",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-[var(--blueprint-line)]/50",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        <motion.span
          className="inline-flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
