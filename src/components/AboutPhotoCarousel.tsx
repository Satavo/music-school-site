import Image from "next/image";
import { DIRECTOR } from "@/lib/content";

export function AboutPhotoCarousel() {
  const photo = DIRECTOR.photos[0];

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dominant-muted shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-line/15">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 90vw, 24rem"
        className={`object-cover ${photo.objectPosition}`}
      />
    </div>
  );
}
