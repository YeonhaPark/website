"use client"
import React from "react";
import Image from "next/image";

export default function Card({title, description, src, alt}: {title: string, description: string , src: string, alt: string}) {
    return <div  className={'w-80 flex flex-col items-center pb-6 bg-gray-50 rounded-lg shadow-xs'}>
        <div style={{position: "relative"}} className={'w-80 h-60 rounded-lg'}>

        <Image  className={"rounded-t-lg"} src={src} alt={alt}
                priority={true}
                style={{objectFit: "cover"}}
            fill={true}
               />
        </div>
        <div className={"px-6"}>
            <h4 className={"font-semibold mt-2 font-[family-name:var(--font-gabarito)]"}>{title}</h4>
            <p className={"text-sm"}>{description}</p>
        </div>
    </div>
}