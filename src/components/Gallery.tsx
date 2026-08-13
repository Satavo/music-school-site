"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { GALLERY_ITEMS, getGalleryLatestItems, type GalleryItem } from "@/lib/gallery";

const LIGHTBOX_CLOSE_MS = 220;

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

function useLightbox() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setActiveItem(null);
      setIsClosing(false);
    }, LIGHTBOX_CLOSE_MS);
  }, [isClosing]);

  useEffect(() => {
    if (!activeItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeItem, close]);

  return { activeItem, setActiveItem, isClosing, close };
}

function Lightbox({
  activeItem,
  isClosing,
  close,
}: {
  activeItem: GalleryItem;
  isClosing: boolean;
  close: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md ${
        isClosing ? "animate-lightbox-backdrop-out" : "animate-lightbox-backdrop-in"
      }`}
      onClick={close}
      role="dialog"
      aria-modal
      aria-label={activeItem.caption}
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
        className={`relative flex max-h-[90vh] w-full max-w-4xl flex-col items-center ${
          isClosing ? "animate-lightbox-content-out" : "animate-lightbox-content-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {activeItem.type === "video" ? (
          <video
            key={activeItem.id}
            src={activeItem.src}
            poster={activeItem.poster}
            controls
            autoPlay
            playsInline
            className="mx-auto block max-h-[75vh] w-full rounded-2xl object-contain"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            className="mx-auto block max-h-[75vh] w-full rounded-2xl object-contain"
          />
        )}
        <p className="mt-4 px-2 text-center text-base text-white/90">
          {activeItem.caption}
        </p>
      </div>
    </div>
  );
}

function GalleryGrid({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}) {
  return (
    <AnimateIn motion="fade" className="mt-14">
      <div className="columns-2 gap-4 md:columns-3 lg:gap-5">
        {items.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid md:mb-5">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
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
    </AnimateIn>
  );
}

export function Gallery({ variant = "home" }: GalleryProps) {
  const isHome = variant === "home";
  const items = isHome ? getGalleryLatestItems() : GALLERY_ITEMS;
  const { activeItem, setActiveItem, isClosing, close } = useLightbox();

  return (
    <section
      id={isHome ? "gallery" : undefined}
      className="relative overflow-x-hidden section-pad bg-dominant-surface"
    >
      <div className="relative z-[2] section-shell">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Gallery</p>
          <h2 className="section-title">Photo & Video</h2>
          <p className="section-lead mt-4">
            Lessons, recitals, and moments from our studio.
          </p>
        </AnimateIn>
      </div>

      <div className="relative z-[2] section-shell mt-8">
        <GalleryGrid items={items} onSelect={setActiveItem} />
      </div>

      {activeItem && <Lightbox activeItem={activeItem} isClosing={isClosing} close={close} />}
    </section>
  );
}
