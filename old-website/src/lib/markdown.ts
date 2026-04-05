import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");

// Define types for log entries
export interface WeeklyLog {
  slug: string;
  title: string;
  date: string;
  week: number;
  year: number;
  tags?: string[];
  content: string;
}

export interface QuarterlyReport {
  slug: string;
  title: string;
  quarter: number;
  year: number;
  date: string;
  content: string;
}

export interface ClassPage {
  slug: string;
  title: string;
  code: string;
  semester: string;
  status: "current" | "completed" | "planned";
  content: string;
}

// Parse markdown content to HTML
export async function parseMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  return result.toString();
}

// Get all weekly logs sorted by date (newest first)
export function getAllWeeklyLogs(): WeeklyLog[] {
  const weeklyDir = path.join(contentDirectory, "weekly");
  
  // Check if directory exists
  if (!fs.existsSync(weeklyDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(weeklyDir);
  const logs = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(weeklyDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        week: data.week,
        year: data.year,
        tags: data.tags || [],
        content,
      };
    });

  // Sort by date, newest first
  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get all quarterly reports sorted by date (newest first)
export function getAllQuarterlyReports(): QuarterlyReport[] {
  const quarterlyDir = path.join(contentDirectory, "quarterly");
  
  // Check if directory exists
  if (!fs.existsSync(quarterlyDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(quarterlyDir);
  const reports = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(quarterlyDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        quarter: data.quarter,
        year: data.year,
        date: data.date,
        content,
      };
    });

  // Sort by date, newest first
  return reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get all class pages
export function getAllClasses(): ClassPage[] {
  const classesDir = path.join(contentDirectory, "classes");
  
  // Check if directory exists
  if (!fs.existsSync(classesDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(classesDir);
  const classes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(classesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        code: data.code,
        semester: data.semester,
        status: data.status || "completed",
        content,
      };
    });

  return classes;
}

// Get individual weekly log by slug
export async function getWeeklyLogBySlug(
  slug: string
): Promise<WeeklyLog & { htmlContent: string }> {
  const fullPath = path.join(contentDirectory, "weekly", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await parseMarkdown(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    week: data.week,
    year: data.year,
    tags: data.tags || [],
    content,
    htmlContent,
  };
}

// Get individual quarterly report by slug
export async function getQuarterlyReportBySlug(
  slug: string
): Promise<QuarterlyReport & { htmlContent: string }> {
  const fullPath = path.join(contentDirectory, "quarterly", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await parseMarkdown(content);

  return {
    slug,
    title: data.title,
    quarter: data.quarter,
    year: data.year,
    date: data.date,
    content,
    htmlContent,
  };
}

// Get individual class page by slug
export async function getClassPageBySlug(
  slug: string
): Promise<ClassPage & { htmlContent: string }> {
  const fullPath = path.join(contentDirectory, "classes", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await parseMarkdown(content);

  return {
    slug,
    title: data.title,
    code: data.code,
    semester: data.semester,
    status: data.status || "completed",
    content,
    htmlContent,
  };
}

// Get all slugs for a specific type (for static generation)
export function getAllSlugs(type: "weekly" | "quarterly" | "classes"): string[] {
  const dir = path.join(contentDirectory, type);
  
  // Check if directory exists
  if (!fs.existsSync(dir)) {
    return [];
  }

  const fileNames = fs.readdirSync(dir);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
