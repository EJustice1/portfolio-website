"use client";

import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn("markdown-content", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
