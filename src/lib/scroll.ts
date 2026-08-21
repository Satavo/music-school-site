import { openContactModal } from "@/lib/contact-modal";

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

export function scrollToContact(_pathname = "/") {
  openContactModal();
}
