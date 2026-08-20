"use client";

import { useState, type FormEvent } from "react";
import { ContactDetails } from "@/components/ContactDetails";

type ContactFormProps = {
  compact?: boolean;
  theme?: "dark" | "paper";
  onSuccess?: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ compact = false, theme = "dark", onSuccess }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isPaper = theme === "paper";
  const labelClass = isPaper
    ? `block text-lg font-medium leading-[1.8] text-paper-foreground md:text-[1.1875rem] md:leading-[1.85] ${compact ? "mb-1.5" : "mb-2"}`
    : `about-bio-text block font-medium ${compact ? "mb-1.5" : "mb-2"}`;
  const optionalClass = isPaper ? "font-normal text-paper-subtle" : "font-normal text-dominant-subtle";
  const inputClass = compact
    ? `${isPaper ? "input-field-paper" : "input-field"} input-field-compact`
    : isPaper
      ? "input-field-paper"
      : "input-field";
  const messageClass = isPaper
    ? "text-lg leading-[1.8] text-paper-foreground md:text-[1.1875rem] md:leading-[1.85]"
    : "about-bio-text";
  const errorClass = isPaper ? "text-sm text-red-600 md:text-base" : "text-sm text-red-400 md:text-base";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "submitting" || submitState === "success") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") ?? "");
    const name = String(formData.get("name") ?? "");
    const website = String(formData.get("website") ?? "");

    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, website }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setSubmitState("error");
        setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("success");
      form.reset();
      window.setTimeout(() => onSuccess?.(), 2200);
    } catch {
      setSubmitState("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (submitState === "success") {
    return (
      <div className={compact ? "space-y-3" : "space-y-4"} role="status" aria-live="polite">
        <p className={`${messageClass} font-medium`}>Thank you! We will be in touch soon.</p>
        <p className={messageClass}>
          We received your phone number and will call you back to schedule a free consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      className={compact ? "space-y-3.5" : "space-y-5"}
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-secondary">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={inputClass}
          placeholder="(555) 123-4567"
          disabled={submitState === "submitting"}
        />
      </div>
      <div>
        <label htmlFor="name" className={labelClass}>
          Your Name <span className={optionalClass}>(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          placeholder="Jane Smith"
          disabled={submitState === "submitting"}
        />
      </div>
      <ContactDetails compact dense={compact} theme={theme} />
      {submitState === "error" && errorMessage ? (
        <p className={errorClass} role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button
        type="submit"
        className={`btn-primary w-full sm:w-auto ${compact ? "btn-primary-compact" : ""}`}
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "Sending..." : "Request a Call Back"}
      </button>
    </form>
  );
}
