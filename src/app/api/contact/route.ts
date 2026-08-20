import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SCHOOL_CONTACT, SCHOOL_NAME } from "@/lib/content";
import {
  formatPhoneForEmail,
  normalizeContactPayload,
  validateContactPayload,
} from "@/lib/contact-validation";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = normalizeContactPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const validationError = validateContactPayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? SCHOOL_CONTACT.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${SCHOOL_NAME} <onboarding@resend.dev>`;
  const formattedPhone = formatPhoneForEmail(payload.phone);
  const submittedName = payload.name || "Not provided";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: SCHOOL_CONTACT.email,
    subject: `Callback request — ${formattedPhone}`,
    text: [
      "New callback request from the website:",
      "",
      `Phone: ${formattedPhone}`,
      `Name: ${submittedName}`,
    ].join("\n"),
    html: [
      "<p><strong>New callback request from the website</strong></p>",
      `<p><strong>Phone:</strong> ${formattedPhone}</p>`,
      `<p><strong>Name:</strong> ${submittedName}</p>`,
    ].join(""),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Could not send your request. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
