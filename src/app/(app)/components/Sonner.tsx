"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg-default group-[.toaster]:text-fg-default group-[.toaster]:border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-fg-subtle",
          actionButton: "group-[.toast]:bg-bg-subtle group-[.toast]:text-fg-default",
          cancelButton:
            "group-[.toast]:bg-bg-subtle/90 group-[.toast]:text-fg-subtle",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
