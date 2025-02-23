"use client"
import useTypingEffect from "@/hooks/use-typing-effect";

export default function HeroText() {
    const text1 = useTypingEffect(["Hello!"],  { speed: 130, delay: 0 });
    const text2 = useTypingEffect(["I'm Yeonha,"],  { speed: 130, delay: 1100 });
    const text3 = useTypingEffect(["A Web3 frontend engineer based in Seoul"],  { speed: 130, delay: 2800 });

    return <div className="min-h-[140px] md:min-h-[144px] lg:min-h-[90px] md:h-auto mt-10 mb-8">
        <div className="flex flex-col gap-3 lg:flex-row text-5xl font-semibold text-foreground mb-2 text-stroke font-[family-name:var(--font-work-sans)]">
            <div>{text1}</div>
            <div>{text2}</div>
        </div>

        <p className={'text-base font-semibold md:text-xl text-slate-100 font-[family-name:var(--font-wix-madefor-text)]'}>
        {text3}
        </p>
    </div>


}
