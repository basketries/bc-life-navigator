## What's happening

The newsletter submit reaches your server and calls HubSpot, but HubSpot replies `404 Resource not found`.

Confirmed from the code and settings:
- `src/lib/leads/adapters.ts` sends newsletter leads to
  `https://api.hsforms.com/submissions/v3/integration/submit/{HUBSPOT_PORTAL_ID}/{HUBSPOT_NEWSLETTER_FORM_GUID}`
- All three secrets (`HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`, `HUBSPOT_NEWSLETTER_FORM_GUID`) exist, so the "not set" branch isn't the cause.

A 404 from that endpoint means only one thing: HubSpot cannot find a form with that GUID inside that portal. The most likely causes, in order:

1. `HUBSPOT_NEWSLETTER_FORM_GUID` is not an actual form GUID (e.g. it's a form *name*, a page ID, or an ID copied from the wrong part of the HubSpot URL).
2. The GUID belongs to a different HubSpot portal than `HUBSPOT_PORTAL_ID` (343477324 based on your tracking script).
3. Stray whitespace / quotes pasted into the secret value.

Note the other four forms use `HUBSPOT_FORM_GUID` and would fail the same way if that one were wrong — so this is specific to the newsletter GUID.

## Plan

1. **Harden the adapter** (`src/lib/leads/adapters.ts`)
   - Trim whitespace on portal ID and form GUID before building the URL.
   - Validate the GUID looks like a UUID (`8-4-4-4-12`); if not, return a clear error like `HUBSPOT_NEWSLETTER_FORM_GUID is not a valid form GUID` instead of firing a doomed request.
   - On a 404, return a friendlier diagnostic naming which env var was used and the portal it was tried against (no secret values leaked — GUIDs are not secrets, portal ID is public in your tracking script).

2. **Add a one-off verification step**
   Run a server-side check that submits a probe to both GUIDs and reports which resolves, so we know definitively whether it's the newsletter GUID alone or the portal ID.

3. **You re-copy the GUID** (needed if step 2 confirms the GUID is wrong)
   In HubSpot: Marketing → Forms → open the newsletter form → *Share* / *Embed code*. The embed snippet contains `formId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"` — that value is the GUID. Also confirm `portalId` in that same snippet matches `343477324`. I'll update the secret with what you paste.

4. **Graceful UX fallback** (optional, say if you want it)
   Right now a CRM failure surfaces as an error to the visitor. I can make the newsletter show a success state while logging the CRM failure server-side, so a misconfigured form never blocks a signup.

## Technical notes

Only `src/lib/leads/adapters.ts` changes. No routing, provider-selection, form UI, or page content is touched. The dual-form routing logic (newsletter → newsletter GUID, everything else → main GUID) stays exactly as is.
