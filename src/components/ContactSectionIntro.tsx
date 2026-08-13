type ContactSectionIntroProps = {
  titleId?: string;
  compact?: boolean;
};

export function ContactSectionIntro({ titleId, compact = false }: ContactSectionIntroProps) {
  return (
    <>
      <h2
        id={titleId}
        className={`font-serif font-semibold text-secondary ${
          compact ? "text-2xl leading-tight" : "text-3xl md:text-4xl"
        }`}
      >
        Get in Touch
      </h2>
      <p className={`about-bio-text ${compact ? "mt-2 leading-snug" : "mt-4"}`}>
        Leave your phone number and we&apos;ll call you back to schedule a free consultation.
      </p>
    </>
  );
}
