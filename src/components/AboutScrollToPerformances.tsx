"use client";

import { scrollToPerformances } from "@/lib/scroll";

export function AboutScrollToPerformances() {
  return (
    <div className="mt-14 flex flex-col items-center md:mt-16">
      <a
        href="#performances"
        aria-label="Scroll to performances"
        onClick={(event) => {
          event.preventDefault();
          scrollToPerformances();
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/25 text-secondary/70 transition-colors hover:border-secondary hover:text-secondary animate-float"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </div>
  );
}
