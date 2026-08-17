"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MediaLightbox, useMediaLightbox } from "@/components/MediaLightbox";
import { HERO_STUDENT_VIDEO, HERO_VIDEO_CREDIT } from "@/lib/content";

const MOBILE_CREDIT_GAP = 20;

export function HeroVideoCredit() {
  const ref = useRef<HTMLButtonElement>(null);
  const { open, isClosing, show, close } = useMediaLightbox();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    const hero = document.getElementById("home");
    if (!el || !hero) return;

    const lockMobilePosition = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        el.style.removeProperty("top");
        el.style.removeProperty("bottom");
        return;
      }

      const heroHeight =
        Number.parseInt(getComputedStyle(hero).getPropertyValue("--hero-h"), 10) ||
        hero.offsetHeight;

      el.style.top = `${Math.max(0, heroHeight - el.offsetHeight - MOBILE_CREDIT_GAP)}px`;
      el.style.bottom = "auto";
    };

    lockMobilePosition();
    window.addEventListener("load", lockMobilePosition, { once: true });

    return () => window.removeEventListener("load", lockMobilePosition);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={show}
        aria-label={`Watch performance video: ${HERO_VIDEO_CREDIT}`}
        className="absolute left-[max(0.75rem,env(safe-area-inset-left,0px))] z-[2] max-w-[13rem] cursor-pointer rounded-md bg-black/45 px-2.5 py-1.5 text-left text-[0.6875rem] font-light leading-relaxed tracking-[0.04em] text-secondary-foreground/55 transition-colors hover:bg-black/55 hover:text-secondary-foreground/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-line/40 sm:max-w-[15rem] sm:px-3 sm:py-2 sm:text-xs max-lg:top-[calc(100svh-4rem)] max-lg:bottom-auto lg:bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.5rem))] lg:left-[max(1.25rem,env(safe-area-inset-left,0px))] lg:top-auto lg:max-w-none lg:whitespace-nowrap lg:backdrop-blur-sm"
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
