export type PostCategory = "technical" | "notes" | "quarterly";

export interface Post {
  slug: string;
  title: string;
  category: PostCategory;
  date: string; // ISO format: YYYY-MM-DD
  excerpt: string;
  body: string; // rendered HTML
}

export interface PostFile {
  slug: string;
  title: string;
  category: PostCategory;
  date: string; // ISO format: YYYY-MM-DD
  description: string; // used as excerpt in cards and writing list
  markdown: string;
}
