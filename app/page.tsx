import Image from "next/image";
import SectionTemplate from "@/components/section-template";
import Card from "@/components/card"
import HeroText from "@/components/hero-text"
import { sideProjects } from "@/constants";
import React from "react";



export default function Home() {
  return (
    <div className="px-6 sm:px-6 lg:px-10 grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-work-sans)]">
      <main className="relative flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className=" pt-10 pb-14 border-b border-slate-400 mb-4">
          <HeroText />
          <p>
            I build delightful user interfaces with a focus on delivering accessible product experiences.
            Currently looking for a new development role. Take a look around my website and get to know more about me.
          </p>
          <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
            <a
                className="btn-hover border-slate-50 rounded-full border border-solid border-transparent transition-colors font-[family-name:var(--font-gabarito)] flex items-center justify-center bg-background text-foreground gap-2 bg-[#383838] text-sm sm:text-base py-2 px-4 sm:px-5"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
                   src={project.src}/>)}
          </div>

        </SectionTemplate>
        <SectionTemplate title={"Recent Posts"}>
          <div className={"flex flex-col gap-5"}>
            <div className={'flex gap-5 rounded-2xl py-3 px-4'}>
              <Image className={"rounded-2xl"} src={"/crypto-crossword-thumb.png"} alt={'crypto-crossword'}
                     width={"240"} height={"180"}/>
              <div className={'font-[family-name:var(--font-gabarito)]'}>
                <h4 className={"font-semibold font-[family-name:var(--font-gabarito)]"}>Cryptocrossword</h4>
                <p>Test your crypto knowledge solving crossword game. Earn NFT rewards each time you break a quest.</p>
              </div>
            </div>
            <div className={'flex gap-5 rounded-2xl bg-[#F6F6F6] py-3 px-4'}>
              <Image className={"rounded-2xl"} src={"/crypto-crossword-thumb.png"} alt={'crypto-crossword'}
                     width={"240"} height={"180"}/>
              <div>
                <h4 className={"font-semibold mt-4 font-[family-name:var(--font-gabarito)]"}>Cryptocrossword</h4>
                <p>Test your crypto knowledge solving crossword game. Earn NFT rewards each time you break a quest.</p>
              </div>
            </div>
            <div className={'flex gap-5 rounded-2xl bg-[#F6F6F6] py-3 px-4'}>
              <Image className={"rounded-2xl"} src={"/bistro-map-front.png"} alt={'bistro-map'} width={"240"}
                     height={"180"}/>
              <div>
                <h4 className={"font-semibold mt-4"}>Bistro Map</h4>
                <p>Publish your thoughts and reviews and get rewarded</p>
              </div>
            </div>

          </div>

        </SectionTemplate>
      </main>
      <footer className="py-5 row-start-3 flex gap-6 flex-wrap items-center justify-center text-xs">
        © 2025 Park Yeonha
      </footer>
    </div>
  );
}
