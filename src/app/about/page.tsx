import type { Metadata } from "next";
import { About } from "@/components/About";
import { AboutPerformances } from "@/components/AboutPerformances";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Meet Maria Alexeeva",
  description:
    "Meet Maria Alexeeva, third-generation pianist and owner of Family Music Academy — St. Petersburg Conservatory graduate with over 15 years of teaching experience.",
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <>
      <About from={from} />
      <AboutPerformances />
      <Contact deferred className="!pt-32 md:!pt-44" />
    </>
  );
}
