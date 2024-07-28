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
            "group toast group-[.toaster]:bg group-[.toaster]:text group-[.toaster]:border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-subtle",
          actionButton: "group-[.toast]:bg-subtle group-[.toast]:text",
          cancelButton:
            "group-[.toast]:bg-subtle/90 group-[.toast]:text-subtle",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
