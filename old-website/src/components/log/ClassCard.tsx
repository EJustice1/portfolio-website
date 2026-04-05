"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import { BlueprintBadge } from "@/components/ui";
import { CornerMarkers } from "@/components/ui/CornerMarkers";
import type { ClassPage } from "@/lib/markdown";

interface ClassCardProps {
  classPage: ClassPage;
  index: number;
}

const statusColors: Record<string, "success" | "accent" | "warning"> = {
  current: "success",
  completed: "accent",
  planned: "warning",
};

export function ClassCard({ classPage, index }: ClassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/log/classes/${classPage.slug}`}
        className="block relative border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg-card)]/50 p-6 transition-all duration-300 hover:border-[var(--blueprint-accent)] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] group"
      >
        <CornerMarkers />

        {/* Technical ID */}
        <div className="absolute top-2 right-2 text-xs font-mono text-[var(--blueprint-line-dim)]">
          {classPage.code}
        </div>

        {/* Icon & Status Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 border border-[var(--blueprint-line)] flex items-center justify-center group-hover:border-[var(--blueprint-accent)] transition-colors">
            <BookOpen className="w-6 h-6 text-[var(--blueprint-accent)]" />
          </div>
          <BlueprintBadge
            variant={statusColors[classPage.status] || "default"}
            size="sm"
          >
            {classPage.status}
          </BlueprintBadge>
        </div>

        {/* Title */}
        <h3 className="font-mono text-lg text-[var(--blueprint-text)] mb-2 group-hover:text-[var(--blueprint-accent)] transition-colors">
          {classPage.title}
        </h3>

        {/* Semester */}
        <div className="flex items-center gap-2 text-sm text-[var(--blueprint-text-dim)] mb-4">
          <Calendar className="w-4 h-4" />
          <span>{classPage.semester}</span>
        </div>

        {/* Hover indicator */}
        <div className="mt-4 text-xs text-[var(--blueprint-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          View class details →
        </div>
      </Link>
    </motion.div>
  );
}
