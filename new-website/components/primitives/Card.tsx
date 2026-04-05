import type { ReactNode } from "react";
import CardTitle from "./CardTitle";
import Text from "./Text";
import TagChip from "./TagChip";

export type CardChrome = "none" | "rail";

export type CardProps = {
  chrome?: CardChrome;
  title: ReactNode;
  titleHref?: string;
  meta?: ReactNode;
  submeta?: ReactNode;
  description?: ReactNode;
  tags?: string[];
  footer?: ReactNode;
};

export default function Card({
  chrome = "none",
  title,
  titleHref,
  meta,
  submeta,
  description,
  tags,
  footer,
}: CardProps) {
  const chromeClass = chrome === "rail" ? "card--rail" : "";

  const titleNode =
    titleHref !== undefined ? (
      <CardTitle href={titleHref}>{title}</CardTitle>
    ) : (
      <CardTitle>{title}</CardTitle>
    );

  return (
    <li className={chromeClass ? `card ${chromeClass}` : "card"}>
      <div className="card__stack">
        {titleNode}
        {meta !== undefined && meta !== null && (
          <Text variant="meta">{meta}</Text>
        )}
        {submeta !== undefined && submeta !== null && (
          <Text variant="submeta">{submeta}</Text>
        )}
        {description !== undefined && description !== null && (
          <p className="text-body card__desc">{description}</p>
        )}
        {tags !== undefined && tags.length > 0 && (
          <ul className="card__tags">
            {tags.map((t) => (
              <TagChip key={t}>{t}</TagChip>
            ))}
          </ul>
        )}
        {footer !== undefined && footer !== null && (
          <Text variant="footer">{footer}</Text>
        )}
      </div>
    </li>
  );
}
