import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      "font-size": [
        "text-caption",
        "text-body",
        "text-body-large",
        "text-lead",
        "text-heading",
        "text-display",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
