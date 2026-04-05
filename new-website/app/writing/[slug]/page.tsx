import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DisplayTitle from "@/components/primitives/DisplayTitle";
import { getPosts, getPostBySlug } from "@/data/posts";
import { formatDateLong } from "@/lib/format-date";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Ethan Justice`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const posts = await getPosts();
  const categorySorted = posts
    .filter((p) => p.category === post.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const idx = categorySorted.findIndex((p) => p.slug === slug);
  const prev = categorySorted[idx + 1];
  const next = categorySorted[idx - 1];

  return (
    <main>
      <div className="container">
          <header className="post-header">
            <DisplayTitle>{post.title}</DisplayTitle>
            <div className="meta-row">
              <span>{post.category}</span>
              <span className="meta-row__sep">/</span>
              <span>{formatDateLong(post.date)}</span>
            </div>
          </header>

          <article
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <footer className="post-footer">
            <Link href="/writing" className="post-back">
              ← back
            </Link>
            <div className="post-nav-links">
              {prev && (
                <Link href={`/writing/${prev.slug}`} className="post-nav-link">
                  ← {prev.title}
                </Link>
              )}
              {next && (
                <Link href={`/writing/${next.slug}`} className="post-nav-link">
                  {next.title} →
                </Link>
              )}
            </div>
          </footer>
      </div>
    </main>
  );
}
