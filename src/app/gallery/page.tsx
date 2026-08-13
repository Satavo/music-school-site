import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from Family Music Academy — lessons, recitals, and moments from our studio.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        minimal
        imageSrc="/images/piano.jpg"
        imageAlt="Grand piano in a warmly lit studio"
      />
      <Gallery variant="full" />
    </>
  );
}
