"use client";

import { useEffect, useState } from "react";

const LG_BREAKPOINT = 1024;
const HERO_EXIT_THRESHOLD = 48;

function isPastHeroSection() {
  const hero = document.getElementById("home");
  if (!hero) {
    return window.scrollY > window.innerHeight * 0.85;
  }

  const rect = hero.getBoundingClientRect();
  return rect.bottom <= HERO_EXIT_THRESHOLD;
}

export function useFloatingActionVisibility() {
  const [pastHero, setPastHero] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
    const syncDesktop = () => setIsDesktop(media.matches);

    syncDesktop();
    media.addEventListener("change", syncDesktop);

    return () => media.removeEventListener("change", syncDesktop);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setPastHero(isPastHeroSection());
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const ready = isDesktop !== null;
  const visible = isDesktop === true ? pastHero : isDesktop === false;

  return { ready, visible, isDesktop, pastHero };
}
