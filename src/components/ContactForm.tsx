"use client";

import { ContactDetails } from "@/components/ContactDetails";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  return (
    <form
      className={compact ? "space-y-3.5" : "space-y-5"}
      onSubmit={(event) => {
        event.preventDefault();
        alert("Thank you! We will be in touch soon.");
      }}
    >
      <div>
        <label htmlFor="phone" className={`about-bio-text block font-medium text-secondary ${compact ? "mb-1.5" : "mb-2"}`}>
          Phone Number <span className="text-secondary">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={compact ? "input-field input-field-compact" : "input-field"}
          placeholder="(555) 123-4567"
        />
      </div>
      <div>
        <label htmlFor="name" className={`about-bio-text block font-medium text-secondary ${compact ? "mb-1.5" : "mb-2"}`}>
          Your Name <span className="about-bio-text font-normal text-dominant-subtle">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={compact ? "input-field input-field-compact" : "input-field"}
          placeholder="Jane Smith"
        />
      </div>
      <ContactDetails compact dense={compact} />
      <button type="submit" className={`btn-primary w-full sm:w-auto ${compact ? "btn-primary-compact" : ""}`}>
        Request a Call Back
      </button>
    </form>
  );
}
