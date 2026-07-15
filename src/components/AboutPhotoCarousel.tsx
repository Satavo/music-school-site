"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { DIRECTOR } from "@/lib/content";

const photos = DIRECTOR.photos;

export function AboutPhotoCarousel() {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dominant-muted shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-secondary/15">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            priority={i === 0}
            unoptimized
            sizes="(max-width: 1024px) 90vw, 24rem"
            className={`object-cover transition-opacity duration-700 ease-out ${photo.objectPosition} ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div
        className="mt-3.5 flex items-center justify-center gap-1.5 opacity-45 transition-opacity duration-300 hover:opacity-80"
        role="tablist"
        aria-label="Photo gallery"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index
                ? "w-4 bg-secondary/50"
                : "w-1 bg-secondary/20 hover:bg-secondary/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
