import type { Metadata } from "next";
import ContentSection, {
  ContentSectionBody,
} from "@/components/ContentSection";
import SectionLabel from "@/components/primitives/SectionLabel";
import EntryList from "@/components/EntryList";
import Card from "@/components/primitives/Card";
import { getAllWork, allProjects } from "@/data/work";

export const metadata: Metadata = {
  title: "Experience Archive · Ethan Justice",
  description: "All work and projects.",
};

export default function Archive() {
  const allWork = getAllWork();
  return (
    <main>
      <ContentSection>
        <SectionLabel>work</SectionLabel>
        <ContentSectionBody>
          <EntryList>
            {allWork.map((item) => (
              <Card
                key={item.title + item.org}
                chrome="none"
                title={item.title}
                meta={
                  <>
                    {item.org} &middot; {item.dates}
                  </>
                }
                description={item.description}
              />
            ))}
          </EntryList>
        </ContentSectionBody>
      </ContentSection>

      <ContentSection>
        <SectionLabel>projects</SectionLabel>
        <ContentSectionBody>
          <EntryList>
            {allProjects.map((item) => (
              <Card
                key={item.name}
                chrome="none"
                title={item.name}
                meta={
                  <>
                    {item.context} &middot; {item.date}
                  </>
                }
                description={item.description}
              />
            ))}
          </EntryList>
        </ContentSectionBody>
      </ContentSection>
    </main>
  );
}
