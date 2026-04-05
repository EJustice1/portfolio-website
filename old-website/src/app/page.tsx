import { Header, Footer, BlueprintBackground } from "@/components/layout";
import {
  Hero,
  Experience,
  Projects,
  Education,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <BlueprintBackground variant="grid">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </BlueprintBackground>
  );
}
