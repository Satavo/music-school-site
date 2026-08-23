import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";

export async function getAdminSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminSessionToken();
  return verifySessionToken(token);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function requireAdminSession(): Promise<NextResponse | null> {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }
  return null;
}
