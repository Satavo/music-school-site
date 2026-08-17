"use client";

import Image from "next/image";
import { useState } from "react";
import { HERO_STUDENT_VIDEO } from "@/lib/content";

const VIDEO_SRC = HERO_STUDENT_VIDEO.src;
const HERO_POSTER_SRC = HERO_STUDENT_VIDEO.poster ?? "/images/piano.jpg";

export function HeroBackground() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="absolute inset-0" aria-hidden>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setVideoFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover object-[center_30%] motion-reduce:hidden ${
          videoFailed ? "hidden" : ""
        }`}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <Image
        src={HERO_POSTER_SRC}
        alt=""
        fill
        priority
        unoptimized
        className={`object-cover object-[center_30%] ${
          videoFailed ? "block" : "hidden motion-reduce:block"
        }`}
        sizes="100vw"
      />
    </div>
  );
}
