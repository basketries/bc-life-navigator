import { createServerFn } from "@tanstack/react-start";
import { getActiveAdapter } from "./adapters";
import type { Lead, LeadSubmitResult } from "./types";

// Single server entrypoint for every form on the site.
// Forms call this via useServerFn — they never talk to a CRM directly.
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: Lead) => {
    if (!data?.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      throw new Error("A valid email is required.");
    }
    if (!data.context?.source) {
      throw new Error("Lead source is required.");
    }
    return data;
  })
  .handler(async ({ data }): Promise<LeadSubmitResult> => {
    const adapter = getActiveAdapter();
    return adapter.submit(data);
  });
