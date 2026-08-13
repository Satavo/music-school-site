"use client";

import { useEffect } from "react";

/** Lock mobile hero height after hydration to avoid Telegram/iOS viewport jumps. */
export function HeroViewportLock() {
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    const hero = document.getElementById("home");
    if (!hero) return;

    const height = Math.round(window.visualViewport?.height ?? window.innerHeight);
    if (height > 0) {
      hero.style.setProperty("--hero-h", `${height}px`);
    }
  }, []);

  return null;
}
