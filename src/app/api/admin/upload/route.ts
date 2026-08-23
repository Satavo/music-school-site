import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  GALLERY_ALLOWED_CONTENT_TYPES,
  GALLERY_MAX_VIDEO_BYTES,
  isAllowedGalleryPathname,
} from "@/lib/gallery-upload";

export async function POST(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAllowedGalleryPathname(pathname)) {
          throw new Error("Invalid upload path.");
        }

        return {
          allowedContentTypes: [...GALLERY_ALLOWED_CONTENT_TYPES],
          maximumSizeInBytes: GALLERY_MAX_VIDEO_BYTES,
          addRandomSuffix: false,
          allowOverwrite: false,
          validUntil: Date.now() + 60 * 60 * 1000,
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export const runtime = "nodejs";
