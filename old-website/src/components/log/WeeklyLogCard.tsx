"use client";

import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { BlueprintBadge } from "@/components/ui";
import { CornerMarkers } from "@/components/ui/CornerMarkers";
import type { WeeklyLog } from "@/lib/markdown";

interface WeeklyLogCardProps {
  log: WeeklyLog;
  index: number;
}

export function WeeklyLogCard({ log, index }: WeeklyLogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/log/weekly/${log.slug}`}
        className="block relative border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg-card)]/50 p-6 transition-all duration-300 hover:border-[var(--blueprint-accent)] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] group"
      >
        <CornerMarkers />

        {/* Technical ID */}
        <div className="absolute top-2 right-2 text-xs font-mono text-[var(--blueprint-line-dim)]">
          WK-{log.year}-{String(log.week).padStart(2, "0")}
        </div>

        {/* Title */}
        <h3 className="font-mono text-lg text-[var(--blueprint-text)] mb-2 group-hover:text-[var(--blueprint-accent)] transition-colors">
          {log.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-[var(--blueprint-text-dim)] mb-4">
          <Calendar className="w-4 h-4" />
          <span>{new Date(log.date).toLocaleDateString("en-US", { 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}</span>
        </div>

        {/* Tags */}
        {log.tags && log.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {log.tags.map((tag) => (
              <BlueprintBadge key={tag} variant="default" size="sm">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </BlueprintBadge>
            ))}
          </div>
        )}

        {/* Hover indicator */}
        <div className="mt-4 text-xs text-[var(--blueprint-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          Read full log →
        </div>
      </Link>
    </motion.div>
  );
}
