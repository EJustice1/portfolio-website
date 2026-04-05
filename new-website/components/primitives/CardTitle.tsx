import Link from "next/link";
import type { ReactNode } from "react";

type CardTitleProps = {
  children: ReactNode;
  href?: string;
};

export default function CardTitle({ children, href }: CardTitleProps) {
  if (href !== undefined) {
    return (
      <Link href={href} className="card-title">
        {children}
      </Link>
    );
  }
  return <p className="card-title">{children}</p>;
}
