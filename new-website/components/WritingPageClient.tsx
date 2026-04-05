"use client";

import { useState } from "react";
import ContentSection, {
  ContentSectionBody,
} from "@/components/ContentSection";
import EntryList from "@/components/EntryList";
import Card from "@/components/primitives/Card";
import type { Post, PostCategory } from "@/data/post-types";
import { formatDate } from "@/lib/format-date";

type Filter = "all" | PostCategory;

interface WritingPageClientProps {
  posts: Post[];
}

export default function WritingPageClient({ posts }: WritingPageClientProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <main>
      <ContentSection className="content-section--writing">
          <ContentSectionBody>
            <div className="writing-filters">
              {(["all", "technical", "notes", "quarterly"] as Filter[]).map(
                (f) => (
                  <button
                    key={f}
                    className={`filter-btn${filter === f ? " active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                )
              )}
            </div>

            {visible.length === 0 ? (
              <p className="writing-empty">No posts yet.</p>
            ) : (
              <EntryList>
                {visible.map((post) => (
                  <Card
                    key={post.slug}
                    chrome="none"
                    title={post.title}
                    titleHref={`/writing/${post.slug}`}
                    meta={
                      <>
                        {post.category} &middot; {formatDate(post.date)}
                      </>
                    }
                    description={post.excerpt}
                  />
                ))}
              </EntryList>
            )}
          </ContentSectionBody>
      </ContentSection>
    </main>
  );
}
