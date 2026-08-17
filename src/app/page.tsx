import { AboutContent } from "@/components/AboutContent";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { PoliciesContent } from "@/components/PoliciesContent";
import { WhyAcademy } from "@/components/WhyAcademy";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyAcademy />
      <AboutContent />
      <PoliciesContent />
      <Gallery variant="home" />
    </>
  );
}
