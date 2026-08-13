"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { openContactModal } from "@/lib/contact-modal";

type ContactLinkProps = {
  children: ReactNode;
  className?: string;
};

export function ContactLink({ children, className }: ContactLinkProps) {
  return (
    <Link
      href="/#contact"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        openContactModal();
      }}
    >
      {children}
    </Link>
  );
}
