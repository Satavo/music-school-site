import { unstable_cache } from "next/cache";
import { revalidatePath, revalidateTag } from "next/cache";
import { withResolvedGalleryMedia } from "@/lib/blob-config";
import { getEffectiveGalleryItems } from "@/lib/gallery-store";
import { STATIC_GALLERY_ITEMS } from "@/lib/gallery-static";
import type { GalleryItem } from "@/lib/gallery-types";

export type { GalleryItem } from "@/lib/gallery-types";

export const GALLERY_CACHE_TAG = "gallery";
const GALLERY_PREVIEW_LIMIT = 6;

const loadGalleryItems = unstable_cache(
  async () => {
    const items = await getEffectiveGalleryItems();
    return items.map(withResolvedGalleryMedia);
  },
  ["gallery-items"],
  { tags: [GALLERY_CACHE_TAG], revalidate: 60 },
);

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return loadGalleryItems();
}

export async function getGalleryLatestItems(
  limit = GALLERY_PREVIEW_LIMIT,
): Promise<GalleryItem[]> {
  const items = await getGalleryItems();
  return items.slice(-limit);
}

export async function revalidateGallery(): Promise<void> {
  revalidateTag(GALLERY_CACHE_TAG, "max");
  revalidatePath("/");
  revalidatePath("/gallery");
}

/** @deprecated Use getGalleryItems() in server components. */
export const GALLERY_ITEMS = STATIC_GALLERY_ITEMS;
