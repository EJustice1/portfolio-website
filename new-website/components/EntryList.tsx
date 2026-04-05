import type { ReactNode } from "react";

type EntryListProps = {
  children: ReactNode;
};

export default function EntryList({ children }: EntryListProps) {
  return <ul className="card-list">{children}</ul>;
}
