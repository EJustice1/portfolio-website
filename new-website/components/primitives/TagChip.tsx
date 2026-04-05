type TagChipProps = {
  children: string;
};

export default function TagChip({ children }: TagChipProps) {
  return <li className="tag">{children}</li>;
}
