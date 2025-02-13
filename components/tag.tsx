"use client"
import React from "react";
export default function Tag({title}: {title: string}) {
    return <span className="rounded-lg bg-[#DFE6F5] text-xs py-1 px-2 bg-gray-200">{title}</span>
}