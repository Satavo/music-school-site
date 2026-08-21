type ContactModalHandlers = {
  open: () => void;
  close: () => void;
};

let handlers: ContactModalHandlers | null = null;

export function registerContactModalHandlers(next: ContactModalHandlers) {
  handlers = next;
  return () => {
    if (handlers === next) {
      handlers = null;
    }
  };
}

export function openContactModal() {
  handlers?.open();
}
