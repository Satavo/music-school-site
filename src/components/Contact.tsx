"use client";

import { useEffect, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { CONTACT_REVEAL_EVENT } from "@/lib/scroll";

type ContactProps = {
  className?: string;
  /** Hide until a consultation CTA is clicked */
  deferred?: boolean;
};

export function Contact({ className = "", deferred = false }: ContactProps) {
  const [visible, setVisible] = useState(!deferred);

  useEffect(() => {
    if (!deferred) return;

    if (window.location.hash === "#contact") {
      setVisible(true);
    }

    const onReveal = () => setVisible(true);
    window.addEventListener(CONTACT_REVEAL_EVENT, onReveal);
    return () => window.removeEventListener(CONTACT_REVEAL_EVENT, onReveal);
  }, [deferred]);

  if (!visible) return null;

  return (
    <section id="contact" className={`py-24 md:py-32 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <div className="overflow-hidden rounded-3xl bg-secondary shadow-[0_20px_60px_rgba(61,24,35,0.25)]">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light md:text-base">
                  Contact
                </p>
                <h2 className="font-serif text-3xl font-semibold text-secondary-foreground md:text-4xl lg:text-5xl">
                  Get in Touch
                </h2>
                <p className="mt-6 text-base leading-relaxed text-secondary-foreground/85 md:text-lg">
                  Questions about lessons or ready to enroll? Schedule a free
                  consultation and we&apos;ll help you get started.
                </p>

                <div className="mt-10 space-y-4">
                  <a
                    href="mailto:familymusicacademyglenview@gmail.com"
                    className="flex items-center gap-4 text-base text-secondary-foreground/90 transition-colors hover:text-accent-light"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-foreground/10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    familymusicacademyglenview@gmail.com
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
