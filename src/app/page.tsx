import { AboutContent } from "@/components/AboutContent";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { PoliciesContent } from "@/components/PoliciesContent";
import { WhyAcademy } from "@/components/WhyAcademy";
import { getGalleryLatestItems } from "@/lib/gallery";

export default async function Home() {
  const galleryItems = await getGalleryLatestItems();

  return (
    <>
      <Hero />
      <WhyAcademy />
      <AboutContent />
      <PoliciesContent />
      <Gallery variant="home" items={galleryItems} />
    </>
  );
}
