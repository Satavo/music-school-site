import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "fma_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type SessionPayload = {
  exp: number;
};

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET ?? null;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && getSessionSecret());
}

export function createSessionToken(): string | null {
  const secret = getSessionSecret();
  if (!secret) return null;

  const payload: SessionPayload = {
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  const secret = getSessionSecret();
  if (!secret) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as SessionPayload;
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;

  const provided = Buffer.from(password);
  const expected = Buffer.from(configured);
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
