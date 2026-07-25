// Client-side helpers for capturing browser context (UTM, referrer, page)
// and calling the server submitLead function.

import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "./submitLead.functions";
import type { Lead, LeadContext, LeadSource } from "./types";

export function readContext(source: LeadSource): LeadContext {
  if (typeof window === "undefined") {
    return { source, submittedAt: new Date().toISOString() };
  }
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return {
    source,
    pageUrl: window.location.href,
    referrer: document.referrer || undefined,
    utm: Object.keys(utm).length ? utm : undefined,
    submittedAt: new Date().toISOString(),
  };
}

export function useSubmitLead() {
  const fn = useServerFn(submitLead);
  return (lead: Omit<Lead, "context"> & { context?: Partial<LeadContext>; source: LeadSource }) => {
    const { source, context, ...rest } = lead;
    const merged: Lead = {
      ...rest,
      context: { ...readContext(source), ...context },
    };
    return fn({ data: merged });
  };
}
