/** Scroll so the About us block sits roughly in the middle of the viewport. */
export function scrollToWhoSectionStart() {
  const el = document.getElementById("who");
  if (!el) {
    const hero = document.getElementById("home");
    window.scrollTo({ top: hero ? hero.offsetHeight : 0, behavior: "smooth" });
    window.history.pushState(null, "", "#who");
    return;
  }

  const rect = el.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const top = absoluteTop - (window.innerHeight - rect.height) / 2;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  window.history.pushState(null, "", "#who");
}

export function scrollToSection(id: string, updateHash = true) {
  const el = document.getElementById(id);
  if (!el) return;

  const scrollPadding =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const scrollMargin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const top = el.getBoundingClientRect().top + window.scrollY - scrollPadding - scrollMargin;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

  if (updateHash) {
    const hashId = id === "contact-form" ? "contact" : id;
    window.history.pushState(null, "", `#${hashId}`);
  }
}

import { openContactModal } from "@/lib/contact-modal";

export function scrollToContact(_pathname = "/") {
  openContactModal();
}
