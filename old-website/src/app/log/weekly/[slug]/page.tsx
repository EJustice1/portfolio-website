import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { BlueprintBackground } from "@/components/layout";
import { BlueprintBadge } from "@/components/ui";
import { CornerMarkers } from "@/components/ui/CornerMarkers";
import { MarkdownContent } from "@/components/log";
import { getWeeklyLogBySlug, getAllSlugs } from "@/lib/markdown";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all weekly logs
export async function generateStaticParams() {
  const slugs = getAllSlugs("weekly");
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function WeeklyLogPage({ params }: PageProps) {
  try {
    const { slug } = await params;
    const log = await getWeeklyLogBySlug(slug);

    return (
      <BlueprintBackground variant="grid">
        <div className="min-h-screen">
          {/* Header */}
          <header className="border-b border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)]/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Link
                href="/log"
                className="inline-flex items-center gap-2 text-sm text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-accent)] transition-colors mb-4 font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dev Log
              </Link>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-mono font-bold text-[var(--blueprint-text)]">
                    {log.title}
                  </h1>
                </div>
                <div className="text-xs font-mono text-[var(--blueprint-line-dim)]">
                  WK-{log.year}-{String(log.week).padStart(2, "0")}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg-card)]/50 p-8">
              <CornerMarkers />

              {/* Metadata */}
              <div className="mb-8 pb-6 border-b border-[var(--blueprint-line-dim)]">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--blueprint-text-dim)]">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(log.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {log.tags && log.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag) => (
                      <BlueprintBadge key={tag} variant="default" size="sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </BlueprintBadge>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <MarkdownContent content={log.htmlContent} />
            </div>
          </main>
        </div>
      </BlueprintBackground>
    );
  } catch (error) {
    notFound();
  }
}
