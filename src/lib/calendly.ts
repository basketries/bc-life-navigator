// Modular Calendly configuration. Swap URLs here (or via env) without
// touching UI. Each consultation type can point to its own event type,
// and every booking link carries a `utm_source` so the CRM can track
// where the booking originated.

export type ConsultationTypeId =
  | "buying"
  | "moving"
  | "mortgage"
  | "planning"
  | "investment";

const FALLBACK = "https://calendly.com/settleinbc/discovery";

const URLS: Record<ConsultationTypeId, string> = {
  buying: import.meta.env.VITE_CALENDLY_BUYING ?? FALLBACK,
  moving: import.meta.env.VITE_CALENDLY_MOVING ?? FALLBACK,
  mortgage: import.meta.env.VITE_CALENDLY_MORTGAGE ?? FALLBACK,
  planning: import.meta.env.VITE_CALENDLY_PLANNING ?? FALLBACK,
  investment: import.meta.env.VITE_CALENDLY_INVESTMENT ?? FALLBACK,
};

export function calendlyUrl(type: ConsultationTypeId, source = "settleinbc_site") {
  const base = URLS[type];
  const url = new URL(base);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_campaign", type);
  return url.toString();
}
