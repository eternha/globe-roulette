import posthog from "posthog-js";
import { setAnalyticsAdapter } from "./analytics";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined ?? "https://eu.i.posthog.com";

export function initPostHog(): void {
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false,
  });

  setAnalyticsAdapter((event) => {
    posthog.capture(event.type, event.properties);
  });
}
