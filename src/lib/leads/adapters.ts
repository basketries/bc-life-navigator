// Modular CRM adapters. The active adapter is chosen at runtime by
// LEAD_CRM_PROVIDER. All adapters share the same signature so swapping
// providers never touches form code.
//
// Supported today:
//   - hubspot     (Forms API — no secret required)
//   - zoho        (Webhook / Flow endpoint)
//   - lofty       (Webhook)
//   - webhook     (Generic — any CRM that accepts JSON POST)
//   - console     (Default: logs to server console, useful before CRM is wired up)
//
// To add another CRM later, implement `LeadAdapter` and register it in ADAPTERS.

import type { Lead, LeadSubmitResult } from "./types";

export interface LeadAdapter {
  name: string;
  submit(lead: Lead): Promise<LeadSubmitResult>;
}

// ---------- Console (default / no-op) ----------
const consoleAdapter: LeadAdapter = {
  name: "console",
  async submit(lead) {
    console.log("[lead:console]", JSON.stringify(lead));
    return { ok: true, provider: "console" };
  },
};

// ---------- Generic Webhook ----------
// Works for Zoho Flow, Lofty webhooks, Zapier, Make, n8n, or any custom CRM.
function webhookAdapter(name: string, urlEnv: string): LeadAdapter {
  return {
    name,
    async submit(lead) {
      const url = process.env[urlEnv];
      if (!url) return { ok: false, provider: name, error: `${urlEnv} not set` };
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
        if (!res.ok) {
          const body = await res.text();
          return { ok: false, provider: name, error: `${res.status} ${body}` };
        }
        return { ok: true, provider: name };
      } catch (e) {
        return { ok: false, provider: name, error: (e as Error).message };
      }
    },
  };
}

// ---------- HubSpot Forms API ----------
// No secret required. Configure HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID.
const GUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const hubspotAdapter: LeadAdapter = {
  name: "hubspot",
  async submit(lead) {
    const portalId = (process.env.HUBSPOT_PORTAL_ID ?? "").trim().replace(/^["']|["']$/g, "");
    const isNewsletter = lead.context.source === "newsletter";
    const guidVar = isNewsletter ? "HUBSPOT_NEWSLETTER_FORM_GUID" : "HUBSPOT_FORM_GUID";
    const formGuid = (process.env[guidVar] ?? "").trim().replace(/^["']|["']$/g, "");
    if (!portalId || !formGuid) {
      return {
        ok: false,
        provider: "hubspot",
        error: `HUBSPOT_PORTAL_ID/${guidVar} not set`,
      };
    }
    if (!GUID_RE.test(formGuid)) {
      return {
        ok: false,
        provider: "hubspot",
        error: `${guidVar} is not a valid HubSpot form GUID (expected xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`,
      };
    }

    const fields = (
      isNewsletter
        ? [
            { name: "email", value: lead.email },
            { name: "firstname", value: lead.name ?? "" },
          ]
        : [
            { name: "email", value: lead.email },
            { name: "firstname", value: lead.name ?? "" },
            { name: "phone", value: lead.phone ?? "" },
            { name: "visitor_goal", value: lead.journey?.goal ?? "" },
            { name: "timeline", value: lead.journey?.timeline ?? "" },
            { name: "location_interest", value: lead.journey?.locationInterest ?? "" },
            { name: "service_interest", value: (lead.journey?.serviceInterests ?? []).join(",") },
            { name: "resource_downloaded", value: lead.engagement?.resourceDownloaded ?? "" },
            { name: "event_registered", value: lead.engagement?.eventRegistered ?? "" },
            { name: "consultation_requested", value: lead.engagement?.consultationRequested ?? "" },
            { name: "message", value: lead.engagement?.message ?? "" },
            { name: "lead_source", value: lead.context.source },
          ]
    ).filter((f) => f.value !== "");


    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields,
            context: {
              pageUri: lead.context.pageUrl,
              pageName: lead.context.source,
            },
          }),
        },
      );
      if (!res.ok) {
        return { ok: false, provider: "hubspot", error: `${res.status} ${await res.text()}` };
      }
      return { ok: true, provider: "hubspot" };
    } catch (e) {
      return { ok: false, provider: "hubspot", error: (e as Error).message };
    }
  },
};

const ADAPTERS: Record<string, LeadAdapter> = {
  console: consoleAdapter,
  hubspot: hubspotAdapter,
  zoho: webhookAdapter("zoho", "ZOHO_WEBHOOK_URL"),
  lofty: webhookAdapter("lofty", "LOFTY_WEBHOOK_URL"),
  webhook: webhookAdapter("webhook", "CRM_WEBHOOK_URL"),
};

export function getActiveAdapter(): LeadAdapter {
  const key = (process.env.LEAD_CRM_PROVIDER || "console").toLowerCase();
  return ADAPTERS[key] ?? consoleAdapter;
}
