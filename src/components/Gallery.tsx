"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ContactLink } from "@/components/ContactLink";
import { MediaLightbox } from "@/components/MediaLightbox";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { GALLERY_ITEMS, getGalleryLatestItems, type GalleryItem } from "@/lib/gallery";

type GalleryProps = {
  variant?: "home" | "full";
};

function PlayBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const icon = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span
        className={`flex items-center justify-center rounded-full bg-secondary-dark/70 text-secondary-foreground shadow-lg ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 ${box}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={`ml-0.5 ${icon}`} aria-hidden>
          <path d="M8 5.14v13.72L19 12 8 5.14z" />
        </svg>
      </span>
    </span>
  );
}

function MediaThumb({
  item,
  className = "",
  playing = false,
}: {
  item: GalleryItem;
  className?: string;
  playing?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.type !== "video") return;

    if (playing) {
      void video.play().catch(() => {});
    } else {
      video.pause();
      if (video.currentTime < 0.1) video.currentTime = 0.5;
    }
  }, [playing, item.type]);

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.src} alt={item.alt} loading="lazy" className={className} />
  );
}

const LIGHTBOX_CLOSE_MS = 220;

function useGalleryLightbox() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    if (isClosing || !activeItem) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setActiveItem(null);
      setIsClosing(false);
    }, LIGHTBOX_CLOSE_MS);
  }, [activeItem, isClosing]);

  useEffect(() => {
    if (!activeItem) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeItem, close]);

  return { activeItem, setActiveItem, isClosing, close };
}

function GalleryGrid({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}) {
  return (
    <div className="mt-14 columns-2 gap-4 md:columns-3 lg:gap-5">
        {items.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid md:mb-5">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-line focus-visible:ring-offset-2"
            >
              <MediaThumb
                item={item}
                className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-secondary-dark/0 transition-colors duration-300 group-hover:bg-secondary-dark/15" />
              {item.type === "video" && <PlayBadge />}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-4 py-5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                <p className="text-sm font-medium text-white/90">
                  {item.type === "video" ? `Video · ${item.caption}` : item.caption}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
  );
}

export function Gallery({ variant = "home" }: GalleryProps) {
  const isHome = variant === "home";
  const items = isHome ? getGalleryLatestItems() : GALLERY_ITEMS;
  const { activeItem, setActiveItem, isClosing, close } = useGalleryLightbox();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id={isHome ? "gallery" : undefined}
      className="relative overflow-x-hidden section-pad bg-dominant"
    >
      <SectionReveal motion="fade">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <SectionTitle underline={false}>Photo & Video</SectionTitle>
            <p className="section-lead mt-4">
              Lessons, recitals, and moments from our studio.
            </p>
          </div>
        </div>

        <div className="section-shell">
          <GalleryGrid items={items} onSelect={setActiveItem} />
        </div>
      </SectionReveal>

      {isHome && (
        <div className="section-shell mt-12 flex justify-center sm:mt-14">
          <ContactLink className="btn-primary-static">Get in Touch</ContactLink>
        </div>
      )}

      {mounted &&
        activeItem &&
        createPortal(
          <MediaLightbox item={activeItem} isClosing={isClosing} close={close} />,
          document.body,
        )}
    </section>
  );
}
