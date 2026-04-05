import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return <h2 className="section-label">{children}</h2>;
}
