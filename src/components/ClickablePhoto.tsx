"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MediaLightbox, useMediaLightbox, type MediaLightboxItem } from "@/components/MediaLightbox";

type ClickablePhotoProps = {
  item: MediaLightboxItem;
  children: ReactNode;
  className?: string;
};

export function ClickablePhoto({ item, children, className = "" }: ClickablePhotoProps) {
  const { open, isClosing, show, close } = useMediaLightbox();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          show();
        }}
        aria-label={`View photo: ${item.alt}`}
        className={`cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-line focus-visible:ring-offset-2 ${className}`.trim()}
      >
        {children}
      </button>
      {mounted &&
        open &&
        createPortal(
          <MediaLightbox item={item} isClosing={isClosing} close={close} />,
          document.body,
        )}
    </>
  );
}
