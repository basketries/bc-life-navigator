import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import { cities } from "@/data/cities";
import { useSubmitLead } from "@/lib/leads/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, ShoppingBasket, Bus, Plug, HeartPulse, Info } from "lucide-react";

export const Route = createFileRoute("/resources/cost-of-living-calculator")({
  head: () => ({
    meta: [
      { title: "BC Cost of Living Calculator — SettleInBC" },
      {
        name: "description",
        content:
          "Estimate monthly living costs in British Columbia by city and household size — housing, groceries, transit, and utilities, in clearly marked estimated ranges.",
      },
      { property: "og:title", content: "BC Cost of Living Calculator" },
      {
        property: "og:description",
        content:
          "Estimate monthly costs by BC city and household size: housing, groceries, transit, and utilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:url",
        content: "https://settleinbc.com/resources/cost-of-living-calculator",
      },
    ],
    links: [{ rel: "canonical", href: "/resources/cost-of-living-calculator" }],
  }),
  component: CostOfLivingCalculator,
});

type HouseholdId = "single" | "couple" | "family_small" | "family_large";

const HOUSEHOLDS: {
  id: HouseholdId;
  label: string;
  bedrooms: "1BR" | "2BR" | "3BR";
  multiplier: number;
}[] = [
  { id: "single", label: "1 person", bedrooms: "1BR", multiplier: 1 },
  { id: "couple", label: "2 people", bedrooms: "2BR", multiplier: 1.6 },
  { id: "family_small", label: "Family of 3–4", bedrooms: "3BR", multiplier: 2.2 },
  { id: "family_large", label: "Family of 5+", bedrooms: "3BR", multiplier: 2.7 },
];

// Placeholder baselines for a single person, in CAD per month.
// These are illustrative ranges only — replace with verified data when available.
const BASELINE: Record<
  "housing1BR" | "housing2BR" | "housing3BR" | "groceries" | "transit" | "utilities",
  [number, number]
> = {
  housing1BR: [1600, 2400],
  housing2BR: [2200, 3300],
  housing3BR: [2900, 4300],
  groceries: [350, 550],
  transit: [110, 220],
  utilities: [90, 180],
};

// Rough relative cost index per region — illustrative, not verified.
const REGION_INDEX: Record<string, number> = {
  "Metro Vancouver": 1.0,
  "Vancouver Island": 0.85,
  Okanagan: 0.82,
  "Fraser Valley": 0.78,
  Kootenays: 0.7,
  "Northern BC": 0.68,
  "Thompson-Nicola": 0.72,
};

function indexFor(region: string) {
  return REGION_INDEX[region] ?? 0.8;
}

const money = (n: number) =>
  `$${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const range = ([lo, hi]: [number, number], factor: number): string =>
  `${money(lo * factor)} – ${money(hi * factor)}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CostOfLivingCalculator() {
  const sorted = useMemo(
    () => [...cities].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );
  const [citySlug, setCitySlug] = useState(sorted[0]?.slug ?? "vancouver");
  const [householdId, setHouseholdId] = useState<HouseholdId>("single");

  const city = sorted.find((c) => c.slug === citySlug) ?? sorted[0];
  const household = HOUSEHOLDS.find((h) => h.id === householdId)!;

  const idx = indexFor(city.region);

  const housingKey =
    household.bedrooms === "1BR"
      ? "housing1BR"
      : household.bedrooms === "2BR"
        ? "housing2BR"
        : "housing3BR";

  const breakdown = [
    {
      icon: Home,
      label: `Housing — rent (${household.bedrooms})`,
      value: range(BASELINE[housingKey], idx),
      note: "Market rent for a typical unit. Purchase costs differ significantly.",
    },
    {
      icon: ShoppingBasket,
      label: "Groceries",
      value: range(BASELINE.groceries, idx * household.multiplier),
      note: "Scales with household size and eating-at-home habits.",
    },
    {
      icon: Bus,
      label: "Transit / transportation",
      value: range(BASELINE.transit, idx * Math.min(household.multiplier, 2)),
      note: "Transit passes where service is strong; higher if you rely on a car.",
    },
    {
      icon: Plug,
      label: "Utilities",
      value: range(BASELINE.utilities, idx * Math.min(household.multiplier, 1.8)),
      note: "Hydro, heat, water and internet vary by building age and season.",
    },
  ];

  const total = (() => {
    const lo =
      BASELINE[housingKey][0] * idx +
      BASELINE.groceries[0] * idx * household.multiplier +
      BASELINE.transit[0] * idx * Math.min(household.multiplier, 2) +
      BASELINE.utilities[0] * idx * Math.min(household.multiplier, 1.8);
    const hi =
      BASELINE[housingKey][1] * idx +
      BASELINE.groceries[1] * idx * household.multiplier +
      BASELINE.transit[1] * idx * Math.min(household.multiplier, 2) +
      BASELINE.utilities[1] * idx * Math.min(household.multiplier, 1.8);
    return `${money(lo)} – ${money(hi)}`;
  })();

  return (
    <RevealGroup>
      <PageHero
        eyebrow="Calculator"
        title="What does life in BC actually cost?"
        description="Pick a city and a household size to see an estimated monthly cost picture — housing, groceries, transportation, and utilities."
      />

      <section className="container-page my-12">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="city-select">
              City
            </label>
            <Select value={citySlug} onValueChange={setCitySlug}>
              <SelectTrigger id="city-select" className="h-12 rounded-xl">
                <SelectValue placeholder="Choose a city" />
              </SelectTrigger>
              <SelectContent>
                {sorted.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name} — {c.region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="household-select">
              Household size
            </label>
            <Select
              value={householdId}
              onValueChange={(v) => setHouseholdId(v as HouseholdId)}
            >
              <SelectTrigger id="household-select" className="h-12 rounded-xl">
                <SelectValue placeholder="Choose household size" />
              </SelectTrigger>
              <SelectContent>
                {HOUSEHOLDS.map((h) => (
                  <SelectItem key={h.id} value={h.id}>
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="container-page my-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Estimated monthly costs</p>
            <h2 className="mt-2 text-2xl md:text-3xl text-foreground">
              {city.name}, {household.label.toLowerCase()}
            </h2>
          </div>
          <span className="rounded-full border border-border bg-secondary px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
            Estimated — updated periodically
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {breakdown.map((b) => (
            <article
              key={b.label}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <b.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-base text-foreground">{b.label}</h3>
              <p className="mt-2 font-serif text-3xl text-foreground">{b.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Estimated monthly total</p>
            <p className="mt-1 font-serif text-4xl text-foreground">{total}</p>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A planning range, not a quote. Your actual costs depend on the neighbourhood,
            building, and lifestyle you choose.
          </p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <HeartPulse className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-base text-foreground">Healthcare isn&rsquo;t a line item</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Medical care in British Columbia is publicly funded through the Medical Services
              Plan (MSP), and there are no monthly MSP premiums for residents. Unlike in the US,
              you don&rsquo;t budget a monthly health insurance payment. Newcomers do have a
              waiting period before coverage begins, and extras like dental, vision, and
              prescriptions are usually covered by an employer plan or paid out of pocket.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Info className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-base text-foreground">How to read these numbers</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              These are estimated ranges built from regional cost patterns, not verified
              current market data. They&rsquo;re here to help you sanity-check a budget while
              you plan. We review and refine them periodically, and we&rsquo;ll replace them
              with sourced figures as we add them.
            </p>
          </div>
        </div>
      </section>

      <EmailBreakdown cityName={city.name} householdLabel={household.label} total={total} />
    </RevealGroup>
  );
}

function EmailBreakdown({
  cityName,
  householdLabel,
  total,
}: {
  cityName: string;
  householdLabel: string;
  total: string;
}) {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  return (
    <section className="container-page my-16">
      <div className="rounded-3xl border border-border bg-primary text-primary-foreground p-8 md:p-12 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-3 text-primary-foreground/70">Save your estimate</p>
          <h3 className="font-serif text-3xl md:text-4xl leading-tight">
            Email me this breakdown
          </h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            We&rsquo;ll send your {cityName} estimate for a household of {householdLabel.toLowerCase()},
            plus context on what drives each cost.
          </p>
        </div>
        <form
          className="grid gap-3"
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") || "").trim();
            const email = String(fd.get("email") || "").trim();
            const errs: { name?: string; email?: string } = {};
            if (!name) errs.name = "Please enter your name.";
            if (!email) errs.email = "Please enter your email address.";
            else if (!EMAIL_RE.test(email)) errs.email = "Please enter a valid email address.";
            setFieldErrors(errs);
            if (Object.keys(errs).length) return;

            setState("sending");
            setError(null);
            const res = await submit({
              source: "cost_calculator",
              name,
              email,
              journey: { locationInterest: cityName },
              engagement: {
                message: `Cost of living estimate — City: ${cityName}; Household: ${householdLabel}; Estimated monthly total: ${total}`,
              },
            });
            if (res.ok) setState("done");
            else {
              setError(res.error ?? "Something went wrong.");
              setState("error");
            }
          }}
        >
          {state === "done" ? (
            <p className="text-primary-foreground bg-primary-foreground/10 rounded-xl p-4">
              Thanks — your breakdown is on the way.
            </p>
          ) : (
            <>
              <div className="grid gap-1">
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  aria-label="Your name"
                  aria-invalid={!!fieldErrors.name}
                  onChange={() => setFieldErrors((p) => ({ ...p, name: undefined }))}
                  className="h-12 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-4 placeholder:text-primary-foreground/50"
                />
                {fieldErrors.name && (
                  <p role="alert" className="text-sm text-primary-foreground/90">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={!!fieldErrors.email}
                  onChange={() => setFieldErrors((p) => ({ ...p, email: undefined }))}
                  className="h-12 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-4 placeholder:text-primary-foreground/50"
                />
                {fieldErrors.email && (
                  <p role="alert" className="text-sm text-primary-foreground/90">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="h-12 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-95 disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Email me this breakdown"}
              </button>
              {error && <p className="text-sm text-primary-foreground/90">{error}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
