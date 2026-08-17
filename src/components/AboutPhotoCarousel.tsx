"use client";

import Image from "next/image";
import { useEffect } from "react";
import { CarouselDots } from "@/components/CarouselDots";
import { DIRECTOR } from "@/lib/content";
import { useSwipeCarousel } from "@/lib/use-swipe-carousel";

const photos = DIRECTOR.photos;

const sideBtnClass =
  "hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-transparent text-white transition-all duration-300 hover:bg-white/10 md:flex md:h-10 md:w-10";

export function AboutPhotoCarousel() {
  const { index, go, swipeRef } = useSwipeCarousel(photos.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  return (
    <div>
      <div
        ref={swipeRef}
        className="carousel-swipe relative aspect-[3/4] overflow-hidden rounded-2xl bg-dominant-muted shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-line/15"
        aria-roledescription="carousel"
        aria-label={`Photo ${index + 1} of ${photos.length}`}
      >
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            priority={i === 0}
            unoptimized
            draggable={false}
            sizes="(max-width: 1024px) 90vw, 24rem"
            className={`pointer-events-none object-cover transition-opacity duration-700 ease-out select-none ${photo.objectPosition} ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {photos.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className={sideBtnClass}
            aria-label="Previous photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <CarouselDots
            count={photos.length}
            index={index}
            onSelect={go}
            label="Photo gallery"
            className=""
          />

          <button
            type="button"
            onClick={() => go(index + 1)}
            className={sideBtnClass}
            aria-label="Next photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
