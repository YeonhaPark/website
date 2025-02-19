"use client"
import useTypingEffect from "@/hooks/use-typing-effect";

export default function HeroText() {
    const text = useTypingEffect(["Hello! I'm Yeonha,"],  { speed: 130, delay: 0 });
    const text2 = useTypingEffect(["A Web3 frontend engineer based in Seoul"],  { speed: 130, delay: 2400 });

    return <div className="h-32">
        <p className="text-5xl font-semibold text-foreground mb-2 text-stroke">{text}</p>
        <p className={'text-xl text-slate-100 font-[family-name:var(--font-gabarito)]'}>
        {text2}
        </p>
    </div>

}
