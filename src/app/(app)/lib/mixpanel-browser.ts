"use client";

import mixpanel from "mixpanel-browser";

type EventProperties = Record<string, unknown> | undefined;

let isInitialized = false;
let providedToken: string | null = null;

const getToken = () => {
  if (providedToken) return providedToken;
  return (
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? process.env.MIXPANEL_TOKEN ?? ""
  );
};

export const initMixpanel = (tokenOverride?: string) => {
  if (tokenOverride) {
    providedToken = tokenOverride;
  }

  if (isInitialized || typeof window === "undefined") return;

  const token = getToken();

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Mixpanel token is missing. Skipping initialization.");
    }
    return;
  }

  mixpanel.init(token, {
    autocapture: true,
    debug: process.env.NODE_ENV !== "production",
    persistence: "localStorage",
    track_pageview: true,
    record_sessions_percent: 100,
    ignore_dnt: true,
  });

  try {
    (window as typeof window & {mixpanel?: typeof mixpanel}).mixpanel =
      mixpanel;
  } catch {}

  isInitialized = true;
};

const ensureInit = () => {
  if (!isInitialized) {
    initMixpanel();
  }
  return isInitialized;
};

export const identifyUser = (distinctId: string | undefined | null) => {
  if (!distinctId || !ensureInit()) return;
  mixpanel.identify(distinctId);
};

export const aliasUser = (
  distinctId: string | undefined | null,
  originalId?: string | null
) => {
  if (!distinctId || !ensureInit()) return;
  try {
    mixpanel.alias(distinctId, originalId ?? undefined);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Mixpanel alias failed", error);
    }
  }
};

export const registerOnce = (props: Record<string, unknown>) => {
  if (!ensureInit()) return;
  mixpanel.register_once(props);
};

export const setPeopleProperties = (props: Record<string, unknown>) => {
  if (!ensureInit()) return;
  mixpanel.people.set(props);
};

export const trackEvent = (event: string, properties?: EventProperties) => {
  if (!ensureInit()) return;
  mixpanel.track(event, properties);
};

export const trackPageView = (properties?: EventProperties) => {
  trackEvent("Page Viewed", properties);
};

export const getMixpanel = () => {
  if (!ensureInit()) return null;
  return mixpanel;
};

export const resetMixpanel = () => {
  if (!ensureInit()) return;
  mixpanel.reset();
};

export const getDistinctIdFromCookie = () => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|; )userUUID=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
};
