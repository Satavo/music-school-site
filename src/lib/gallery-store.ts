import { readFile } from "node:fs/promises";
import path from "node:path";
import { del, get, put } from "@vercel/blob";
import {
  blobPathnameFromSrc,
  getBlobStoreAccess,
  isBlobGalleryMediaRef,
} from "@/lib/blob-config";
import { STATIC_GALLERY_ITEMS } from "@/lib/gallery-static";
import {
  parseGalleryItems,
  type GalleryItem,
  type GalleryManifest,
} from "@/lib/gallery-types";

export const GALLERY_MANIFEST_PATH = "gallery/manifest.json";

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function contentTypeFromExtension(extension: string): string {
  switch (extension.toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".mp4":
      return "video/mp4";
    default:
      return "application/octet-stream";
  }
}

export async function readGalleryManifestFromBlob(): Promise<GalleryItem[] | null> {
  if (!hasBlobToken()) return null;

  try {
    const result = await get(GALLERY_MANIFEST_PATH, {
      access: getBlobStoreAccess(),
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const text = await new Response(result.stream).text();
    return parseGalleryItems(JSON.parse(text) as GalleryManifest);
  } catch {
    return null;
  }
}

export async function writeGalleryManifest(items: GalleryItem[]): Promise<void> {
  if (!hasBlobToken()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  const manifest: GalleryManifest = { items };
  await put(GALLERY_MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: getBlobStoreAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function deleteGalleryBlob(src: string): Promise<void> {
  if (!hasBlobToken()) return;

  const pathname = blobPathnameFromSrc(src);
  if (pathname) {
    await del(pathname);
    return;
  }

  if (src.includes("blob.vercel-storage.com")) {
    await del(src);
  }
}

export async function migrateStaticGalleryToBlob(): Promise<GalleryItem[]> {
  if (!hasBlobToken()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  const migrated: GalleryItem[] = [];

  for (const item of STATIC_GALLERY_ITEMS) {
    if (isBlobGalleryMediaRef(item.src)) {
      migrated.push(item);
      continue;
    }

    const relativePath = item.src.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", relativePath);
    const fileBuffer = await readFile(filePath);
    const extension = path.extname(filePath) || ".jpg";
    const blobPath = `gallery/media/${item.id}${extension}`;

    const uploaded = await put(blobPath, fileBuffer, {
      access: getBlobStoreAccess(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentTypeFromExtension(extension),
    });

    migrated.push({
      ...item,
      src: uploaded.pathname,
      poster: item.poster?.startsWith("/") ? undefined : item.poster,
    });
  }

  await writeGalleryManifest(migrated);
  return migrated;
}

export async function getEffectiveGalleryItems(): Promise<GalleryItem[]> {
  const blobItems = await readGalleryManifestFromBlob();
  if (blobItems !== null) return blobItems;
  return STATIC_GALLERY_ITEMS;
}
