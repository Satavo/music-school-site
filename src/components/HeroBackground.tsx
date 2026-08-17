"use client";

import { useHeroLoad } from "@/components/HeroLoadGate";
import { HERO_STUDENT_VIDEO } from "@/lib/content";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = HERO_STUDENT_VIDEO.src;

function isVideoReady(video: HTMLVideoElement) {
  return video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

export function HeroBackground() {
  const { markReady } = useHeroLoad();
  const videoRef = useRef<HTMLVideoElement>(null);
  const readySentRef = useRef(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
    }
  }, [markReady]);

  useEffect(() => {
    if (readySentRef.current) return;

    const finish = () => {
      if (readySentRef.current) return;
      readySentRef.current = true;
      markReady();
    };

    if (videoFailed) {
      finish();
      return;
    }

    if (!videoReady) return;

    finish();
  }, [markReady, videoFailed, videoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    const markVideoReady = () => {
      if (isVideoReady(video)) {
        setVideoReady(true);
      }
    };

    markVideoReady();
    void video.play().then(markVideoReady).catch(() => {});

    video.addEventListener("loadeddata", markVideoReady);
    video.addEventListener("canplay", markVideoReady);
    video.addEventListener("playing", markVideoReady);

    return () => {
      video.removeEventListener("loadeddata", markVideoReady);
      video.removeEventListener("canplay", markVideoReady);
      video.removeEventListener("playing", markVideoReady);
    };
  }, [videoFailed]);

  const showVideo = !videoFailed && videoReady;

  return (
    <div className="absolute inset-0 bg-dominant" aria-hidden>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setVideoFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover object-[center_30%] motion-reduce:hidden ${
          videoFailed ? "hidden" : showVideo ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        } transition-[opacity,transform] duration-[1200ms] ease-out motion-reduce:transition-none`}
      />
    </div>
  );
}
