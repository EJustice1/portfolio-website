"use client";

import { motion } from "framer-motion";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { CornerMarkers } from "@/components/ui/CornerMarkers";
import type { QuarterlyReport } from "@/lib/markdown";

interface QuarterlyReportCardProps {
  report: QuarterlyReport;
  index: number;
}

export function QuarterlyReportCard({ report, index }: QuarterlyReportCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/log/quarterly/${report.slug}`}
        className="block relative border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg-card)]/50 p-6 transition-all duration-300 hover:border-[var(--blueprint-accent)] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] group"
      >
        <CornerMarkers />

        {/* Technical ID */}
        <div className="absolute top-2 right-2 text-xs font-mono text-[var(--blueprint-line-dim)]">
          Q{report.quarter}-{report.year}
        </div>

        {/* Icon */}
        <div className="w-12 h-12 border border-[var(--blueprint-line)] flex items-center justify-center mb-4 group-hover:border-[var(--blueprint-accent)] transition-colors">
          <FileText className="w-6 h-6 text-[var(--blueprint-accent)]" />
        </div>

        {/* Title */}
        <h3 className="font-mono text-lg text-[var(--blueprint-text)] mb-2 group-hover:text-[var(--blueprint-accent)] transition-colors">
          {report.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-[var(--blueprint-text-dim)] mb-4">
          <Calendar className="w-4 h-4" />
          <span>{new Date(report.date).toLocaleDateString("en-US", { 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}</span>
        </div>

        {/* Hover indicator */}
        <div className="mt-4 text-xs text-[var(--blueprint-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          Read full report →
        </div>
      </Link>
    </motion.div>
  );
}
