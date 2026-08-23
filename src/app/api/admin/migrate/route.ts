import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { revalidateGallery } from "@/lib/gallery";
import {
  migrateStaticGalleryToBlob,
  readGalleryManifestFromBlob,
} from "@/lib/gallery-store";

export async function POST() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const existing = await readGalleryManifestFromBlob();
  if (existing !== null) {
    return NextResponse.json({
      ok: true,
      items: existing,
      migrated: false,
    });
  }

  try {
    const items = await migrateStaticGalleryToBlob();
    await revalidateGallery();
    return NextResponse.json({ ok: true, items, migrated: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not migrate gallery.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const runtime = "nodejs";
