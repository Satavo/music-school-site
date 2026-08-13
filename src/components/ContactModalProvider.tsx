"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ContactFormLazy } from "@/components/ContactFormLazy";
import { ContactSectionIntro } from "@/components/ContactSectionIntro";
import { registerContactModalHandlers } from "@/lib/contact-modal";

const MODAL_CLOSE_MS = 220;

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ContactModalDialog({
  isClosing,
  onClose,
}: {
  isClosing: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-root"
      role="dialog"
      aria-modal
      aria-labelledby="contact-modal-title"
    >
      <div className="modal-scrim" onClick={onClose} aria-hidden="true" />

      <div className="modal-overlay">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.5rem))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-10 hidden rounded-full border border-white/15 bg-white/10 p-2.5 text-secondary-foreground transition-colors hover:bg-white/20 lg:block lg:top-6 lg:right-6"
          aria-label="Close contact form"
        >
          <CloseIcon />
        </button>

        <div
          className={`contact-modal-panel relative z-10 w-full max-w-lg overflow-y-auto rounded-3xl border border-secondary/12 bg-dominant-surface shadow-[0_24px_64px_rgba(0,0,0,0.22)] ${
            isClosing ? "animate-lightbox-content-out" : "animate-lightbox-content-in"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative p-4 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2.5 right-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-secondary/15 bg-dominant-muted text-secondary transition-colors hover:border-secondary/30 hover:bg-secondary/8 sm:top-3 sm:right-3 sm:h-10 sm:w-10 lg:hidden"
              aria-label="Close contact form"
            >
              <CloseIcon />
            </button>
            <div className="pe-11 sm:pe-12 lg:pe-0">
              <ContactSectionIntro titleId="contact-modal-title" compact />
            </div>
            <div className="mt-4 sm:mt-6">
              <ContactFormLazy compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    if (isClosing || !open) return;

    setIsClosing(true);
    window.setTimeout(() => {
      if (window.location.hash === "#contact") {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      }

      setOpen(false);
      setIsClosing(false);
    }, MODAL_CLOSE_MS);
  }, [isClosing, open]);

  const openModal = useCallback(() => {
    setIsClosing(false);
    setOpen(true);

    const nextUrl = `${window.location.pathname}${window.location.search}#contact`;
    if (window.location.hash !== "#contact") {
      window.history.pushState(null, "", nextUrl);
    }
  }, []);

  useEffect(() => registerContactModalHandlers({ open: openModal, close: closeModal }), [
    openModal,
    closeModal,
  ]);

  useEffect(() => {
    if (!open && !isClosing) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlBackground = html.style.backgroundColor;
    const prevBodyBackground = body.style.backgroundColor;

    html.classList.add("modal-open");
    body.classList.add("modal-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.backgroundColor = "var(--secondary-dark)";
    body.style.backgroundColor = "var(--secondary-dark)";

    return () => {
      html.classList.remove("modal-open");
      body.classList.remove("modal-open");
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.backgroundColor = prevHtmlBackground;
      body.style.backgroundColor = prevBodyBackground;
    };
  }, [open, isClosing]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeModal]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#contact") {
        openModal();
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openModal]);

  return (
    <ContactModalContext.Provider value={{ open: openModal, close: closeModal }}>
      {children}
      {mounted && open
        ? createPortal(
            <ContactModalDialog isClosing={isClosing} onClose={closeModal} />,
            document.body,
          )
        : null}
    </ContactModalContext.Provider>
  );
}
