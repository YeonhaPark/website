import SectionTemplate from "@/components/section-template";
import Card from "@/components/card"
import HeroText from "@/components/hero-text"
import { sideProjects } from "@/constants";
import React from "react";
import GradientTemplate from "@/components/gradient-template";
import Footer from "@/components/footer";
import ArticleList from "@/components/article-list";
import {getSortedArticles} from "@/lib/articles";


export default function Home() {
  const articles = getSortedArticles().slice(0, 3);

  return (
      <GradientTemplate>
        <div
            className="max-w-screen-xl px-6 lg:px-10 grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-work-sans)]">
          <main className="relative flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <section className=" pt-10 pb-14 mb-4">
              <HeroText/>
              <p className="mt-6">
                I build delightful user interfaces with a focus on delivering accessible product experiences.
                Currently looking for a new development role. <br/>Take a look around my website and get to know more about
                me.
              </p>
              <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
                <a
                    className="btn-hover border-slate-50 rounded-full transition-colors font-[family-name:var(--font-gabarito)] flex items-center justify-center bg-background text-foreground gap-2 bg-[#383838] text-sm sm:text-base py-2 px-4 sm:px-5"
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  More Information →
                </a>
              </div>
            </section>
            <SectionTemplate title={"Side Projects"}>
              <div className={"flex flex-col gap-20 lg:gap-8"}>
                {sideProjects.map((project) =>
                    <Card key={project.title}
                          title={project.title}
                          github={project.github}
                          description={project.description}
                          usedSkills={project.usedSkills}
                          link={project.website}
                          src={project.src}/>)}
              </div>

            </SectionTemplate>
            <SectionTemplate title={"Recent Posts"}>
             <ArticleList articles={articles}/>
            </SectionTemplate>
          </main>
          <Footer />
        </div>
      </GradientTemplate>
  );
}
