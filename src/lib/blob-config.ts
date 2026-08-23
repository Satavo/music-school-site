export type BlobStoreAccess = "public" | "private";

export function getBlobStoreAccess(): BlobStoreAccess {
  const value = process.env.BLOB_STORE_ACCESS?.trim().toLowerCase();
  if (value === "public" || value === "private") return value;
  return "private";
}

export function isGalleryMediaPathname(pathname: string): boolean {
  return /^gallery\/media\/[a-z0-9-]+\.(jpg|jpeg|png|webp|mp4)$/i.test(pathname);
}

export function blobPathnameFromSrc(src: string): string | null {
  if (src.startsWith("gallery/media/")) return src;

  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      const path = new URL(src).pathname.replace(/^\//, "");
      if (path.startsWith("gallery/media/")) return path;
    } catch {
      return null;
    }
  }

  return null;
}

export function isBlobGalleryMediaRef(src: string): boolean {
  return blobPathnameFromSrc(src) !== null || src.includes("blob.vercel-storage.com");
}

/** Turn a manifest src (pathname or blob URL) into a URL the browser can load. */
export function resolveGalleryMediaUrl(src: string): string {
  if (src.startsWith("/images/") || src.startsWith("/videos/")) return src;
  if (src.startsWith("/api/gallery/media")) return src;

  const pathname = blobPathnameFromSrc(src);
  if (!pathname) {
    if (getBlobStoreAccess() === "public" && src.startsWith("http")) return src;
    return src;
  }

  if (getBlobStoreAccess() === "public" && src.startsWith("http")) return src;

  return `/api/gallery/media?pathname=${encodeURIComponent(pathname)}`;
}

export function withResolvedGalleryMedia<T extends { src: string; poster?: string }>(
  item: T,
): T {
  return {
    ...item,
    src: resolveGalleryMediaUrl(item.src),
    poster: item.poster ? resolveGalleryMediaUrl(item.poster) : item.poster,
  };
}
