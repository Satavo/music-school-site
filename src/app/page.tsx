import { AboutContent } from "@/components/AboutContent";
import { CurriculumContent } from "@/components/CurriculumContent";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { PoliciesContent } from "@/components/PoliciesContent";
import { WhyAcademy } from "@/components/WhyAcademy";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyAcademy />
      <CurriculumContent />
      <PoliciesContent />
      <AboutContent />
      <Gallery variant="home" />
    </>
  );
}
