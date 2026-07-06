import type { Metadata } from "next";
import { Curriculum } from "@/components/Curriculum";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Explore the Family Music Academy piano curriculum — from young beginners to advanced students and ABRSM exam preparation.",
};

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        eyebrow="Curriculum"
        title="Our"
        titleAccent="Curriculum"
        description="Structured, individualized piano instruction designed for every age and stage — from first notes to competition-ready performance."
        imageSrc="/images/gallery/sheet-music.jpg"
        imageAlt="Classical sheet music on piano"
      />
      <Curriculum />
    </>
  );
}
