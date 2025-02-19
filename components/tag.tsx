"use client"
import React from "react";
export default function Tag({title}: {title: string}) {
    return <span className="w-fit whitespace-nowrap rounded-lg text-purple-400 text-xs py-1 px-2 border border-purple-400">{title}</span>
}