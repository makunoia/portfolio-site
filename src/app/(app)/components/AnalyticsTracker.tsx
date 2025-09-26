"use client";

import {useEffect} from "react";

import {trackPageView} from "@/app/(app)/lib/mixpanel-browser";

const AnalyticsTracker = ({page}: {page: string}) => {
  useEffect(() => {
    trackPageView({page_name: page});
  }, [page]);
  return null;
};

export default AnalyticsTracker;
