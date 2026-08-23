export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
};

export type GalleryManifest = {
  items: GalleryItem[];
};

export function isGalleryItem(value: unknown): value is GalleryItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    (item.type === "image" || item.type === "video") &&
    typeof item.src === "string" &&
    typeof item.alt === "string" &&
    typeof item.caption === "string" &&
    (item.poster === undefined || typeof item.poster === "string")
  );
}

export function parseGalleryItems(data: unknown): GalleryItem[] {
  if (!data || typeof data !== "object" || !("items" in data)) {
    throw new Error('Gallery manifest must have an "items" array');
  }

  const { items } = data as { items: unknown };
  if (!Array.isArray(items)) {
    throw new Error('Gallery manifest "items" must be an array');
  }

  const parsed: GalleryItem[] = [];
  for (const [index, item] of items.entries()) {
    if (!isGalleryItem(item)) {
      throw new Error(
        `Gallery item at index ${index} is invalid (need id, type, src, alt, caption)`,
      );
    }
    parsed.push(item);
  }
  return parsed;
}

export function slugifyId(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "gallery-item";
}

export function createGalleryItemId(caption: string): string {
  const suffix = crypto.randomUUID().slice(0, 8);
  return `${slugifyId(caption)}-${suffix}`;
}
