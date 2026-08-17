"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSectionReveal } from "@/components/SectionReveal";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
  underline?: boolean;
};

export function SectionTitle({ children, className = "", underline = true }: SectionTitleProps) {
  const sectionVisible = useSectionReveal();
  const ref = useRef<HTMLHeadingElement>(null);
  const [selfVisible, setSelfVisible] = useState(false);

  useEffect(() => {
    if (!underline || sectionVisible !== null) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible, underline]);

  const visible = underline && (sectionVisible ?? selfVisible);

  return (
    <h2
      ref={ref}
      className={`section-title ${underline ? "" : "section-title--plain"} ${visible ? "section-title-visible" : ""} ${className}`.trim()}
    >
      {children}
    </h2>
  );
}
