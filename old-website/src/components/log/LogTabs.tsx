"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TabType = "weekly" | "quarterly" | "classes";

interface LogTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; technicalId: string }[] = [
  { id: "weekly", label: "Weekly Logs", technicalId: "WK-LOG" },
  { id: "quarterly", label: "Quarterly Reports", technicalId: "QTR-RPT" },
  { id: "classes", label: "Classes", technicalId: "CLS-PG" },
];

export function LogTabs({ activeTab, onTabChange }: LogTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--blueprint-line-dim)] pb-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative px-6 py-3 font-mono text-sm transition-all duration-300",
              "border border-[var(--blueprint-line-dim)]",
              isActive
                ? "bg-[var(--blueprint-accent)]/10 border-[var(--blueprint-accent)] text-[var(--blueprint-accent)]"
                : "bg-[var(--blueprint-bg-card)]/30 text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)] hover:text-[var(--blueprint-text)]"
            )}
          >
            {/* Corner markers */}
            <span
              className={cn(
                "absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors",
                isActive
                  ? "border-[var(--blueprint-accent)]"
                  : "border-[var(--blueprint-line-dim)]"
              )}
            />
            <span
              className={cn(
                "absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors",
                isActive
                  ? "border-[var(--blueprint-accent)]"
                  : "border-[var(--blueprint-line-dim)]"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors",
                isActive
                  ? "border-[var(--blueprint-accent)]"
                  : "border-[var(--blueprint-line-dim)]"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors",
                isActive
                  ? "border-[var(--blueprint-accent)]"
                  : "border-[var(--blueprint-line-dim)]"
              )}
            />

            {/* Technical ID */}
            <span className="text-xs opacity-60 mr-2">[{tab.technicalId}]</span>
            {tab.label}

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--blueprint-accent)]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
