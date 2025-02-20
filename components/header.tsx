"use client"

import Link from "next/link";
export default function Header() {
    return (<header
        className="p-6 sm:px-6 lg:px-10 self-end text-foreground font-[family-name:var(--font-work-sans)] font-medium">
        <li className={"flex gap-4"}>
            <Link href="/">Home</Link>
            <Link href="/resume">Information</Link>
            <Link href="/posts">Posts</Link>
        </li>
        {/*<ThemeToggle />*/}
    </header>)
}