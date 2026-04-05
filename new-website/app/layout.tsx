import type { Metadata } from "next";
import { dmSans, fraunces } from "./fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getPosts } from "@/data/posts";
import "./tokens.css";
import "./primitives.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ethan Justice",
  description:
    "Software engineer at Google YouTube. Background in ML systems, GPU programming, and distributed infrastructure.",
  openGraph: {
    title: "Ethan Justice",
    description:
      "Software engineer at Google YouTube. Background in ML systems, GPU programming, and distributed infrastructure.",
    url: "https://ethanjustice.dev",
    siteName: "Ethan Justice",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();
  const hasPosts = posts.length > 0;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Nav showWriting={hasPosts} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
