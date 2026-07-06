import type { Metadata } from "next";
import { About } from "@/components/About";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About the Director",
  description:
    "Meet the founder and director of Family Music Academy — a third-generation professional musician dedicated to classical piano education.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Meet the"
        titleAccent="Director"
        description="A lifelong musician, educator, and keeper of a three-generation family tradition in classical music."
        imageSrc="/images/about.jpg"
        imageAlt="Director at the piano"
      />
      <About />
    </>
  );
}
