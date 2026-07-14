import Image from "next/image";
import type { ReactNode } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { DIRECTOR } from "@/lib/content";

const BIO_HIGHLIGHTS: { phrase: string; tone: "burgundy" | "gold" }[] = [
  { phrase: "third-generation professional musician", tone: "burgundy" },
  { phrase: "St. Petersburg State Conservatory", tone: "burgundy" },
  { phrase: "Artist Diploma from Ball State University in Indiana", tone: "burgundy" },
  { phrase: "more than 15 years", tone: "gold" },
  { phrase: "music has the power to bring families together", tone: "gold" },
];

function highlightBio(text: string): ReactNode[] {
  type Piece = { start: number; end: number; tone: "burgundy" | "gold" };
  const matches: Piece[] = [];

  for (const { phrase, tone } of BIO_HIGHLIGHTS) {
    const start = text.indexOf(phrase);
    if (start === -1) continue;
    matches.push({ start, end: start + phrase.length, tone });
  }

  matches.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start < cursor) continue;
    if (match.start > cursor) {
      nodes.push(text.slice(cursor, match.start));
    }
    nodes.push(
      <span
        key={`${match.start}-${match.end}`}
        className={match.tone === "gold" ? "text-highlight-gold" : "text-highlight"}
      >
        {text.slice(match.start, match.end)}
      </span>,
    );
    cursor = match.end;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

export function AboutContent({
  compact = false,
}: {
  compact?: boolean;
  from?: string;
}) {
  return (
    <section className={compact ? undefined : "pt-20 pb-16 md:pt-24 md:pb-24"}>
      <div className={compact ? undefined : "mx-auto max-w-7xl px-6"}>
        <AboutMain compact={compact} />
      </div>
    </section>
  );
}

function AboutMain({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <AnimateIn>
          <h1 className="section-title max-w-2xl">Meet {DIRECTOR.name}</h1>
        </AnimateIn>
      )}

      <div
        className={`grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-10 ${
          compact ? "" : "mt-8 md:mt-10"
        }`}
      >
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="animate-fade-up">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-dominant-muted shadow-[0_16px_48px_rgba(61,24,35,0.14)] ring-1 ring-secondary/15">
              <Image
                src="/images/about.png"
                alt={`${DIRECTOR.name}, owner of Family Music Academy`}
                fill
                priority
                unoptimized
                className="object-cover object-[center_12%]"
                sizes="(max-width: 1024px) 90vw, 24rem"
              />
            </div>
          </div>
        </div>

        <div>
          <AnimateIn>
            <blockquote className="about-quote">
              <span className="about-quote-open" aria-hidden>
                “
              </span>
              <div className="about-quote-body">
                {DIRECTOR.paragraphs.map((paragraph, index) => {
                  const isLast = index === DIRECTOR.paragraphs.length - 1;
                  return (
                    <p key={paragraph.slice(0, 40)} className="about-bio-text">
                      {highlightBio(paragraph)}
                      {isLast && (
                        <span className="about-quote-close" aria-hidden>
                          ”
                        </span>
                      )}
                    </p>
                  );
                })}
              </div>
            </blockquote>

            <p className="about-quote-sign">
              — {DIRECTOR.name}, Owner of the Family Music Academy
            </p>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}
