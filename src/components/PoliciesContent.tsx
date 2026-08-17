import { ContactLink } from "@/components/ContactLink";
import { PoliciesAccordion } from "@/components/PoliciesAccordion";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionTitle } from "@/components/SectionTitle";

export function PoliciesContent() {
  return (
    <section id="policies" className="policies-section section-pad border-t border-paper-line/10 bg-paper text-paper-foreground">
      <div className="section-shell">
        <SectionReveal>
          <SectionTitle className="max-w-3xl text-paper-foreground" underline={false}>
            Studio Policies
          </SectionTitle>

          <div className="mt-8">
            <PoliciesAccordion />
          </div>

          <div className="mt-8 flex justify-center">
            <ContactLink className="btn-primary">Enroll on lessons</ContactLink>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
