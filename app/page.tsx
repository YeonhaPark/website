import SectionTemplate from "@/components/section-template";
import Card from "@/components/card";
import HeroText from "@/components/hero-text";
import { sideProjects } from "@/constants";
import GradientTemplate from "@/components/gradient-template";
import ArticleList from "@/components/article-list";
import { getSortedArticles } from "@/lib/articles";
import { Hero } from "@/components/hero";
import { About } from "@/app/section/about";
import { Projects } from "@/app/section/projects";
import { Contact } from "./section/contact";
import { Footer } from "./section/footer";
export default function Home() {
  const articles = getSortedArticles().slice(0, 3);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
