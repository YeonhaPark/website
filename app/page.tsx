import SectionTemplate from "@/components/section-template";
import Card from "@/components/card";
import HeroText from "@/components/hero-text";
import { sideProjects } from "@/constants";
import React from "react";
import GradientTemplate from "@/components/gradient-template";
import Footer from "@/components/footer";
import ArticleList from "@/components/article-list";
import { getSortedArticles } from "@/lib/articles";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
export default function Home() {
  const articles = getSortedArticles().slice(0, 3);

  return (
    <>
      <Hero />
      <About />
    </>
  );
}
