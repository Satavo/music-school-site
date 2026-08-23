"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { MediaLightbox, useMediaLightbox } from "@/components/MediaLightbox";
import { HERO_STUDENT_VIDEO, HERO_VIDEO_CREDIT } from "@/lib/content";
import {
  pauseHeroBackgroundVideo,
  resumeHeroBackgroundVideo,
} from "@/lib/hero-background-video";

function playLightboxVideo(video: HTMLVideoElement) {
  video.muted = false;
  if (HERO_STUDENT_VIDEO.defaultVolume !== undefined) {
    video.volume = Math.min(1, Math.max(0, HERO_STUDENT_VIDEO.defaultVolume));
  }

  if (!video.paused && video.currentTime > 0 && !video.ended) {
    return;
  }

  video.currentTime = 0;
  void video.play().catch(() => {
    // Controls stay unmuted if autoplay is blocked.
  });
}

export function HeroVideoCredit() {
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const { open, isClosing, show, close } = useMediaLightbox();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      resumeHeroBackgroundVideo();
      return;
    }

    pauseHeroBackgroundVideo();
  }, [open]);

  const handleShow = () => {
    pauseHeroBackgroundVideo();

    flushSync(() => {
      show();
    });

    const video = lightboxVideoRef.current;
    if (video) {
      playLightboxVideo(video);
      return;
    }

    window.requestAnimationFrame(() => {
      const nextVideo = lightboxVideoRef.current;
      if (nextVideo) {
        playLightboxVideo(nextVideo);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        aria-label={`Watch performance video: ${HERO_VIDEO_CREDIT}`}
        className="hero-video-credit"
      >
        {HERO_VIDEO_CREDIT}
      </button>

      {mounted &&
        open &&
        createPortal(
          <MediaLightbox
            item={HERO_STUDENT_VIDEO}
            isClosing={isClosing}
            close={close}
            videoRef={lightboxVideoRef}
            deferVideoPlayback
          />,
          document.body,
        )}
    </>
  );
}
