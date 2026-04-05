import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Post, PostCategory } from "./post-types";

export type { Post, PostCategory } from "./post-types";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const isExternal = /^https?:\/\//.test(url);
      const attrs = isExternal ? ' target="_blank" rel="noreferrer"' : "";
      return `<a href="${url}"${attrs}>${label}</a>`;
    });
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.trim().split("\n");
  const html: string[] = [];
  const paragraph: string[] = [];
  const listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const content = applyInline(paragraph.join(" ").trim());
    html.push(`<p>${content}</p>`);
    paragraph.length = 0;
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems.map((item) => `<li>${applyInline(item)}</li>`).join("\n");
    html.push(`<ul>\n${items}\n</ul>`);
    listItems.length = 0;
  };

  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        const code = escapeHtml(codeBlockLines.join("\n"));
        html.push(`<pre><code>${code}</code></pre>`);
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    const trimmed = line.trim();

    if (trimmed.length === 0) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${applyInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${applyInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return html.join("\n");
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

function parseFrontmatter(raw: string): {
  title: string;
  date: string;
  category: PostCategory;
  description: string;
  markdown: string;
} {
  if (!raw.startsWith("---\n")) {
    throw new Error("Missing frontmatter block.");
  }

  const endIdx = raw.indexOf("\n---\n", 4);
  if (endIdx === -1) {
    throw new Error("Unterminated frontmatter block.");
  }

  const frontmatter = raw.slice(4, endIdx).trim();
  const markdown = raw.slice(endIdx + 5).trim();

  const map = new Map<string, string>();
  for (const line of frontmatter.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    map.set(key, value.replace(/^"(.*)"$/, "$1"));
  }

  const title = map.get("title");
  const date = map.get("date");
  const category = map.get("category");
  const description = map.get("description");

  if (!title || !date || !category || !description) {
    throw new Error("Frontmatter requires title, date, category, description.");
  }

  if (category !== "technical" && category !== "notes" && category !== "quarterly") {
    throw new Error(`Invalid category: ${category}`);
  }

  return {
    title,
    date,
    category,
    description,
    markdown,
  };
}

async function readPostFile(fileName: string): Promise<Post | null> {
  if (!fileName.endsWith(".md")) return null;
  if (fileName.startsWith("_")) return null;

  const filePath = path.join(WRITING_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = parseFrontmatter(raw);

  return {
    slug: slugFromFilename(fileName),
    title: parsed.title,
    category: parsed.category,
    date: parsed.date,
    excerpt: parsed.description,
    body: markdownToHtml(parsed.markdown),
  };
}

export async function getPosts(): Promise<Post[]> {
  const files = await fs.readdir(WRITING_DIR);
  const loaded = await Promise.all(files.map((file) => readPostFile(file)));
  return loaded
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.category === category);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}
