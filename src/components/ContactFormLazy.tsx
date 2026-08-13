"use client";

import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "@/components/ContactFormSkeleton";

const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((mod) => mod.ContactForm),
  {
    ssr: false,
    loading: () => <ContactFormSkeleton />,
  },
);

export function ContactFormLazy({ compact = false }: { compact?: boolean }) {
  return <ContactForm compact={compact} />;
}
