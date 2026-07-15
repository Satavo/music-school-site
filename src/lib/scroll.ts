/** After this much scroll, header switches from transparent to solid white. */
export const HERO_HEADER_SWITCH_Y = 56;

export function getHeroHeaderSwitchY() {
  return HERO_HEADER_SWITCH_Y;
}

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

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const scrollPadding =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const top = el.getBoundingClientRect().top + window.scrollY - scrollPadding;

  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `#${id}`);
}

/** Scroll to performances on Meet the Owner. */
export function scrollToPerformances() {
  scrollToSection("performances");
}

export function scrollToContact(pathname: string) {
  scrollToSection("contact");
  const base = pathname === "/" ? "/" : pathname;
  window.history.pushState(null, "", `${base}#contact`);
}
