"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
// Load react-globe.gl only on the client to avoid server-side evaluation of window-based
// modules (three-globe / three-conic-polygon-geometry) which cause `window is not defined`.
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div />,
}) as React.ComponentType<Record<string, unknown>>;
import { Button } from "@/components/button";
import { useState } from "react";
export const About = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("yonaprisca@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후에 복사 상태 초기화
  };
  return (
    <section className="c-space my-20">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container items-center">
            <figure className="w-fit overflow-hidden">
              <Image
                src="/assets/profile.webp"
                width={200}
                height={200}
                alt="profile"
                className="w-full sm:h-[276px] h-fit object-contain rounded-lg"
              />
            </figure>
            <div>
              <p className="grid-headtext">Hi, I&apos;m Yeonha</p>
              <p className="grid-subtext">
                I build delightful user interfaces with a focus on delivering
                accessible product experiences.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container items-center">
            <figure className="w-fit overflow-hidden">
              <Image
                src="/assets/grid2.png"
                width={200}
                height={200}
                alt="profile"
                className="w-full sm:h-[276px] h-fit object-contain rounded-lg"
              />
            </figure>
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                {" "}
                My current tech stack includes: React, Next.js, TypeScript,
                Tailwind CSS, Node.js, and Express. I&apos;m always eager to
                learn and explore new tools and frameworks to enhance
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container items-center">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0.5)"
                showAtmosphere
                showGraticules
                globeImageUrl={
                  "//unpkg.com/three-globe/example/img/earth-night.jpg"
                }
                bumpImageUrl={
                  "//unpkg.com/three-globe/example/img/earth-topology.png"
                }
              />
            </div>
            <div>
              <p className="grid-headtext">
                I work remotely across most time zones
              </p>
              <p className="grid-subtext">
                I&apos;m based in Seoul, with remote work available.
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass="w-full mt-10"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-2 xl:row-span-2">
          <div className="grid-container">
            <Image
              src="/assets/grid3.png"
              width={200}
              height={200}
              alt="grid3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love to create and innovate, constantly seeking new challenges
                to enhance my skills and contribute to meaningful projects.
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <Image
              src="/assets/grid4.png"
              width={200}
              height={200}
              alt="grid4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact Me</p>
              <div className="copy-container" onClick={handleCopy}>
                <Image
                  src={copied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                  width={20}
                  height={20}
                  className="inline-block mr-2"
                />
                <p className="md:text-lg font-medium text-gray_gradient text-white">
                  yonaprisca@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
