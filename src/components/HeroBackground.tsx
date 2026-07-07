"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const VIDEO_SRC = "/videos/hero-piano.mp4";

export function HeroBackground() {
  const [useImage, setUseImage] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUseImage(true);
    }
  }, []);

  if (useImage) {
    return (
      <Image
        src="/images/main.jpg"
        alt=""
        fill
        priority
        unoptimized
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />
    );
  }

  return (
    <>
      <Image
        src="/images/main.jpg"
        alt=""
        fill
        priority
        unoptimized
        aria-hidden
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/main.jpg"
        onError={() => setUseImage(true)}
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  );
}
