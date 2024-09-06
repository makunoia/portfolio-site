"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

export default ({ page }: { page: string }) => {
  useEffect(() => {
    track("Viewed", { page });
  }, []);
  return null;
};
