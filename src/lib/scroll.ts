/** After this much scroll, header switches from transparent to solid white. */
export const HERO_HEADER_SWITCH_Y = 56;

export function getHeroHeaderSwitchY() {
  return HERO_HEADER_SWITCH_Y;
}

/** Top of the Who we are section (where the white background begins). */
export function scrollToWhoSectionStart() {
  const hero = document.getElementById("home");
  const top = hero ? hero.offsetHeight : 0;
  window.scrollTo({ top, behavior: "smooth" });
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

export function scrollToContact(pathname: string) {
  scrollToSection("contact");
  const base = pathname === "/" ? "/" : pathname;
  window.history.pushState(null, "", `${base}#contact`);
}
