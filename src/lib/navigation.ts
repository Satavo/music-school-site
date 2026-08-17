export const HOME_SECTIONS = [
  "home",
  "who",
  "why",
  "about",
  "policies",
  "gallery",
  "contact",
] as const;

export type HomeSection = (typeof HOME_SECTIONS)[number];

export function isHomeSection(value: string | undefined | null): value is HomeSection {
  return !!value && (HOME_SECTIONS as readonly string[]).includes(value);
}
