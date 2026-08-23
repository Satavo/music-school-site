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

const LIGHTBOX_CLOSE_MS = 280;
const LIGHTBOX_SWIPE_THRESHOLD = 36;

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
  deferPlayback = false,
}: {
  item: MediaLightboxItem;
  videoRef?: RefObject<HTMLVideoElement | null>;
  deferPlayback?: boolean;
}) {
  const localRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (deferPlayback) return;

    const video = localRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (!video.paused && video.currentTime > 0 && !video.ended) return;

      video.muted = false;
      if (item.defaultVolume !== undefined) {
        video.volume = Math.min(1, Math.max(0, item.defaultVolume));
      }

      void video.play().catch(() => {
        // Keep controls unmuted if autoplay is blocked.
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
      return;
    }

    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, [deferPlayback, item.defaultVolume, item.id]);

  useEffect(() => {
    const video = localRef.current;
    if (!video) return;

    setIsLoading(true);

    const markReady = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setIsLoading(false);
      }
    };

    const markLoading = () => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        setIsLoading(true);
      }
    };

    markReady();
    video.addEventListener("loadstart", markLoading);
    video.addEventListener("waiting", markLoading);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);

    return () => {
      video.removeEventListener("loadstart", markLoading);
      video.removeEventListener("waiting", markLoading);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
    };
  }, [item.id]);

  return (
    <div className="lightbox-video-shell">
      {isLoading ? (
        <div className="lightbox-video-loader" aria-hidden>
          <div className="hero-load-spinner" />
        </div>
      ) : null}
      <video
        ref={(node) => {
          localRef.current = node;
          if (videoRef) {
            videoRef.current = node;
          }
        }}
        key={item.id}
        src={item.src}
        controls
        playsInline
        preload="auto"
        className={`lightbox-media rounded-2xl transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function LightboxNavButton({
  direction,
  onClick,
  isClosing,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  isClosing: boolean;
}) {
  const label = direction === "prev" ? "Previous photo" : "Next photo";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={label}
      aria-hidden={isClosing}
      tabIndex={isClosing ? -1 : 0}
      className={`lightbox-nav lightbox-nav-${direction} ${
        isClosing ? "lightbox-nav-hidden" : "lightbox-nav-visible"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        {direction === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

function useLightboxSwipe(onPrevious?: () => void, onNext?: () => void) {
  const swipeRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = swipeRef.current;
    if (!element || (!onPrevious && !onNext)) return;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start) return;

      const touch = event.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8 && event.cancelable) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (Math.abs(deltaX) < LIGHTBOX_SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      if (deltaX > 0) {
        onPrevious?.();
      } else {
        onNext?.();
      }
    };

    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchmove", onTouchMove, { passive: false });
    element.addEventListener("touchend", onTouchEnd, { passive: true });
    element.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
      element.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [onNext, onPrevious]);

  return swipeRef;
}

function LightboxSlideFrame({
  item,
  slideDirection,
  videoRef,
  deferVideoPlayback = false,
}: {
  item: MediaLightboxItem;
  slideDirection?: "prev" | "next" | null;
  videoRef?: RefObject<HTMLVideoElement | null>;
  deferVideoPlayback?: boolean;
}) {
  const slideClass =
    slideDirection === "next"
      ? "lightbox-slide-next"
      : slideDirection === "prev"
        ? "lightbox-slide-prev"
        : "";

  return (
    <div key={item.id} className={`lightbox-slide-frame ${slideClass}`.trim()}>
      <div className="lightbox-media-shell">
        {item.type === "video" ? (
          <LightboxVideo item={item} videoRef={videoRef} deferPlayback={deferVideoPlayback} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.alt} className="lightbox-media rounded-2xl" />
        )}
      </div>
      <div className="lightbox-caption-row">
        <p className="lightbox-caption">{item.caption}</p>
      </div>
    </div>
  );
}

export function MediaLightbox({
  item,
  isClosing,
  close,
  videoRef,
  onPrevious,
  onNext,
  positionLabel,
  slideDirection = null,
  deferVideoPlayback = false,
}: {
  item: MediaLightboxItem;
  isClosing: boolean;
  close: () => void;
  videoRef?: RefObject<HTMLVideoElement | null>;
  onPrevious?: () => void;
  onNext?: () => void;
  positionLabel?: string;
  slideDirection?: "prev" | "next" | null;
  deferVideoPlayback?: boolean;
}) {
  const rootRef = useOverlayViewport();
  const swipeRef = useLightboxSwipe(onPrevious, onNext);
  const canNavigate = Boolean(onPrevious || onNext);

  useEffect(() => {
    if (!canNavigate) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious?.();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext?.();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canNavigate, onNext, onPrevious]);

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
      <div ref={swipeRef} className="lightbox-overlay" onClick={close}>
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

        {onPrevious ? (
          <LightboxNavButton direction="prev" onClick={onPrevious} isClosing={isClosing} />
        ) : null}
        {onNext ? (
          <LightboxNavButton direction="next" onClick={onNext} isClosing={isClosing} />
        ) : null}

        <div
          className={`lightbox-panel ${
            isClosing ? "animate-lightbox-content-out" : "animate-lightbox-content-in"
          }`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="lightbox-slide-viewport">
            <LightboxSlideFrame
              item={item}
              slideDirection={canNavigate ? slideDirection : null}
              videoRef={videoRef}
              deferVideoPlayback={deferVideoPlayback}
            />
          </div>
          {positionLabel ? (
            <p className="lightbox-position" aria-live="polite">
              {positionLabel}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
