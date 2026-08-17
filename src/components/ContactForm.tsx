"use client";

import { ContactDetails } from "@/components/ContactDetails";

type ContactFormProps = {
  compact?: boolean;
  theme?: "dark" | "paper";
};

export function ContactForm({ compact = false, theme = "dark" }: ContactFormProps) {
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

  return (
    <form
      className={compact ? "space-y-3.5" : "space-y-5"}
      onSubmit={(event) => {
        event.preventDefault();
        alert("Thank you! We will be in touch soon.");
      }}
    >
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
        />
      </div>
      <ContactDetails compact dense={compact} theme={theme} />
      <button type="submit" className={`btn-primary w-full sm:w-auto ${compact ? "btn-primary-compact" : ""}`}>
        Request a Call Back
      </button>
    </form>
  );
}
