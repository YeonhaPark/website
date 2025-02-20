"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/tag";

export default function Card({title, usedSkills, github, link, description, src}: {title: string, github: string, link: string, usedSkills: string[], description: string , src: string }) {
    return <div  className={'w-full flex flex-col gap-6 lg:grid lg:grid-cols-3 items-center rounded-sm shadow-xs'}>
        <div style={{position: "relative"}} className={'md:col-span-1 w-10/12 h-64 lg:w-48 lg:h-32 rounded-lg'}>
            <Image  className={"rounded-t-sm w-full "} src={src} alt={title}
                priority={true}
                style={{objectFit: "cover"}}
                fill={true}
               />
        </div>
        <div className={"px-7 md:col-span-2"}>
            <div className={"flex gap-5 mb-2"}>
            <h4 className={"font-semibold font-[family-name:var(--font-gabarito)]"}>{title}</h4>
            <div className="flex gap-3">
                <Link href={github} className={"flex items-center cursor-pointer"} target="_blank" rel="noopener noreferrer">
                <span className={"icon-github"} />
            </Link>
            <Link href={link} className={"flex items-center cursor-pointer"} target="_blank" rel="noopener noreferrer">
                <span className={"icon-link"} />
            </Link>
            </div>
            </div>
            <p className={"text-sm"}>{description}</p>
            <div className={"flex gap-4 mt-4 flex-wrap"}>
                {usedSkills.map((skill: string) => <Tag key={skill} title={skill}/>)}
            </div>
        </div>
    </div>
}