"use client";

import {useEffect, useRef} from "react";
import type {ReactNode} from "react";
import {usePathname, useSearchParams} from "next/navigation";

import {
  getDistinctIdFromCookie,
  identifyUser,
  initMixpanel,
  registerOnce,
  trackEvent,
  trackPageView,
} from "@/app/(app)/lib/mixpanel-browser";

type MixpanelProviderProps = {
  children: ReactNode;
  userId?: string;
  token?: string;
};

const MixpanelProvider = ({children, userId, token}: MixpanelProviderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    initMixpanel(token);

    const distinctId = userId ?? getDistinctIdFromCookie();

    if (distinctId) {
      identifyUser(distinctId);
      registerOnce({initial_path: window.location.pathname});
      // Minimal People profile to ensure "Users" shows data
      // Mixpanel requires identify() before people.set()
      try {
        // Only set once per session load to avoid noisy updates
        const stamped = sessionStorage.getItem("mp_people_set_once");
        if (!stamped) {
          // Example baseline profile values. Extend as needed.
          // We avoid PII here and just set a last_seen timestamp.
          // If you add email/name, follow your privacy rules first.
          (window as any).mixpanel?.people?.set_once?.({
            $created: new Date().toISOString(),
          });
          (window as any).mixpanel?.people?.set?.({
            last_seen: new Date().toISOString(),
          });
          sessionStorage.setItem("mp_people_set_once", "1");
        } else {
          (window as any).mixpanel?.people?.set?.({
            last_seen: new Date().toISOString(),
          });
        }
      } catch {}
    }
  }, [userId, token]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const text = anchor.textContent?.trim() ?? undefined;
      const isExternal = anchor.host && anchor.host !== window.location.host;
      const assistantSource =
        anchor.getAttribute("data-assistant-source") ?? undefined;

      if (assistantSource) {
        trackEvent("Assistant Link Clicked", {
          href,
          text,
          is_external: isExternal,
          target: anchor.getAttribute("target") ?? undefined,
          assistant_source: assistantSource,
        });
        return;
      }

      trackEvent("Link Clicked", {
        href,
        text,
        is_external: isExternal,
        target: anchor.getAttribute("target") ?? undefined,
      });
    };

    window.addEventListener("click", handleLinkClick, true);
    return () => window.removeEventListener("click", handleLinkClick, true);
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const fullPath = `${pathname}${
      searchParams?.toString() ? `?${searchParams}` : ""
    }`;

    if (previousPath.current === fullPath) return;
    previousPath.current = fullPath;

    trackPageView({
      path: pathname,
      search: searchParams?.toString() ?? undefined,
      referrer: document.referrer || undefined,
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
};

export default MixpanelProvider;
