"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { MediaLightbox, useMediaLightbox } from "@/components/MediaLightbox";
import { HERO_STUDENT_VIDEO, HERO_VIDEO_CREDIT } from "@/lib/content";

function playLightboxVideo(video: HTMLVideoElement) {
  if (HERO_STUDENT_VIDEO.defaultVolume !== undefined) {
    video.volume = Math.min(1, Math.max(0, HERO_STUDENT_VIDEO.defaultVolume));
  }

  void video.play().catch(() => {
    video.muted = true;
    void video.play().catch(() => {});
  });
}

export function HeroVideoCredit() {
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const { open, isClosing, show, close } = useMediaLightbox();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShow = () => {
    flushSync(() => {
      show();
    });

    const video = lightboxVideoRef.current;
    if (video) {
      playLightboxVideo(video);
    }
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
          />,
          document.body,
        )}
    </>
  );
}
