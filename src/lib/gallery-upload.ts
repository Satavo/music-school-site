export const GALLERY_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const GALLERY_VIDEO_TYPES = ["video/mp4"] as const;

export const GALLERY_ALLOWED_CONTENT_TYPES = [
  ...GALLERY_IMAGE_TYPES,
  ...GALLERY_VIDEO_TYPES,
] as const;

export const GALLERY_MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const GALLERY_MAX_VIDEO_BYTES = 100 * 1024 * 1024;

export function galleryTypeFromContentType(contentType: string): "image" | "video" | null {
  if ((GALLERY_IMAGE_TYPES as readonly string[]).includes(contentType)) return "image";
  if ((GALLERY_VIDEO_TYPES as readonly string[]).includes(contentType)) return "video";
  return null;
}

export function galleryMaxBytesForContentType(contentType: string): number {
  return galleryTypeFromContentType(contentType) === "video"
    ? GALLERY_MAX_VIDEO_BYTES
    : GALLERY_MAX_IMAGE_BYTES;
}

export function extensionFromContentType(contentType: string): string {
  switch (contentType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "video/mp4":
      return ".mp4";
    default:
      return "";
  }
}

export function isAllowedGalleryPathname(pathname: string): boolean {
  return /^gallery\/media\/[a-z0-9-]+\.(jpg|jpeg|png|webp|mp4)$/i.test(pathname);
}
