import React from "react";

export default function Footer() {
    return <footer className="mt-20 py-5 row-start-3 flex gap-6 flex-wrap items-center justify-center text-xs">
      <div className={"flex gap-4"}>
          <a href="https://github.com/YeonhaPark" target={"_blank"} rel={"noreferrer"}>
          <span className={"icon-github"}/></a>
          <a href="https://www.linkedin.com/in/yonapark/" target={"_blank"} rel={"noreferrer"}>
          <span className={"icon-linkedin"}/></a>
      </div>
       © 2025 Park Yeonha
    </footer>
}