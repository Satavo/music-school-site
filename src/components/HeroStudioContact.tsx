"use client";

import { useLayoutEffect, useRef } from "react";
import { SCHOOL_CONTACT } from "@/lib/content";

export function HeroStudioContact() {
  const addressRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const address = addressRef.current;
    const email = emailRef.current;
    if (!address || !email) return;

    const fit = () => {
      email.style.fontSize = "";
      const target = address.getBoundingClientRect().width;
      const current = email.getBoundingClientRect().width;
      if (target <= 0 || current <= 0 || current <= target) return;

      const base = parseFloat(getComputedStyle(email).fontSize);
      email.style.fontSize = `${(base * target) / current}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(address);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <aside className="animate-fade-up-delay-2 justify-self-end lg:pt-11">
      <div className="inline-block max-w-full text-right">
        <p
          ref={addressRef}
          className="font-sans text-[1.35rem] font-medium leading-[1.35] tracking-wide text-secondary-foreground md:text-[1.5rem]"
        >
          {SCHOOL_CONTACT.addressLines.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </p>
        <a
          ref={emailRef}
          href={SCHOOL_CONTACT.emailHref}
          className="mt-5 block whitespace-nowrap font-serif text-lg leading-none text-secondary-foreground/80 transition-colors hover:text-accent-light md:text-xl"
        >
          {SCHOOL_CONTACT.email}
        </a>
      </div>
    </aside>
  );
}
