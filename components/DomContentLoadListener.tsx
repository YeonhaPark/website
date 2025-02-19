"use client";

import { useEffect } from "react";

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

const DOMContentLoadedListener = () => {
    useEffect(() => {
    const interBubble: HTMLElement = document.querySelector('.interactive')!
    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        if (!interBubble) {
            console.warn("no interBubble detected");
        } else {
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(move)
        }
    }
        const handleDOMContentLoaded = (event:MouseEvent) => {
            tgX = event.clientX;
            tgY = event.clientY;
        }; 

        document.addEventListener("mousemove", handleDOMContentLoaded);

        move();
        return () => {
            document.removeEventListener("mousemove", handleDOMContentLoaded);
        };

        // 원하는 추가 로직을 여기에 작성 가능
    }, []);
    return null; // UI를 렌더링할 필요 없으므로 null 반환
    
};

export default DOMContentLoadedListener;
