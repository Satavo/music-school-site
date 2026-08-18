"use client";

import { useEffect, useRef } from "react";

function shouldPinToVisualViewport() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

/** Lock page scroll while overlay is open; pin to visualViewport on mobile WebViews. */
export function useOverlayViewport() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const sync = () => {
      if (!shouldPinToVisualViewport()) {
        root.style.removeProperty("top");
        root.style.removeProperty("left");
        root.style.removeProperty("width");
        root.style.removeProperty("height");
        return;
      }

      const vv = window.visualViewport;
      if (!vv) return;

      root.style.top = `${vv.offsetTop}px`;
      root.style.left = `${vv.offsetLeft}px`;
      root.style.width = `${vv.width}px`;
      root.style.height = `${vv.height}px`;
    };

    sync();
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);

    return () => {
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);

      body.style.overflow = prev.bodyOverflow;
      documentElement.style.overflow = prev.htmlOverflow;
      body.style.paddingRight = prev.bodyPaddingRight;
    };
  }, []);

  return rootRef;
}
