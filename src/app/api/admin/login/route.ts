import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  getSessionCookieOptions,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin is not configured on this server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const password =
    body && typeof body === "object" && "password" in body
      ? String((body as { password: unknown }).password ?? "")
      : "";

  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Could not create session." }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}
