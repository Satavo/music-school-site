"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { GALLERY_ITEMS, getGalleryPreviewImages, type GalleryItem } from "@/lib/gallery";
import { pageHref } from "@/lib/navigation";

const LIGHTBOX_CLOSE_MS = 220;

type GalleryProps = {
  variant?: "preview" | "full";
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

const CAROUSEL_SLOTS: Record<
  number,
  { x: string; scale: number; opacity: number; z: number }
> = {
  [-2]: { x: "-118%", scale: 0.7, opacity: 1, z: 10 },
  [-1]: { x: "-68%", scale: 0.84, opacity: 1, z: 20 },
  [0]: { x: "0%", scale: 1, opacity: 1, z: 30 },
  [1]: { x: "68%", scale: 0.84, opacity: 1, z: 20 },
  [2]: { x: "118%", scale: 0.7, opacity: 1, z: 10 },
};

function GalleryCarousel({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}) {
  const initialIndex = Math.max(
    0,
    items.findIndex((item) => item.type === "video"),
  );
  const [index, setIndex] = useState(initialIndex);
  const count = items.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (count === 0) return null;

  const sideBtnClass =
    "absolute top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/20 bg-dominant-surface/95 text-secondary shadow-md backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground md:h-12 md:w-12";

  return (
    <div className="relative mx-auto w-full max-w-5xl px-12 md:px-14 xl:max-w-[58rem]">
      <button type="button" onClick={() => go(-1)} className={`${sideBtnClass} left-2 md:left-3`} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button type="button" onClick={() => go(1)} className={`${sideBtnClass} right-2 md:right-3`} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="relative mx-auto flex h-[20rem] w-full max-w-[16rem] items-center justify-center sm:h-[24rem] sm:max-w-[20rem] md:h-[28rem] md:max-w-[24rem] lg:h-[30rem] lg:max-w-[26rem]">
        {items.map((item, i) => {
          let rel = i - index;
          if (rel > Math.floor(count / 2)) rel -= count;
          if (rel < -Math.floor(count / 2)) rel += count;

          const slot = CAROUSEL_SLOTS[rel];
          const visible = Boolean(slot);
          const isCenter = rel === 0;

          return (
            <button
              key={item.id}
              type="button"
              tabIndex={isCenter ? 0 : -1}
              aria-hidden={!visible}
              aria-label={item.type === "video" ? `Video: ${item.caption}` : item.caption}
              onClick={() => {
                if (isCenter) onSelect(item);
                else if (visible) setIndex(i);
              }}
              className={`group absolute inset-0 overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(61,24,35,0.14)] ring-1 ring-secondary/10 transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary hover:ring-secondary/25 hover:shadow-[0_14px_40px_rgba(61,24,35,0.2)] ${
                isCenter ? "cursor-zoom-in" : visible ? "cursor-pointer" : "pointer-events-none"
              }`}
              style={{
                transform: slot
                  ? `translateX(${slot.x}) scale(${slot.scale})`
                  : "translateX(0) scale(0.6)",
                opacity: slot ? slot.opacity : 0,
                zIndex: slot ? slot.z : 0,
              }}
            >
              <MediaThumb
                item={item}
                playing={isCenter && item.type === "video"}
                className="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-secondary-dark/0 transition-colors duration-300 group-hover:bg-secondary-dark/8" />
            </button>
          );
        })}
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

export function Gallery({ variant = "preview" }: GalleryProps) {
  const isPreview = variant === "preview";
  const items = isPreview ? getGalleryPreviewImages() : GALLERY_ITEMS;
  const { activeItem, setActiveItem, isClosing, close } = useLightbox();

  return (
    <section
      id={isPreview ? "gallery" : undefined}
      className={`relative overflow-x-hidden ${
        isPreview
          ? "surface-dominant-muted py-24 md:py-32"
          : "bg-dominant-surface py-16 md:py-24"
      }`}
    >
      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Gallery</p>
          <h2 className="section-title">Photo & Video Gallery</h2>
          <p className="section-lead mt-6">
            Lessons, recitals, and moments from our studio.
          </p>
        </AnimateIn>
      </div>

      <div className={`relative z-[2] ${isPreview ? "mt-14" : "mx-auto mt-14 max-w-7xl px-6"}`}>
        {isPreview ? (
          <AnimateIn>
            <GalleryCarousel items={items} onSelect={setActiveItem} />
          </AnimateIn>
        ) : (
          <GalleryGrid items={items} onSelect={setActiveItem} />
        )}
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-6">
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

      {activeItem && <Lightbox activeItem={activeItem} isClosing={isClosing} close={close} />}
    </section>
  );
}
