import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Curriculum } from "@/components/Curriculum";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Explore the Family Music Academy piano curriculum — from young beginners to advanced students and ABRSM exam preparation.",
};

export default async function CurriculumPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <>
      <PageHero
        from={from}
        minimal
        imageSrc="/images/gallery/sheet-music.jpg"
        imageAlt="Classical sheet music on piano"
      />
      <Curriculum />
      <Contact />
    </>
  );
}
