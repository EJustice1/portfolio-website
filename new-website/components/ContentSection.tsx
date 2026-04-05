import type { ReactNode } from "react";

type ContentSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export default function ContentSection({
  id,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`content-section${className ? ` ${className}` : ""}`}
    >
      <div className="container">{children}</div>
    </section>
  );
}

/** Primary content region after `SectionLabel` — use in every content section for consistent structure. */
export function ContentSectionBody({
  children,
  prose = false,
}: {
  children: ReactNode;
  /** About-style multi-paragraph column */
  prose?: boolean;
}) {
  return (
    <div
      className={`content-section__body${prose ? " content-section__body--prose" : ""}`}
    >
      {children}
    </div>
  );
}
