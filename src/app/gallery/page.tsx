import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { getGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from Family Music Academy — lessons, recitals, and moments from our studio.",
};

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      <PageHero
        minimal
        imageSrc="/images/piano.jpg"
        imageAlt="Grand piano in a warmly lit studio"
      />
      <Gallery variant="full" items={galleryItems} />
    </>
  );
}
