"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME_RETURN_KEY, backToHomeHref, isHomeSection } from "@/lib/navigation";

type BackToHomeLinkProps = {
  from?: string;
  variant?: "hero" | "light";
};

const VARIANT_CLASS = {
  hero: "border border-secondary-foreground/30 bg-white/8 text-secondary-foreground/80 backdrop-blur-sm hover:bg-white/15 hover:text-secondary-foreground",
  light:
    "border border-secondary/15 bg-dominant-surface text-dominant-foreground/70 shadow-sm hover:border-secondary/30 hover:text-secondary",
} as const;

export function BackToHomeLink({ from, variant = "hero" }: BackToHomeLinkProps) {
  const [href, setHref] = useState(() => backToHomeHref(from));

  useEffect(() => {
    if (isHomeSection(from)) {
      sessionStorage.setItem(HOME_RETURN_KEY, from);
      setHref(backToHomeHref(from));
      return;
    }

    const stored = sessionStorage.getItem(HOME_RETURN_KEY);
    if (isHomeSection(stored)) {
      setHref(backToHomeHref(stored));
    }
  }, [from]);

  return (
    <Link
      href={href}
      className={`animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${VARIANT_CLASS[variant]}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Home
    </Link>
  );
}
