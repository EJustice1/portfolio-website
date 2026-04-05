import type { ReactNode } from "react";

export type TextVariant = "premise" | "body" | "meta" | "submeta" | "footer";

const variantClass: Record<TextVariant, string> = {
  premise: "text-premise",
  body: "text-body",
  meta: "text-meta",
  submeta: "text-submeta",
  footer: "text-footer",
};

type TextProps = {
  children: ReactNode;
  variant: TextVariant;
  as?: "p" | "span" | "div";
  className?: string;
};

export default function Text({
  children,
  variant,
  as: Tag = "p",
  className = "",
}: TextProps) {
  return (
    <Tag
      className={`${variantClass[variant]}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
