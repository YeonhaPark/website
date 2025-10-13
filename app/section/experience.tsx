"use client";
import { workExperiences } from "@/constants";
export const Experience = () => {
  return (
    <section
      className="c-space my-20"
      id="experience"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="w-full text-white-600">
        <h3 className="head-text">My Work Experience</h3>
        <div className="work-container">
          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2 5">
              {workExperiences.map((exp) => (
                <div key={exp.name} className="work-content_container group">
                  <div className="sm:p-5 px-2 5 py-5">
                    <p className="font-bold text-white-800">{exp.name}</p>
                    <p className="text-sm mb-5">
                      {exp.pos} -- {exp.year}
                    </p>
                    <p className="group-hover:text-white transition ease-in-out duration-500">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
