"use client";

import { scrollToWhoSectionStart } from "@/lib/scroll";

export function HeroScrollDown() {
  return (
    <a
      href="#who"
      aria-label="Scroll down"
      onClick={(event) => {
        event.preventDefault();
        scrollToWhoSectionStart();
      }}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-foreground/35 text-secondary-foreground/75 transition-colors hover:border-secondary-foreground/60 hover:text-secondary-foreground"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </a>
  );
}
