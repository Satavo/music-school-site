"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { GALLERY_IMAGES } from "@/lib/content";

type GalleryImage = (typeof GALLERY_IMAGES)[number];

const MASONRY_CLASS: Record<GalleryImage["size"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export function Gallery() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const close = useCallback(() => setActiveImage(null), []);

  useEffect(() => {
    if (!activeImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeImage, close]);

  return (
    <section id="gallery" className="surface-dominant-muted py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Life at the Academy</p>
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-lead mt-6">
            Moments from lessons, recitals, and our vibrant musical community.
          </p>
        </AnimateIn>

        <div className="masonry-grid mt-14">
          {GALLERY_IMAGES.map((image, index) => (
            <AnimateIn key={image.id} delay={index * 80} className="masonry-item">
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${MASONRY_CLASS[image.size]}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-secondary-dark/0 transition-colors duration-300 group-hover:bg-secondary-dark/15" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-4 py-5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  <p className="text-sm font-medium text-white/90">{image.caption}</p>
                </div>
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary-dark/92 p-4 backdrop-blur-md animate-fade-up"
          onClick={close}
          role="dialog"
          aria-modal
          aria-label={activeImage.caption}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-2.5 text-secondary-foreground/90 hover:bg-white/20 hover:text-secondary-foreground"
            aria-label="Close preview"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-secondary-dark/80 shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="mx-auto block max-h-[75vh] w-full object-contain"
            />
            <p className="border-t border-white/10 px-6 py-4 text-center text-base text-secondary-foreground/90">
              {activeImage.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
