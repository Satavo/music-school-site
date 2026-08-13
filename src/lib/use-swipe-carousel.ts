"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 36;

export function useSwipeCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipeRef = useRef<HTMLDivElement | null>(null);

  indexRef.current = index;

  const go = useCallback(
    (next: number) => {
      if (length <= 0) return;
      const nextIndex = ((next % length) + length) % length;
      indexRef.current = nextIndex;
      setIndex(nextIndex);
    },
    [length],
  );

  useEffect(() => {
    const element = swipeRef.current;
    if (!element || length <= 1) return;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start) return;

      const touch = event.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8 && event.cancelable) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      const current = indexRef.current;
      go(deltaX > 0 ? current - 1 : current + 1);
    };

    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchmove", onTouchMove, { passive: false });
    element.addEventListener("touchend", onTouchEnd, { passive: true });
    element.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
      element.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [go, length]);

  return { index, go, swipeRef };
}
