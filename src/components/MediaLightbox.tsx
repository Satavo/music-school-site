"use client";

import { useCallback, useEffect, useState } from "react";

export type MediaLightboxItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  /** 0–1; defaults to browser default (usually 1) when omitted */
  defaultVolume?: number;
};

const LIGHTBOX_CLOSE_MS = 220;

export function useMediaLightbox() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const show = useCallback(() => {
    setIsClosing(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    if (isClosing || !open) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, LIGHTBOX_CLOSE_MS);
  }, [isClosing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return { open, isClosing, show, close };
}

export function MediaLightbox({
  item,
  isClosing,
  close,
}: {
  item: MediaLightboxItem;
  isClosing: boolean;
  close: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal
      aria-label={item.caption}
    >
      <button
        type="button"
        className={`absolute inset-0 cursor-default bg-black/80 backdrop-blur-md ${
          isClosing ? "animate-lightbox-backdrop-out" : "animate-lightbox-backdrop-in"
        }`}
        onClick={close}
        aria-label="Close preview"
      />
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
        className={`relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col items-center ${
          isClosing ? "animate-lightbox-content-out" : "animate-lightbox-content-in"
        }`}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            key={item.id}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            onLoadedMetadata={(event) => {
              if (item.defaultVolume !== undefined) {
                event.currentTarget.volume = Math.min(1, Math.max(0, item.defaultVolume));
              }
            }}
            className="mx-auto block max-h-[75vh] w-full rounded-2xl object-contain"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            className="mx-auto block max-h-[75vh] w-full rounded-2xl object-contain"
          />
        )}
        <p className="mt-4 px-2 text-center text-base text-white/90">{item.caption}</p>
      </div>
    </div>
  );
}
