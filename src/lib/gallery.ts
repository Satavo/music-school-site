import galleryData from "../../content/gallery.json";

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
};

function isGalleryItem(value: unknown): value is GalleryItem {
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

function parseGalleryItems(data: unknown): GalleryItem[] {
  if (!data || typeof data !== "object" || !("items" in data)) {
    throw new Error("content/gallery.json must have an \"items\" array");
  }

  const { items } = data as { items: unknown };
  if (!Array.isArray(items)) {
    throw new Error("content/gallery.json \"items\" must be an array");
  }

  const parsed: GalleryItem[] = [];
  for (const [index, item] of items.entries()) {
    if (!isGalleryItem(item)) {
      throw new Error(
        `content/gallery.json item at index ${index} is invalid (need id, type, src, alt, caption)`,
      );
    }
    parsed.push(item);
  }
  return parsed;
}

export const GALLERY_ITEMS = parseGalleryItems(galleryData);

export const GALLERY_PREVIEW_LIMIT = 6;

export function getGalleryPreviewImages() {
  return GALLERY_ITEMS.slice(0, GALLERY_PREVIEW_LIMIT);
}
