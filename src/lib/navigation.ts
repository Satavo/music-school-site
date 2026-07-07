export const HOME_SECTIONS = ["home", "why", "offers", "gallery", "contact"] as const;

export type HomeSection = (typeof HOME_SECTIONS)[number];

export const HOME_RETURN_KEY = "fma-home-return";

export function isHomeSection(value: string | undefined | null): value is HomeSection {
  return !!value && (HOME_SECTIONS as readonly string[]).includes(value);
}

export function pageHref(path: string, from: HomeSection): string {
  return `${path}?from=${from}`;
}

export function backToHomeHref(from?: string | null): string {
  if (!isHomeSection(from)) return "/";
  return from === "home" ? "/" : `/#${from}`;
}

export function withHomeReturn(href: string, activeSection: string): string {
  if (href !== "/about" && href !== "/curriculum" && href !== "/gallery") return href;

  const section = activeSection.replace("#", "") || "home";
  return pageHref(href, isHomeSection(section) ? section : "home");
}
