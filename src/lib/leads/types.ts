// Structured lead schema — CRM-agnostic.
// This shape is what every form on the site produces, and what every
// CRM adapter (HubSpot, Zoho, Lofty, custom webhook) consumes.

export type LeadSource =
  | "journey_picker"
  | "consultation"
  | "newsletter"
  | "event_registration"
  | "contact_form"
  | "resource_download"
  | "cost_calculator"
  | "neighbourhood_quiz";

export type VisitorGoal =
  | "newcomer"
  | "moving"
  | "buying"
  | "financing"
  | "planning"
  | "investing"
  | "learning"
  | "other";

export type Timeline =
  | "immediate"      // 0–3 months
  | "short"          // 3–6 months
  | "medium"         // 6–12 months
  | "long"           // 12+ months
  | "exploring";     // no timeline yet

export type ServiceInterest =
  | "buy_home"
  | "finance_home"
  | "protect_family"
  | "plan_future"
  | "build_wealth";

export interface LeadBasic {
  name?: string;
  email: string;
  phone?: string;
}

export interface LeadJourney {
  goal?: VisitorGoal;
  timeline?: Timeline;
  locationInterest?: string;         // free text (e.g. "Victoria, Vancouver Island")
  serviceInterests?: ServiceInterest[];
}

export interface LeadEngagement {
  resourceDownloaded?: string;       // slug or title
  eventRegistered?: string;          // event id or title
  consultationRequested?: string;    // consultation type id
  message?: string;                  // free-text
}

export interface LeadContext {
  source: LeadSource;
  pageUrl?: string;
  referrer?: string;
  utm?: Record<string, string>;
  submittedAt: string;               // ISO
}

export interface Lead extends LeadBasic {
  journey?: LeadJourney;
  engagement?: LeadEngagement;
  context: LeadContext;
  consent?: {
    marketing?: boolean;
    terms?: boolean;
  };
}

export interface LeadSubmitResult {
  ok: boolean;
  provider: string;
  id?: string;
  error?: string;
}
