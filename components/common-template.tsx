"use client"
import Footer from "@/components/footer";
import {JSX} from "react";
export default function CommonTemplate({ children }: {children: JSX.Element}) {
    return <div className={'h-full overflow-scroll absolute top-0 left-0 right-0 flex justify-center text-white mx-auto'}>
            <div className={"h-full w-full max-w-md lg:max-w-2xl items-center flex flex-col "}>
                <header
                    className="p-6 sm:px-6 lg:px-10 self-end text-foreground font-[family-name:var(--font-work-sans)] font-medium">
                    <li className={"flex gap-4"}>
                        <a href="/">Home</a>
                        <a href="/resume">Information</a>
                        <a href="/posts">Posts</a>
                    </li>
                </header>
                {children}
            </div>
        <Footer />
        </div>

}