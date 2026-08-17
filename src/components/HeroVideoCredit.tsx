"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MediaLightbox, useMediaLightbox } from "@/components/MediaLightbox";
import { HERO_STUDENT_VIDEO, HERO_VIDEO_CREDIT } from "@/lib/content";

export function HeroVideoCredit() {
  const { open, isClosing, show, close } = useMediaLightbox();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`Watch performance video: ${HERO_VIDEO_CREDIT}`}
        className="absolute bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.5rem))] left-[max(0.75rem,env(safe-area-inset-left,0px))] z-[2] max-w-[13rem] cursor-pointer rounded-md bg-black/45 px-2.5 py-1.5 text-left text-[0.6875rem] font-light leading-relaxed tracking-[0.04em] text-secondary-foreground/55 transition-colors hover:bg-black/55 hover:text-secondary-foreground/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-line/40 sm:max-w-[15rem] sm:px-3 sm:py-2 sm:text-xs lg:left-[max(1.25rem,env(safe-area-inset-left,0px))] lg:max-w-none lg:whitespace-nowrap lg:backdrop-blur-sm"
      >
        {HERO_VIDEO_CREDIT}
      </button>

      {mounted &&
        open &&
        createPortal(
          <MediaLightbox item={HERO_STUDENT_VIDEO} isClosing={isClosing} close={close} />,
          document.body,
        )}
    </>
  );
}
