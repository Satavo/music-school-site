"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { scrollToContact } from "@/lib/scroll";

type ContactLinkProps = {
  children: ReactNode;
  className?: string;
};

export function ContactLink({ children, className }: ContactLinkProps) {
  const pathname = usePathname();
  const href = pathname === "/" ? "/#contact" : "#contact";

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        scrollToContact(pathname);
      }}
    >
      {children}
    </Link>
  );
}
