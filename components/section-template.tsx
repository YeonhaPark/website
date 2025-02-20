"use client"
import React from "react";

export default function SectionTemplate({
    title, children }: Readonly<{
    title: string,
    children: React.ReactNode;
}>){
    return <section className={"pb-14 m-auto"}>
        <h1 className={"text-3xl font-semibold text-foreground mb-8"}>{title}</h1>
        {children}
    </section>
}
