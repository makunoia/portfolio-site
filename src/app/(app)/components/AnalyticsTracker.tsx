"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

export default ({ event }: { event: string }) => {
  useEffect(() => {
    track("Viewed", { page: event });
  }, []);
  return null;
};
