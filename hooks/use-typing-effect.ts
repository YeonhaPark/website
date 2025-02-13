import { useState, useEffect } from "react";

interface TypingEffectOptions {
    speed?: number;
    delay?: number; // 시작 지연 시간 (밀리초)
}

function useTypingEffect(texts: string[], { speed = 100, delay = 0 }: TypingEffectOptions = {}) {
    const [displayedText, setDisplayedText] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        const handleTyping = () => {
            if (index === texts.length - 1) {
                setIndex(0);
            }
            if (!isDeleting && typingIndex < texts[index].length) {
                setDisplayedText(texts[index].slice(0, typingIndex + 1));
                setTypingIndex(typingIndex + 1);
            } else if (isDeleting && typingIndex > 0) {
                setDisplayedText(texts[index].slice(0, typingIndex - 1));
                setTypingIndex(typingIndex - 1);
            } else if (isDeleting && typingIndex === 0) {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [typingIndex, isDeleting, texts, speed, index, isStarted]);

    return displayedText;
}

export default useTypingEffect;
