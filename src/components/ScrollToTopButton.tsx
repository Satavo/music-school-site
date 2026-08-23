"use client";

import { useFloatingActionVisibility } from "@/lib/use-floating-action-visibility";

export function ScrollToTopButton() {
  const { ready, pastHero, isDesktop } = useFloatingActionVisibility();

  if (!ready || !isDesktop) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "#home");
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!pastHero}
      tabIndex={pastHero ? 0 : -1}
      className={`scroll-to-top fixed z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-dominant/45 text-dominant-foreground/75 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md hover:border-white/18 hover:bg-dominant/62 hover:text-dominant-foreground hover:shadow-[0_10px_28px_rgba(0,0,0,0.34)] sm:h-[3.25rem] sm:w-[3.25rem] ${
        pastHero ? "scroll-to-top-visible" : "scroll-to-top-hidden"
      }`}
      style={{
        bottom: "max(2rem, calc(0.75rem + env(safe-area-inset-bottom)))",
        left: "max(2rem, calc(0.75rem + env(safe-area-inset-left)))",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
