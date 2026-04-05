import Link from "next/link";
import ContentSection, {
  ContentSectionBody,
} from "@/components/ContentSection";
import EntryList from "@/components/EntryList";
import DisplayTitle from "@/components/primitives/DisplayTitle";
import Text from "@/components/primitives/Text";
import SectionLabel from "@/components/primitives/SectionLabel";
import Card from "@/components/primitives/Card";
import { getSelectedWork } from "@/data/work";
import { getPosts } from "@/data/posts";
import { formatDate } from "@/lib/format-date";

const atGoogle = new Date() >= new Date("2026-06-01");

export default async function Home() {
  const selectedWork = getSelectedWork();
  const posts = await getPosts();
  const hasPosts = posts.length > 0;
  const technicalPosts = posts.filter((p) => p.category === "technical");
  const notePosts = posts.filter((p) => p.category === "notes");
  const quarterlyPosts = posts.filter((p) => p.category === "quarterly");

  return (
    <main>
        <section className="fold">
          <div className="container">
            <DisplayTitle>Ethan Justice</DisplayTitle>
            <Text variant="premise" className="fold-premise">
              Software engineer. Interested in how things work.
            </Text>
            <Text variant="body" className="fold-bio">
              Finishing a CS degree at Michigan, starting at Google YouTube in
              June. This is where I put things I&rsquo;ve built, things I&rsquo;m
              thinking about, and things I learned later than I should have.
            </Text>
            <ul className="fold-links">
              <li>
                <a
                  href="https://github.com/EJustice1"
                  target="_blank"
                  rel="noreferrer"
                >
                  github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ethan-justice/"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin
                </a>
              </li>
              <li>
                <a href="mailto:ethanljustice@gmail.com">ethanljustice@gmail.com</a>
              </li>
            </ul>
          </div>
        </section>

        {hasPosts && (() => {
          const otherPosts = [...technicalPosts, ...notePosts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const homePosts = [
            ...quarterlyPosts.slice(0, 1),
            ...otherPosts.slice(0, 2),
          ];
          const hasMore = posts.length > homePosts.length;
          return (
            <ContentSection>
              <SectionLabel>writing</SectionLabel>
              <ContentSectionBody>
                <EntryList>
                  {homePosts.map((post) => (
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
                {hasMore && (
                  <Link href="/writing" className="section-more">
                    all writing →
                  </Link>
                )}
              </ContentSectionBody>
            </ContentSection>
          );
        })()}

        <ContentSection id="work">
          <SectionLabel>selected work</SectionLabel>
          <ContentSectionBody>
            <EntryList>
              {selectedWork.map((item) => (
                <Card
                  key={item.title + item.org}
                  chrome="rail"
                  title={item.title}
                  meta={
                    <>
                      {item.org} &middot; {item.date}
                    </>
                  }
                  description={item.description}
                  tags={item.tags}
                />
              ))}
            </EntryList>
            <Link href="/archive" className="section-more">
              all work →
            </Link>
          </ContentSectionBody>
        </ContentSection>

        <ContentSection id="about">
          <SectionLabel>about</SectionLabel>
          <ContentSectionBody prose>
            <Text variant="body">
              I started coding in middle school writing control software for a
              robotics team. Went 30 miles south to the University of Michigan
              for CS.
            </Text>
            <Text variant="body">
              Graduated in three years. Interned at UWM and Little Caesars doing
              backend work, then joined PersistOS as one of the first engineers.
              Spent my last semester at Michigan doing ML inference
              research on KV-cache management in vLLM and LMCache.
            </Text>
            <Text variant="body">
              {atGoogle
                ? "I'm at Google YouTube. I don't know what comes after that."
                : "Starting at Google YouTube in June. I don't know what comes after that."
              }
            </Text>
          </ContentSectionBody>
        </ContentSection>

        <ContentSection id="education">
          <SectionLabel>education</SectionLabel>
          <ContentSectionBody>
            <EntryList>
              <Card
                chrome="rail"
                title="University of Michigan"
                meta={
                  <>
                    B.S.E. Computer Science &middot; Dean&rsquo;s List, University
                    Honors
                  </>
                }
                submeta="Aug 2023 – May 2026"
                footer={
                  <>
                    Distributed Systems &middot; GPU Programming &middot;
                    Operating Systems &middot; NLP &middot; Computer Vision
                  </>
                }
              />
            </EntryList>
          </ContentSectionBody>
        </ContentSection>
    </main>
  );
}
