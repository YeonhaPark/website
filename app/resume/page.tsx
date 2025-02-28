import Tag from "@/components/tag"
import { about, experience, education, skills, languages } from "@/constants"
import GradientTemplate from "@/components/gradient-template";
import Link from "next/link";
export default function Page() {
    return <GradientTemplate>
        <main>
            <section id={"about"} className={'my-20 w-10/12 md:w-full mx-auto'}>
                <div className={"text-lg md:text-xl font-semibold mb-4"}><h2>About</h2></div>
                <div>
                    {about.map((el: string, idx: number) => <p key={idx} className={"mb-2"}>{el}</p>)}
                </div>
            </section>
            <section id={"skills"} className={'mb-20 w-10/12 md:w-full mx-auto'}>
                <div className={"text-lg md:text-xl font-semibold mb-4"}><h2>Skills</h2></div>
                <div>
                    <ul>
                        {skills.map(el => <li key={el.title} className={'mb-2'}>
                            <div >
                                    <h3 className={'mb-2 font-semibold text-sm'}>
                                        {el.title}
                                    </h3>
                                    <p>{el.description}</p>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </section>
            <section id={"experience"} className={'mb-20 w-10/12 md:w-full mx-auto'}>
                <div className={"text-lg md:text-xl font-semibold mb-4"}><h2>Experience</h2></div>
                <div>
                    <ul>
                        {experience.map(el => <li key={el.year} className={'mb-2'}>
                            <div
                                key={el.year}
                                className={"group relative grid mb-10 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"}>
                                <header className={"text-sm mt-1"}>
                                    {el.year}
                                </header>
                                <div className={"sm:col-span-6"}>
                                    <div className="flex gap-3 items-center mb-1">
                                        <h3 className={"font-semibold"}>
                                            {el.role}
                                        </h3>
                                        {el.link && <Link href={el.link} className={"flex items-center cursor-pointer"} target="_blank"
                                               rel="noopener noreferrer">
                                            <span className={"icon-link"}/>
                                        </Link>}
                                    </div>
                                    <pre className={"text-sm md:text-base mb-5 whitespace-pre-wrap"}>{el.description}</pre>
                                    {el.skills ? <ul className="flex gap-2 flex-wrap">
                                        {el.skills.map((el: string) => <Tag key={el} title={el}/>)}
                                    </ul>: null}
                                </div>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </section>
            <section id={"education"} className={'mb-20 w-10/12 md:w-full mx-auto'}>
                <div className={"text-lg md:text-xl font-semibold mb-4"}><h2>Education</h2></div>
                <div>
                    <ul>
                        {education.map(el => <li
                            key={el.title}
                            className={"\"group mb-2 relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50\""}>
                            <header className={"text-sm mt-1"}>
                                {el.year}
                            </header>
                            <div key={el.year} className={"sm:col-span-6"}>
                                <h3 className={"font-semibold mb-1"}>
                                    {el.title}
                                </h3>
                                <p>{el.description}</p></div>
                        </li>)}
                    </ul>
                </div>
            </section>
            <section id={"languages"}  className={'mb-24 w-10/12 md:w-full mx-auto'}>
                <div className={"text-lg md:text-xl font-semibold mb-4"}><h2>Languages</h2></div>
                <div>
                    <ul>
                        {languages.map(el => <li
                            key={el.title}
                            className={"\"group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50\""}>
                            <header className={"font-semibold text-sm mt-1"}>
                                {el.title}
                            </header>
                            <div className={"sm:col-span-6"}>
                                <p>{el.description}</p></div>
                        </li>)}
                    </ul>
                </div>
            </section>
        </main>
    </GradientTemplate>
}