import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { BlueprintBackground } from "@/components/layout";
import { BlueprintBadge } from "@/components/ui";
import { CornerMarkers } from "@/components/ui/CornerMarkers";
import { MarkdownContent } from "@/components/log";
import { getClassPageBySlug, getAllSlugs } from "@/lib/markdown";

interface PageProps {
  params: {
    slug: string;
  };
}

const statusColors: Record<string, "success" | "accent" | "warning"> = {
  current: "success",
  completed: "accent",
  planned: "warning",
};

// Generate static paths for all class pages
export async function generateStaticParams() {
  const slugs = getAllSlugs("classes");
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ClassPage({ params }: PageProps) {
  try {
    const { slug } = await params;
    const classPage = await getClassPageBySlug(slug);

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
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--blueprint-line)] flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[var(--blueprint-accent)]" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-mono font-bold text-[var(--blueprint-text)]">
                      {classPage.title}
                    </h1>
                  </div>
                </div>
                <div className="text-xs font-mono text-[var(--blueprint-line-dim)]">
                  {classPage.code}
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
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--blueprint-text-dim)]">
                    <Calendar className="w-4 h-4" />
                    <span>{classPage.semester}</span>
                  </div>
                  <BlueprintBadge
                    variant={statusColors[classPage.status] || "default"}
                    size="sm"
                  >
                    {classPage.status}
                  </BlueprintBadge>
                </div>
              </div>

              {/* Content */}
              <MarkdownContent content={classPage.htmlContent} />
            </div>
          </main>
        </div>
      </BlueprintBackground>
    );
  } catch (error) {
    notFound();
  }
}
