## Goal

Swap the cost-of-living values for the 10 primary-tier cities to the supplied descriptive estimates, drop the now-unused "TBD / Coming soon" fallback UI, and add a short guidance note near displayed figures.

## Current state (verified)

- `src/data/cities.ts` already holds numeric cost values for all 18 cities (e.g. Vancouver `housing: "$2,089"`, `groceries: "$913"`, `transit: "$117.20 (TransLink 1-zone)"`). No `"TBD"` strings remain in the data.
- `COST_SOURCE_NOTE` (line 27) is rendered on city pages and the compare page.
- `src/components/site/CityPage.tsx` has an `isTbd()` guard plus a "Coming soon" empty-state block (lines 7–9, 114, 133–143).
- `src/routes/cities.compare.tsx` has the same `isTbd()` guard and a "Coming soon" cell (lines 48, 117).
- `src/routes/resources.cost-of-living-calculator.tsx` computes estimates from its own baseline table and shows an "Estimated — updated periodically" badge; it does not read city cost data.

## Changes

**1. `src/data/cities.ts`**

Replace `costOfLiving` for Vancouver, Victoria, Kelowna, Surrey, Burnaby, Richmond, Coquitlam, North Vancouver, Abbotsford, Nanaimo with the exact provided `housing` / `groceries` / `transit` / `notes` strings. Object shape unchanged. The other 8 cities keep their current values untouched.

Note: the new values are descriptive sentences rather than single figures, so the compare table cells and city cards will show longer text than today — that is expected given the copy provided.

**2. `src/components/site/CityPage.tsx`**

- Remove `isTbd()` and the `costReady` conditional; always render the three cost cards plus `notes` when `costOfLiving` is present (keep a simple null guard).
- Delete the "Coming soon" dashed block.
- Keep `COST_SOURCE_NOTE`, and add under the cost figures: "Estimates based on market reports, updated periodically — for guidance only".

**3. `src/routes/cities.compare.tsx`**

- Remove `isTbd()` and the "Coming soon" cell fallback; render values directly.
- Add the same guidance note line alongside `COST_SOURCE_NOTE`.

**4. `src/routes/resources.cost-of-living-calculator.tsx`**

- Replace the "Estimated — updated periodically" badge text with the guidance note wording, and add the note under the estimated monthly total block. No change to the calculation logic, form, or lead submission.

## Out of scope

No routing, form, lead-capture, or other content changes. Finish with a TypeScript check and a build to confirm both pass.
