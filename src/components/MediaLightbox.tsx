"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { useOverlayViewport } from "@/lib/overlay-viewport";

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

function LightboxVideo({
  item,
  videoRef,
}: {
  item: MediaLightboxItem;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const localRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = localRef.current;
    if (!video) return;

    if (item.defaultVolume !== undefined) {
      video.volume = Math.min(1, Math.max(0, item.defaultVolume));
    }

    const play = () => {
      void video.play().catch(() => {
        video.muted = true;
        void video.play().catch(() => {});
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      play();
    } else {
      video.addEventListener("loadedmetadata", play, { once: true });
      return () => video.removeEventListener("loadedmetadata", play);
    }
  }, [item.defaultVolume, item.id]);

  return (
    <video
      ref={(node) => {
        localRef.current = node;
        if (videoRef) {
          videoRef.current = node;
        }
      }}
      key={item.id}
      src={item.src}
      poster={item.poster}
      controls
      autoPlay
      playsInline
      className="lightbox-media rounded-2xl"
    >
      Your browser does not support the video tag.
    </video>
  );
}

export function MediaLightbox({
  item,
  isClosing,
  close,
  videoRef,
}: {
  item: MediaLightboxItem;
  isClosing: boolean;
  close: () => void;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const rootRef = useOverlayViewport();

  return (
    <div
      ref={rootRef}
      className="lightbox-root"
      role="dialog"
      aria-modal
      aria-label={item.caption}
    >
      <div
        className={`lightbox-scrim ${
          isClosing ? "animate-lightbox-backdrop-out" : "animate-lightbox-backdrop-in"
        }`}
        aria-hidden="true"
      />
      <div className="lightbox-overlay" onClick={close}>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            close();
          }}
          className="lightbox-close rounded-full bg-white/10 p-2.5 text-secondary-foreground/90 transition-colors hover:bg-white/20 hover:text-secondary-foreground"
          aria-label="Close preview"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div
          className={`lightbox-panel ${
            isClosing ? "animate-lightbox-content-out" : "animate-lightbox-content-in"
          }`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="lightbox-media-shell">
            {item.type === "video" ? (
              <LightboxVideo item={item} videoRef={videoRef} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.alt}
                className="lightbox-media rounded-2xl"
              />
            )}
          </div>
          <p className="lightbox-caption">{item.caption}</p>
        </div>
      </div>
    </div>
  );
}
