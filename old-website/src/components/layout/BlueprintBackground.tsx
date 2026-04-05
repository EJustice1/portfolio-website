"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BlueprintBackgroundProps {
  variant?: "grid" | "dots" | "minimal";
  children: React.ReactNode;
  className?: string;
}

export function BlueprintBackground({
  variant = "grid",
  children,
  className,
}: BlueprintBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen",
        variant === "grid" && "blueprint-grid",
        variant === "dots" && "blueprint-dots",
        className
      )}
    >
      {/* Radial gradient following mouse */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 255, 0.06), transparent 40%)`,
        }}
      />

      {/* Vignette effect */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--blueprint-bg)_100%)] opacity-40" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
