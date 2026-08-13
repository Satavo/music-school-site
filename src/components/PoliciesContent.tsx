import { AnimateIn } from "@/components/AnimateIn";
import { ContactLink } from "@/components/ContactLink";
import { PoliciesAccordion } from "@/components/PoliciesAccordion";

export function PoliciesContent() {
  return (
    <section id="policies" className="section-pad border-t border-secondary/10 bg-dominant">
      <div className="section-shell">
        <AnimateIn>
          <p className="section-eyebrow">Policies & Tuition</p>
          <h2 className="section-title max-w-3xl">Studio Policies</h2>
        </AnimateIn>

        <AnimateIn delay={80}>
          <PoliciesAccordion />
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="mt-8 flex justify-center">
            <ContactLink className="btn-primary">Enroll on lessons</ContactLink>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
