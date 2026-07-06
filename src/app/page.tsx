import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { WhyAcademy } from "@/components/WhyAcademy";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyAcademy />
      <Gallery />
      <Contact />
    </>
  );
}
