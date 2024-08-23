"use client";

import tracker from "@/lib/mixpanel";
import { useEffect } from "react";

export default ({ event }: { event: string }) => {
  useEffect(() => {
    tracker(event);
  }, []);
  return null;
};
