"use client";

import { useEffect, useRef, useState } from "react";
import { AdvancedTrackCard } from "@/components/AdvancedTrackCard";
import { CurriculumLevelCard } from "@/components/CurriculumLevelCard";
import { CURRICULUM_LEVELS } from "@/lib/content";

export function CurriculumPathsGrid() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = layoutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={layoutRef} className="curriculum-paths-layout">
      {CURRICULUM_LEVELS.map((level, index) => {
        const itemClass = "curriculum-paths-item";
        const ready = index >= 2 || sectionVisible;

        return (
          <div
            key={level.title}
            className={`${itemClass} transition-all duration-700 ease-out ${
              ready ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: index < 2 ? `${index * 80}ms` : undefined }}
          >
            <CurriculumLevelCard level={level} index={index} />
          </div>
        );
      })}

      <div className="curriculum-paths-item translate-y-0 opacity-100">
        <AdvancedTrackCard />
      </div>
    </div>
  );
}
