"use client";

import { AnimateIn } from "@/components/AnimateIn";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn>
          <div className="overflow-hidden rounded-3xl bg-secondary shadow-[0_20px_60px_rgba(61,24,35,0.25)]">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light md:text-base">
                  Get in Touch
                </p>
                <h2 className="font-serif text-3xl font-semibold text-secondary-foreground md:text-4xl lg:text-5xl">
                  Begin Your Musical Journey
                </h2>
                <p className="mt-6 text-base leading-relaxed text-secondary-foreground/85 md:text-lg">
                  Ready to start lessons or have questions about our program? We&apos;d
                  love to hear from you. Schedule a free consultation to discuss your
                  goals and find the right path forward.
                </p>

                <div className="mt-10 space-y-4">
                  <a
                    href="mailto:info@familymusicacademy.com"
                    className="flex items-center gap-4 text-base text-secondary-foreground/90 transition-colors hover:text-accent-light"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-foreground/10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    info@familymusicacademy.com
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-4 text-base text-secondary-foreground/90 transition-colors hover:text-accent-light"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-foreground/10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="bg-dominant-muted/95 p-10 md:p-14">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! We will be in touch soon.");
                  }}
                >
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-secondary-dark md:text-base">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="input-field"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-secondary-dark md:text-base">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="input-field"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-secondary-dark md:text-base">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-secondary-dark md:text-base">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="input-field resize-none"
                      placeholder="Tell us about your musical goals..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
