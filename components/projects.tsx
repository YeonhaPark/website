"use client";
import Image from "next/image";
import { myProjects } from "@/constants";
import { useState } from "react";
export const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProject = myProjects[selectedProjectIndex];
  const handleNavigation = (direction: "previous" | "next") => {
    // 여기에 이전 또는 다음 프로젝트로 이동하는 로직을 구현하세요.
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };
  return (
    <section className="c-space my-20">
      <p className="head-text">My Work</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <Image
              src={currentProject.spotlight}
              width={150}
              height={150}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <Image
              src={currentProject.logo}
              width={80}
              height={80}
              alt="project logo"
              className="w-20 h-20 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>
            <p className="animatedText">{currentProject.description}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.usedSkills.map((skill) => (
                <div key={skill.name} className="tech-logo">
                  <Image
                    src={skill.path}
                    alt={skill.name}
                    fill
                    className="w-5 h-5"
                  />
                </div>
              ))}
            </div>
            <a
              href={currentProject.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer text-white-600"
            >
              <p>Link</p>
              <Image
                src="/assets/arrow-up.png"
                alt="arrow"
                className="w-3 h-3 object-contain"
                width={12}
                height={12}
              />
            </a>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <Image
                src={"/assets/left-arrow.png"}
                alt="arrow"
                width={20}
                height={20}
              />
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <Image
                src={"/assets/right-arrow.png"}
                alt="arrow"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
