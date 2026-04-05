import type { Metadata } from "next";
import WritingPageClient from "@/components/WritingPageClient";
import { getPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Writing · Ethan Justice",
  description: "Technical posts, notes, and quarterly updates.",
};

export default async function Writing() {
  const posts = await getPosts();
  return <WritingPageClient posts={posts} />;
}
