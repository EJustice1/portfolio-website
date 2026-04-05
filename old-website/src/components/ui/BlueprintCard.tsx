"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CornerMarkers } from "./CornerMarkers";
import { TechnicalLabel } from "./TechnicalLabel";

interface BlueprintCardProps {
  children: React.ReactNode;
  title?: string;
  technicalId?: string;
  variant?: "default" | "elevated" | "schematic";
  cornerMarkers?: boolean;
  className?: string;
  hover?: boolean;
}

export function BlueprintCard({
  children,
  title,
  technicalId,
  variant = "default",
  cornerMarkers = true,
  className,
  hover = true,
}: BlueprintCardProps) {
  const variants = {
    default: "border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg-card)]/50",
    elevated: "border-[var(--blueprint-line)] bg-[var(--blueprint-bg-card)]/80",
    schematic: "border-dashed border-[var(--blueprint-line-dim)] bg-transparent",
  };

  return (
    <motion.div
      className={cn(
        "relative border p-6",
        variants[variant],
        hover && "transition-all duration-300 hover:border-[var(--blueprint-line)] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {cornerMarkers && <CornerMarkers />}

      {technicalId && (
        <TechnicalLabel position="top-right">{technicalId}</TechnicalLabel>
      )}

      {title && (
        <h3 className="mb-4 font-mono text-lg text-[var(--blueprint-accent)]">
          {title}
        </h3>
      )}

      {children}
    </motion.div>
  );
}
