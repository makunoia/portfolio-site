"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {X} from "lucide-react";
import {cn} from "@/lib/utils";
import Text from "@/components/Text";
import {m, LazyMotion, domAnimation, AnimatePresence} from "motion/react";
import {useState} from "react";

type ModalProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Modal = ({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
}: ModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const resolvedTitle = title?.trim();

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <LazyMotion features={domAnimation}>
      <Dialog.Root open={currentOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <AnimatePresence>
          {currentOpen ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <m.div
                  key="modal-overlay"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.2}}
                  className="fixed inset-0 z-[60] bg-[rgba(10,14,24,0.65)] backdrop-blur-md"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <m.div
                  key="modal-content"
                  initial={{opacity: 0, y: 16}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 12}}
                  transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                  className={cn(
                    "fixed left-1/2 top-1/2 z-[65] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2",
                    "rounded-16px border border-border-subtle bg-bg-default p-24px",
                    "shadow-[0_24px_60px_-32px_color-mix(in_oklch,var(--shadow-default)_65%,transparent)]",
                    "focus:outline-none"
                  )}
                >
                  <div className="flex flex-col gap-16px">
                    <div className="flex items-start justify-between gap-12px">
                      <div className="flex flex-col gap-8px">
                        <Dialog.Title asChild>
                          <Text as="h2" size="lead" weight="medium">
                            {resolvedTitle}
                          </Text>
                        </Dialog.Title>
                        {description ? (
                          <Dialog.Description asChild>
                            <Text
                              as="p"
                              size="body"
                              className="text-fg-subtle"
                              multiline
                            >
                              {description}
                            </Text>
                          </Dialog.Description>
                        ) : null}
                      </div>

                      <Dialog.Close asChild>
                        <button
                          className="rounded-8px p-6px text-fg-subtle transition-colors hover:bg-bg-subtle/70 hover:text-fg-default"
                          aria-label="Close"
                        >
                          <X size={16} />
                        </button>
                      </Dialog.Close>
                    </div>

                    <div>{children}</div>
                  </div>
                </m.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </LazyMotion>
  );
};

export default Modal;
