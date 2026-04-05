import { cn } from "@/lib/utils";

interface SchematicDividerProps {
  label?: string;
  className?: string;
}

export function SchematicDivider({ label, className }: SchematicDividerProps) {
  return (
    <div className={cn("flex items-center gap-4 my-8", className)}>
      <div className="flex-1 h-px bg-[var(--blueprint-line-dim)]" />
      {label && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rotate-45 border border-[var(--blueprint-line)]" />
          <span className="text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-widest">
            {label}
          </span>
          <div className="w-2 h-2 rotate-45 border border-[var(--blueprint-line)]" />
        </div>
      )}
      <div className="flex-1 h-px bg-[var(--blueprint-line-dim)]" />
    </div>
  );
}
