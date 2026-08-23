import { NextResponse } from "next/server";
import {
  blobPathnameFromSrc,
  isBlobGalleryMediaRef,
  withResolvedGalleryMedia,
} from "@/lib/blob-config";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidateGallery } from "@/lib/gallery";
import { createGalleryItemId } from "@/lib/gallery-types";
import {
  deleteGalleryBlob,
  getEffectiveGalleryItems,
  readGalleryManifestFromBlob,
  writeGalleryManifest,
} from "@/lib/gallery-store";
import { galleryTypeFromContentType } from "@/lib/gallery-upload";

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const items = (await getEffectiveGalleryItems()).map(withResolvedGalleryMedia);
  const usingBlob = (await readGalleryManifestFromBlob()) !== null;

  return NextResponse.json({ items, usingBlob });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const src = typeof payload.src === "string" ? payload.src.trim() : "";
  const caption = typeof payload.caption === "string" ? payload.caption.trim() : "";
  const alt = typeof payload.alt === "string" ? payload.alt.trim() : caption;
  const contentType = typeof payload.contentType === "string" ? payload.contentType : "";

  if (!src || !caption) {
    return NextResponse.json({ error: "Photo/video URL and caption are required." }, { status: 400 });
  }

  if (!isBlobGalleryMediaRef(src)) {
    return NextResponse.json({ error: "Invalid media reference." }, { status: 400 });
  }

  const storedSrc = blobPathnameFromSrc(src) ?? src;

  const type = galleryTypeFromContentType(contentType);
  if (!type) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }

  const items = await getEffectiveGalleryItems();
  const item = {
    id: createGalleryItemId(caption),
    type,
    src: storedSrc,
    alt: alt || caption,
    caption,
  };

  await writeGalleryManifest([...items, item]);
  await revalidateGallery();

  return NextResponse.json({ ok: true, item: withResolvedGalleryMedia(item) });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id =
    body && typeof body === "object" && "id" in body
      ? String((body as { id: unknown }).id ?? "")
      : "";

  if (!id) {
    return NextResponse.json({ error: "Item id is required." }, { status: 400 });
  }

  const items = await getEffectiveGalleryItems();
  const target = items.find((item) => item.id === id);
  if (!target) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  const nextItems = items.filter((item) => item.id !== id);
  await writeGalleryManifest(nextItems);
  await deleteGalleryBlob(target.src);
  if (target.poster && isBlobGalleryMediaRef(target.poster)) {
    await deleteGalleryBlob(target.poster);
  }
  await revalidateGallery();

  return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
