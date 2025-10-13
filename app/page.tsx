import { Hero } from "@/components/hero";
import { About } from "@/app/section/about";
import { Projects } from "@/app/section/projects";
import { Contact } from "./section/contact";
import { Footer } from "./section/footer";
import { Experience } from "./section/experience";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
