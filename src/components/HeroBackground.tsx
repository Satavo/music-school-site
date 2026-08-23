"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHeroLoad } from "@/components/HeroLoadGate";
import { HERO_BACKGROUND_VIDEO_SRC } from "@/lib/content";
import { setHeroBackgroundVideo } from "@/lib/hero-background-video";

const VIDEO_SRC = HERO_BACKGROUND_VIDEO_SRC;
const HERO_VIDEO_LOAD_TIMEOUT_MS = 8000;

function isVideoReady(video: HTMLVideoElement) {
  return video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

export function HeroBackground() {
  const { markReady } = useHeroLoad();
  const videoRef = useRef<HTMLVideoElement>(null);
  const readySentRef = useRef(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const finishLoading = useCallback(() => {
    if (readySentRef.current) return;
    readySentRef.current = true;
    markReady();
  }, [markReady]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) {
      finishLoading();
    }
  }, [finishLoading]);

  useEffect(() => {
    if (videoFailed || videoReady) {
      finishLoading();
      return;
    }

    const timeout = window.setTimeout(finishLoading, HERO_VIDEO_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [finishLoading, videoFailed, videoReady]);

  useEffect(() => {
    return () => {
      setHeroBackgroundVideo(null);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed || reducedMotion) return;

    const markVideoReady = () => {
      if (isVideoReady(video)) {
        setVideoReady(true);
      }
    };

    const tryPlay = () => {
      void video.play().then(markVideoReady).catch(() => {
        markVideoReady();
      });
    };

    markVideoReady();
    tryPlay();

    video.addEventListener("loadeddata", markVideoReady);
    video.addEventListener("canplay", markVideoReady);
    video.addEventListener("playing", markVideoReady);

    return () => {
      video.removeEventListener("loadeddata", markVideoReady);
      video.removeEventListener("canplay", markVideoReady);
      video.removeEventListener("playing", markVideoReady);
    };
  }, [reducedMotion, videoFailed]);

  const showVideo = !videoFailed && videoReady && !reducedMotion;

  return (
    <div className="absolute inset-0 bg-dominant" aria-hidden>
      {!showVideo && !videoFailed && !reducedMotion ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="hero-load-spinner" aria-hidden />
        </div>
      ) : null}
      {!reducedMotion && (
        <video
          ref={(node) => {
            videoRef.current = node;
            setHeroBackgroundVideo(node);
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[center_30%] ${
            videoFailed ? "hidden" : showVideo ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
          } transition-[opacity,transform] duration-[1200ms] ease-out`}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
