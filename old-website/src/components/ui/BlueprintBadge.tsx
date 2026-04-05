import { cn } from "@/lib/utils";

interface BlueprintBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning";
  size?: "sm" | "md";
  className?: string;
}

export function BlueprintBadge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BlueprintBadgeProps) {
  const variants = {
    default:
      "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)]",
    accent:
      "border-[var(--blueprint-accent)] text-[var(--blueprint-accent)]",
    success:
      "border-[var(--blueprint-success)] text-[var(--blueprint-success)]",
    warning:
      "border-[var(--blueprint-warning)] text-[var(--blueprint-warning)]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono border",
        "bg-[var(--blueprint-bg)]/50",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
