import { cn } from "@/lib/utils";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface TechnicalLabelProps {
  children: React.ReactNode;
  position?: Position;
  className?: string;
}

const positionClasses: Record<Position, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2",
};

export function TechnicalLabel({
  children,
  position = "top-right",
  className,
}: TechnicalLabelProps) {
  return (
    <span
      className={cn(
        "absolute text-[10px] font-mono uppercase tracking-wider",
        "text-[var(--blueprint-text-dim)]",
        "px-1.5 py-0.5 border border-[var(--blueprint-line-dim)]",
        "bg-[var(--blueprint-bg)]",
        positionClasses[position],
        className
      )}
    >
      {children}
    </span>
  );
}
