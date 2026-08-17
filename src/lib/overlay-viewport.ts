"use client";

import { useEffect, useRef } from "react";

/** Pin a fixed overlay to visualViewport and lock scroll (Telegram / iOS WebView). */
export function useOverlayViewport() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;

    const prevBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const sync = () => {
      const vv = window.visualViewport;
      if (!vv) {
        root.style.removeProperty("top");
        root.style.removeProperty("left");
        root.style.removeProperty("width");
        root.style.removeProperty("height");
        return;
      }

      root.style.top = `${vv.offsetTop}px`;
      root.style.left = `${vv.offsetLeft}px`;
      root.style.width = `${vv.width}px`;
      root.style.height = `${vv.height}px`;
    };

    sync();
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);

    return () => {
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);

      body.style.overflow = prevBody.overflow;
      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.width = prevBody.width;
      documentElement.style.overflow = prevHtmlOverflow;

      window.scrollTo(0, scrollY);
    };
  }, []);

  return rootRef;
}
