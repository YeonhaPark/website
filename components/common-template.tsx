"use client";
import Footer from "@/components/footer";
import { JSX } from "react";
import Header from "@/components/header";
export default function CommonTemplate({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <div
      className={
        "h-full overflow-scroll absolute top-0 left-0 right-0 flex justify-center text-white mx-auto"
      }
    >
      <div
        className={
          "h-full w-full max-w-md lg:max-w-2xl items-center flex flex-col "
        }
      >
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}
