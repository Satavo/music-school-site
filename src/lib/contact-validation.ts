const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;
const NAME_MAX_LENGTH = 120;

type ContactPayload = {
  phone: string;
  name: string;
  website?: string;
};

export function normalizeContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const { phone, name, website } = body as Record<string, unknown>;

  if (typeof phone !== "string" || typeof name !== "string") return null;
  if (website !== undefined && typeof website !== "string") return null;

  return {
    phone: phone.trim(),
    name: name.trim(),
    website: typeof website === "string" ? website.trim() : "",
  };
}

export function validateContactPayload(payload: ContactPayload): string | null {
  if (payload.website) {
    return "Invalid submission.";
  }

  const digits = payload.phone.replace(/\D/g, "");
  if (digits.length < PHONE_MIN_DIGITS || digits.length > PHONE_MAX_DIGITS) {
    return "Please enter a valid phone number.";
  }

  if (payload.name.length > NAME_MAX_LENGTH) {
    return "Name is too long.";
  }

  return null;
}

export function formatPhoneForEmail(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return phone.trim();
}
