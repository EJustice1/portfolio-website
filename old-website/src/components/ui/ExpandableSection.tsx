"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { expandCollapse } from "@/lib/animations";

interface ExpandableSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableSection({
  title,
  subtitle,
  badge,
  icon,
  defaultExpanded = false,
  children,
  className,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn("border border-[var(--blueprint-line-dim)]", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-4",
          "text-left transition-colors duration-200",
          "hover:bg-[var(--blueprint-line)]/5",
          isExpanded && "border-b border-[var(--blueprint-line-dim)]"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span className="text-[var(--blueprint-line)]">{icon}</span>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[var(--blueprint-accent)]">
                {title}
              </span>
              {badge && (
                <span className="text-xs px-2 py-0.5 border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)]">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-sm text-[var(--blueprint-text-dim)]">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--blueprint-line)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={expandCollapse}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
