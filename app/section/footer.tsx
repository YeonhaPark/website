import Image from "next/image";
import Link from "next/link";
export const Footer = () => {
  return (
    <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-3">
        <div className="social-icon">
          <Link
            href="https://github.com/YeonhaPark"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/github.svg"
              alt="github"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </Link>
        </div>
        <div className="social-icon">
          <Link
            href="https://www.linkedin.com/in/yonapark/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/linkedin.svg"
              alt="github"
              width={20}
              height={20}
              className="w-5 h-5"
            />{" "}
          </Link>
        </div>
      </div>
      <p className="text-white-500">© 2025 Yeonha Park. All rights reserved.</p>
    </section>
  );
};
