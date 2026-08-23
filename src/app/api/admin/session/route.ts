import { NextResponse } from "next/server";
import { getBlobStoreAccess } from "@/lib/blob-config";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isAdminConfigured } from "@/lib/admin-session";

export async function GET() {
  return NextResponse.json({
    configured: isAdminConfigured(),
    authenticated: await isAdminAuthenticated(),
    blobAccess: getBlobStoreAccess(),
  });
}
