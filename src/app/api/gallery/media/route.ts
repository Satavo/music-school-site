import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { blobPathnameFromSrc, getBlobStoreAccess, isGalleryMediaPathname } from "@/lib/blob-config";

export async function GET(request: NextRequest) {
  const pathnameParam = request.nextUrl.searchParams.get("pathname");
  const pathname = pathnameParam ? blobPathnameFromSrc(pathnameParam) ?? pathnameParam : null;

  if (!pathname || !isGalleryMediaPathname(pathname)) {
    return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  }

  const result = await get(pathname, {
    access: getBlobStoreAccess(),
    useCache: true,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const runtime = "nodejs";
