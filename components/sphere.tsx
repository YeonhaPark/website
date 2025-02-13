"use client"
import React, { useEffect, useRef } from "react";

const GradientSphere = ({size}: { size: 'sm' | 'md' | 'lg' }) => {

    const ball = {
        'sm': 'w-28 h-28 sphere-sm',
        'md': 'w-32 h-32 sphere-md',
        'lg': 'w-44 h-44 sphere-lg'
    }
    const sphereRef = useRef<HTMLDivElement | null>(null);
    const velocity = useRef({x: 0, y: 0});
    const position = useRef({x: 0, y: 0});
    const lastMouse = useRef({x: 0, y: 0});
    const isMoving = useRef(false);
    useEffect(() => {
        let damping = 0.95; // Reduces velocity over time
        let minVelocity = 3.5; // Minimum force applied
        let maxForce = 30; // Limits max force
        let animationFrame: number;
        let bounceFacctor = 1.1;
        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // 커서 속도 계산
            const speedX = mouseX - lastMouse.current.x;
            const speedY = mouseY - lastMouse.current.y;
            lastMouse.current = {x: mouseX, y: mouseY};

            if (sphereRef.current) {
                const sphere = sphereRef.current;
                const rect = sphere.getBoundingClientRect();
                const sphereX = rect.left + rect.width / 2;
                const sphereY = rect.top + rect.height / 2;
                const radius = rect.width / 2;

                const distX = mouseX - sphereX;
                const distY = mouseY - sphereY;
                const distance = Math.sqrt(distX ** 2 + distY ** 2);

                // 📌 **커서가 절대 원 안으로 들어갈 수 없음**
                if (distance < radius) {
                    isMoving.current = true;

                    // 정규화된 방향 벡터
                    const normalX = distX / distance;
                    const normalY = distY / distance;

                    // 속도 제한을 둔 힘 계산 (너무 빠른 속도 방지)
                    const forceX = Math.max(Math.min(speedX * 0.8, maxForce), -maxForce);
                    const forceY = Math.max(Math.min(speedY * 0.8, maxForce), -maxForce);

                    // 최소 반발력 적용 (방향성 유지)
                    velocity.current = {
                        x: forceX + normalX * minVelocity * (forceX > 0 ? 1 : -1),
                        y: forceY + normalY * minVelocity * (forceY > 0 ? 1 : -1),
                    };

                    // 반발력 적용 후 움직이기
                    position.current.x += velocity.current.x * bounceFacctor;
                    position.current.y += velocity.current.y * bounceFacctor;

                    sphere.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
                }
            }
        };

        const animate = () => {
            if (isMoving.current && sphereRef.current) {
                // Apply damping for smooth stop
                velocity.current.x *= damping;
                velocity.current.y *= damping;

                position.current.x += velocity.current.x;
                position.current.y += velocity.current.y;

                // If velocity is almost zero, stop moving
                if (Math.abs(velocity.current.x) < 0.5 && Math.abs(velocity.current.y) < 0.5) {
                    isMoving.current = false;
                }

                const mainElement = document.querySelector("main")!;
                const mainRect = mainElement.getBoundingClientRect();

                // Constrain the ball inside the main element bounds
                if (mainRect) {
                    const sphere = sphereRef.current;
                    const rect = sphere.getBoundingClientRect();
                    const minX = 0;
                    const minY = 0;
                    const maxX = mainRect.width - rect.width;
                    const maxY = mainRect.height - rect.height;

                    // Constrain the position to the boundaries of the parent 'main' tag
                    position.current.x = Math.min(Math.max(position.current.x, minX), maxX);
                    position.current.y = Math.min(Math.max(position.current.y, minY), maxY);

                    // 📌 **Check if the sphere is inside the cursor**
                    const sphereX = position.current.x + rect.width / 2;
                    const sphereY = position.current.y + rect.height / 2;
                    const cursorX = lastMouse.current.x;
                    const cursorY = lastMouse.current.y;

                    const distX = cursorX - sphereX;
                    const distY = cursorY - sphereY;
                    const distance = Math.sqrt(distX ** 2 + distY ** 2);

                    // 📌 **Prevent the cursor from entering the sphere**
                    if (distance < rect.width / 2) {
                        const angle = Math.atan2(distY, distX);
                        const pushX = Math.cos(angle) * (rect.width / 2 - distance);
                        const pushY = Math.sin(angle) * (rect.width / 2 - distance);

                        position.current.x += pushX;
                        position.current.y += pushY;
                    }
                }

                sphereRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
            }
            animationFrame = requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", handleMouseMove);
        animationFrame = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);
    return <div
        ref={sphereRef}
        className={`${ball[size]} ${ball[size]} rounded-full`}
    ></div>
};

export default GradientSphere;
