import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminGalleryApp } from "@/components/AdminGalleryApp";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Gallery Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const initialAuthed = verifySessionToken(token);

  return <AdminGalleryApp initialAuthed={initialAuthed} />;
}
