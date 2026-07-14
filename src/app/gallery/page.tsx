import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from Family Music Academy — lessons, recitals, and moments from our musical community.",
};

export default async function GalleryPage({
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
        imageSrc="/images/piano.jpg"
        imageAlt="Grand piano in a warmly lit studio"
      />
      <Gallery variant="full" />
      <Contact />
    </>
  );
}
