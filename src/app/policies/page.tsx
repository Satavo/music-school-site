import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { Policies } from "@/components/Policies";

export const metadata: Metadata = {
  title: "Policies & Tuition",
  description:
    "Annual tuition, studio calendar, makeup lesson policy, and studio guidelines for Family Music Academy.",
};

export default async function PoliciesPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <>
      <PageHero
        from={from}
        minimal
        imageSrc="/images/tuition_hero.jpg"
        imageAlt="Piano ready for a lesson"
      />
      <Policies />
      <Contact deferred />
    </>
  );
}
