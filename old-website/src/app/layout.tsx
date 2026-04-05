import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E. Justice | ML Researcher & Software Engineer",
  description:
    "Portfolio of E. Justice - Machine Learning Researcher at University of Michigan specializing in LLM inference optimization, KV-caching, and multi-agent systems. Experience in AI engineering, full-stack development, and HPC.",
  keywords: [
    "Machine Learning",
    "LLM",
    "vLLM",
    "KV-Cache",
    "Software Engineer",
    "University of Michigan",
    "AI Research",
    "Full-Stack Developer",
  ],
  authors: [{ name: "E. Justice" }],
  openGraph: {
    title: "E. Justice | ML Researcher & Software Engineer",
    description:
      "Machine Learning Researcher specializing in LLM inference optimization and multi-agent systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "E. Justice | ML Researcher & Software Engineer",
    description:
      "Machine Learning Researcher specializing in LLM inference optimization and multi-agent systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[var(--blueprint-bg)] text-[var(--blueprint-text)]`}
      >
        {children}
      </body>
    </html>
  );
}
