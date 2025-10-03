"use client";
import DomContentLoadListener from "@/components/dom-content-load-listener";
import { JSX } from "react";
import Header from "@/components/header";
export default function GradientTemplate({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <>
      <svg xmlns={"http://www.w3.org/2000/svg"} version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in={"SourceGraphic"}
              stdDeviation={10}
              result={"blur"}
            />
            <feColorMatrix
              in={"blur"}
              mode={"matrix"}
              values={"1 0 0 0 0  0 1 0 0 0  0 0 0 18 -8"}
              result={"goo"}
            />
            <feBlend in={"SourceGraphic"} in2={"goo"} />
          </filter>
        </defs>
      </svg>
      <div className={"gradients-container"}>
        <div className={"g1"}></div>
        <div className={"g2"}></div>
        <div className={"g3"}></div>
        <div className={"interactive"}></div>
      </div>
      <DomContentLoadListener />
      <div
        className={
          "h-full overflow-scroll absolute top-0 left-0 right-0 flex justify-center text-white mx-auto"
        }
      >
        <div
          className={
            "h-full w-full max-w-md lg:max-w-3xl items-center flex flex-col "
          }
        >
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
