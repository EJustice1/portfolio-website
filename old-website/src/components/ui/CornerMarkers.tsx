import { cn } from "@/lib/utils";

interface CornerMarkersProps {
  size?: number;
  className?: string;
}

export function CornerMarkers({ size = 12, className }: CornerMarkersProps) {
  const style = { width: size, height: size };
  const baseClass = "absolute border-[var(--blueprint-line)]";

  return (
    <>
      {/* Top Left */}
      <div
        className={cn(baseClass, "top-0 left-0 border-t-2 border-l-2", className)}
        style={style}
      />
      {/* Top Right */}
      <div
        className={cn(baseClass, "top-0 right-0 border-t-2 border-r-2", className)}
        style={style}
      />
      {/* Bottom Left */}
      <div
        className={cn(baseClass, "bottom-0 left-0 border-b-2 border-l-2", className)}
        style={style}
      />
      {/* Bottom Right */}
      <div
        className={cn(baseClass, "bottom-0 right-0 border-b-2 border-r-2", className)}
        style={style}
      />
    </>
  );
}
