"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ContactForm } from "@/components/ContactForm";
import { ContactSectionIntro } from "@/components/ContactSectionIntro";
import { registerContactModalHandlers } from "@/lib/contact-modal";

const MODAL_CLOSE_MS = 280;

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ModalCloseButton({
  isClosing,
  visible,
  onClose,
  variant,
}: {
  isClosing: boolean;
  visible: boolean;
  onClose: () => void;
  variant: "floating" | "inline";
}) {
  const baseClass =
    variant === "floating"
      ? "modal-close modal-close-floating absolute top-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.5rem))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-10 hidden rounded-full border border-paper-line/15 bg-paper-muted p-2.5 text-paper-foreground hover:bg-paper-muted/80 lg:block lg:top-6 lg:right-6"
      : "modal-close modal-close-inline absolute top-2.5 right-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-paper-line/15 bg-paper-muted text-paper-foreground hover:border-paper-line/30 hover:bg-paper-muted/80 sm:top-3 sm:right-3 sm:h-10 sm:w-10 lg:hidden";

  return (
    <button
      type="button"
      onClick={onClose}
      tabIndex={visible && !isClosing ? 0 : -1}
      aria-hidden={isClosing || !visible}
      className={`${baseClass} ${isClosing ? "modal-close-hidden" : "modal-close-visible"}`}
      aria-label="Close contact form"
    >
      <CloseIcon />
    </button>
  );
}

function ContactModalPortal({
  open,
  isClosing,
  onClose,
}: {
  open: boolean;
  isClosing: boolean;
  onClose: () => void;
}) {
  const visible = open || isClosing;

  return (
    <div className="modal-root" aria-hidden={!open}>
      {visible ? (
        <div
          className={`modal-scrim ${isClosing ? "animate-lightbox-backdrop-out" : "animate-lightbox-backdrop-in"}`}
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`modal-overlay ${visible ? "" : "pointer-events-none invisible"}`}
        role={open ? "dialog" : undefined}
        aria-modal={open || undefined}
        aria-labelledby={open ? "contact-modal-title" : undefined}
      >
        <ModalCloseButton
          isClosing={isClosing}
          visible={visible}
          onClose={onClose}
          variant="floating"
        />

        <div
          className={`contact-modal-panel relative z-10 w-full max-w-lg overflow-y-auto rounded-3xl border border-paper-line/12 bg-paper text-paper-foreground shadow-[0_24px_64px_rgba(0,0,0,0.35)] ${
            visible
              ? isClosing
                ? "animate-lightbox-content-out"
                : "animate-lightbox-content-in"
              : "opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
          aria-hidden={!open}
        >
          <div className="relative p-4 sm:p-8">
            <ModalCloseButton
              isClosing={isClosing}
              visible={visible}
              onClose={onClose}
              variant="inline"
            />
            <div className="pe-11 sm:pe-12 lg:pe-0">
              <ContactSectionIntro titleId="contact-modal-title" compact theme="paper" />
            </div>
            <div className="mt-4 sm:mt-6">
              <ContactForm compact theme="paper" onSuccess={onClose} />
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
    <>
      {children}
      {mounted
        ? createPortal(
            <ContactModalPortal open={open} isClosing={isClosing} onClose={closeModal} />,
            document.body,
          )
        : null}
    </>
  );
}
