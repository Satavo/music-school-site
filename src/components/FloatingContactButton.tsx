"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { openContactModal } from "@/lib/contact-modal";

const LG_BREAKPOINT = 1024;
const TOP_SCROLL_THRESHOLD = 8;

export function FloatingContactButton() {
  const [atTop, setAtTop] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
      const hero = document.getElementById("home");
      const scrolledPastHero = hero
        ? window.scrollY >= hero.offsetHeight - 32
        : window.scrollY > window.innerHeight * 0.85;

      setAtTop(window.scrollY <= TOP_SCROLL_THRESHOLD);
      setPastHero(scrolledPastHero);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const expanded = atTop && !isDesktop;
  const visible = isDesktop ? pastHero : true;

  return (
    <div
      className={`floating-contact-wrap fixed z-40 ${
        visible ? "floating-contact-wrap-visible" : "floating-contact-wrap-hidden"
      } ${expanded ? "floating-contact-wrap-expanded" : "floating-contact-wrap-compact"}`}
      style={{
        bottom: "max(2rem, calc(0.75rem + env(safe-area-inset-bottom)))",
        right: "max(2rem, calc(0.75rem + env(safe-area-inset-right)))",
      }}
    >
      <div className="floating-contact-fab-shell">
        {!expanded && (
          <>
            <span className="floating-contact-wave" aria-hidden />
            <span className="floating-contact-wave floating-contact-wave-delay" aria-hidden />
          </>
        )}
        <Link
          href="/#contact"
          aria-label={expanded ? "Schedule a consultation" : "Go to contact form"}
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
          onClick={(event) => {
            event.preventDefault();
            openContactModal();
          }}
          className={`floating-contact-fab ${
            expanded ? "floating-contact-fab-expanded" : "floating-contact-fab-compact"
          }`}
        >
          <span className="floating-contact-fab-label">Schedule a Consultation</span>
          <span className="floating-contact-fab-icon-wrap" aria-hidden>
            <PhoneIcon className="floating-contact-fab-icon" />
          </span>
        </Link>
      </div>
    </div>
  );
}
