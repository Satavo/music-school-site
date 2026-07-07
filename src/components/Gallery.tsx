"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { GALLERY_IMAGES, getGalleryPreviewImages } from "@/lib/content";
import { pageHref } from "@/lib/navigation";

type GalleryImage = (typeof GALLERY_IMAGES)[number];

const LIGHTBOX_CLOSE_MS = 220;

type GalleryProps = {
  variant?: "preview" | "full";
};

export function Gallery({ variant = "preview" }: GalleryProps) {
  const isPreview = variant === "preview";
  const images = isPreview ? getGalleryPreviewImages() : GALLERY_IMAGES;
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setActiveImage(null);
      setIsClosing(false);
    }, LIGHTBOX_CLOSE_MS);
  }, [isClosing]);

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
    <section
      id={isPreview ? "gallery" : undefined}
      className={`surface-dominant-muted relative ${isPreview ? "py-24 md:py-32" : "py-16 md:py-24"}`}
    >
      <div className="relative z-[2] mx-auto max-w-6xl px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Life at the Academy</p>
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-lead mt-6">
            {isPreview
              ? "A glimpse into lessons, recitals, and our vibrant musical community."
              : "Moments from lessons, recitals, and our vibrant musical community."}
          </p>
        </AnimateIn>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {images.map((image, index) => (
            <AnimateIn key={image.id} delay={index * 80}>
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-secondary-dark/0 transition-colors duration-300 group-hover:bg-secondary-dark/15" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-4 py-5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  <p className="text-sm font-medium text-white/90">{image.caption}</p>
                </div>
              </button>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={120}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {isPreview && (
              <Link href={pageHref("/gallery", "gallery")} className="btn-secondary-dark">
                View Full Gallery
              </Link>
            )}
            <ContactLink className="btn-primary">Book a Lesson</ContactLink>
          </div>
        </AnimateIn>
      </div>

      {activeImage && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-secondary-dark/92 p-4 backdrop-blur-md ${
            isClosing ? "animate-lightbox-backdrop-out" : "animate-lightbox-backdrop-in"
          }`}
          onClick={close}
          role="dialog"
          aria-modal
          aria-label={activeImage.caption}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-2.5 text-secondary-foreground/90 transition-colors hover:bg-white/20 hover:text-secondary-foreground"
            aria-label="Close preview"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className={`relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-secondary-dark/80 shadow-2xl backdrop-blur-sm ${
              isClosing ? "animate-lightbox-content-out" : "animate-lightbox-content-in"
            }`}
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
