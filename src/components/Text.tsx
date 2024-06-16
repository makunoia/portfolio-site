import React, { ReactElement } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TextType = {
  children: string | ReactElement;
  size?:
    | "caption"
    | "body"
    | "body-large"
    | "overline"
    | "lead"
    | "heading"
    | "display";
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
  weight?: "normal" | "medium" | "semibold" | "bold";
  multiline?: boolean;
  className?: string;
};

const TextStyles = cva([], {
  variants: {
    size: {
      caption: "text-caption",
      body: "text-body",
      "body-large": "text-body-large",
      overline: "text-body-large capitalize",
      lead: "text-lead",
      heading: "text-heading",
      display: "text-display",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    multiline: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { multiline: true, size: "body", class: "leading-6" },
    { multiline: true, size: "lead", class: "leading-8" },
  ],
});

const Text = ({
  as: Component = "span",
  size,
  children,
  className,
  weight = "normal",
  multiline,
}: TextType) => {
  const styles = cn(TextStyles({ size, weight, multiline }), className);

  return <Component className={styles}>{children}</Component>;
};

export default Text;
