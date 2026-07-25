# SettleInBC — CRM & Lead Integration

All forms on the site produce the same structured `Lead` object
(`src/lib/leads/types.ts`) and submit through one server function
(`submitLead`). The active CRM is chosen by a single env var, so you
can swap HubSpot ↔ Zoho ↔ Lofty ↔ custom webhook without touching UI.

## Switching CRM

Set `LEAD_CRM_PROVIDER` to one of:

| Provider  | Required env vars                                  |
|-----------|----------------------------------------------------|
| `console` | *(default — logs to server console)*               |
| `hubspot` | `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`           |
| `zoho`    | `ZOHO_WEBHOOK_URL` (Zoho Flow / CRM webhook)       |
| `lofty`   | `LOFTY_WEBHOOK_URL`                                |
| `webhook` | `CRM_WEBHOOK_URL` (Zapier / Make / n8n / custom)   |

Add a new CRM by implementing `LeadAdapter` in
`src/lib/leads/adapters.ts` and registering it in `ADAPTERS`.

## Lead schema

Every submission includes:

- **Basic:** name, email, phone
- **Journey:** goal, timeline, location interest, service interests
- **Engagement:** resource downloaded, event registered, consultation requested
- **Context:** source, page URL, referrer, UTM parameters, timestamp

## Forms wired to `submitLead`

| Form                     | Source                | Component                              |
|--------------------------|-----------------------|----------------------------------------|
| Start Your BC Journey    | `journey_picker`      | `src/components/site/JourneyPicker.tsx`|
| Consultation Request     | `consultation`        | `src/routes/consultation.tsx`          |
| Newsletter Signup        | `newsletter`          | `src/components/site/Newsletter.tsx`   |
| Event Registration       | `event_registration`  | `src/components/site/EventRegistration.tsx` |
| Contact form             | `contact_form`        | `src/routes/contact.tsx`               |

## Calendly

Configure per-consultation-type URLs via env (`VITE_CALENDLY_*`) — see
`src/lib/calendly.ts`. Every generated link carries `utm_source` and
`utm_campaign` so the CRM can attribute bookings to the right source.

## Automation flow

```
Visitor → Form submit → submitLead (server fn)
        → Active CRM adapter → CRM
        → CRM workflows (welcome email, task assignment)
        → Consultation booked (Calendly, with UTM)
        → Long-term nurture (newsletter, resources)
```
