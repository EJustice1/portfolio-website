import type { ReactNode } from "react";

type DisplayTitleProps = {
  children: ReactNode;
};

export default function DisplayTitle({ children }: DisplayTitleProps) {
  return <h1 className="display-title">{children}</h1>;
}
