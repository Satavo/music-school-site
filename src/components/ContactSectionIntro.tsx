type ContactSectionIntroProps = {
  titleId?: string;
  compact?: boolean;
  theme?: "dark" | "paper";
};

export function ContactSectionIntro({
  titleId,
  compact = false,
  theme = "dark",
}: ContactSectionIntroProps) {
  const isPaper = theme === "paper";
  const titleClass = isPaper ? "text-paper-foreground" : "text-dominant-foreground";
  const bodyClass = isPaper
    ? "text-lg leading-[1.8] text-paper-foreground md:text-[1.1875rem] md:leading-[1.85]"
    : "about-bio-text";

  return (
    <>
      <h2
        id={titleId}
        className={`font-serif font-semibold ${titleClass} ${
          compact ? "text-2xl leading-tight" : "text-3xl md:text-4xl"
        }`}
      >
        Get in Touch
      </h2>
      <p className={`${bodyClass} ${compact ? "mt-2 leading-snug" : "mt-4"}`}>
        Leave your phone number and we&apos;ll call you back to schedule a free consultation.
      </p>
    </>
  );
}
