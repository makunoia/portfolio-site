"use client";

import {track} from "@vercel/analytics";
import {useEffect} from "react";

import {trackPageView} from "@/app/(app)/lib/mixpanel-browser";

const AnalyticsTracker = ({page}: {page: string}) => {
  useEffect(() => {
    track("Viewed", {page});
    trackPageView({page_name: page});
  }, [page]);
  return null;
};

export default AnalyticsTracker;
