import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

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

export function getUserUUID() {
  let userUUID = localStorage.getItem("userUUID");
  if (!userUUID) {
    userUUID = uuidv4();
    localStorage.setItem("userUUID", userUUID);
  }
  return userUUID;
}
