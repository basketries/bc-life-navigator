import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import { useSubmitLead } from "@/lib/leads/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck, Home, Boxes, Receipt, Info } from "lucide-react";

export const Route = createFileRoute("/resources/moving-cost-estimator")({
  head: () => ({
    meta: [
      { title: "Moving Cost Estimator — Moving to BC | SettleInBC" },
      {
        name: "description",
        content:
          "Estimate what your move to British Columbia could cost — movers or shipping, temporary housing, storage, and setup costs, in clearly marked estimated ranges.",
      },
      { property: "og:title", content: "BC Moving Cost Estimator" },
      {
        property: "og:description",
        content:
          "Estimate movers, shipping, storage, temporary housing, and setup costs for your move to BC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://settleinbc.com/resources/moving-cost-estimator" },
    ],
    links: [{ rel: "canonical", href: "/resources/moving-cost-estimator" }],
  }),
  component: MovingCostEstimator,
});

type OriginId = "bc" | "canada" | "usa" | "international";
type MoveSizeId = "studio" | "one_br" | "two_br" | "house";

const ORIGINS: { id: OriginId; label: string; factor: number; tempHousing: boolean }[] = [
  { id: "bc", label: "Elsewhere in BC", factor: 1, tempHousing: false },
  { id: "canada", label: "Elsewhere in Canada", factor: 2.6, tempHousing: true },
  { id: "usa", label: "United States", factor: 3.2, tempHousing: true },
  { id: "international", label: "International", factor: 4.5, tempHousing: true },
];

const MOVE_SIZES: { id: MoveSizeId; label: string; factor: number; weeks: number }[] = [
  { id: "studio", label: "Studio", factor: 0.7, weeks: 2 },
  { id: "one_br", label: "1 bedroom", factor: 1, weeks: 2 },
  { id: "two_br", label: "2 bedrooms", factor: 1.5, weeks: 3 },
  { id: "house", label: "House (3+ bedrooms)", factor: 2.2, weeks: 4 },
];

// Illustrative baselines in CAD for a 1-bedroom local move.
const BASE_MOVERS: [number, number] = [900, 1600];
const BASE_STORAGE_MONTH: [number, number] = [120, 300];
const BASE_TEMP_HOUSING_WEEK: [number, number] = [700, 1500];
const BASE_SETUP: [number, number] = [400, 1200];

const money = (n: number) =>
  `$${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const range = ([lo, hi]: [number, number], factor: number) =>
  `${money(lo * factor)} – ${money(hi * factor)}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function MovingCostEstimator() {
  const [originId, setOriginId] = useState<OriginId>("canada");
  const [sizeId, setSizeId] = useState<MoveSizeId>("one_br");
  const [storage, setStorage] = useState(false);

  const origin = ORIGINS.find((o) => o.id === originId)!;
  const size = MOVE_SIZES.find((s) => s.id === sizeId)!;

  const moversFactor = origin.factor * size.factor;
  const setupFactor =
    size.factor * (origin.id === "bc" ? 1 : origin.id === "international" ? 1.8 : 1.3);
  const tempWeeks = origin.tempHousing ? size.weeks : 0;

  const lines: { icon: typeof Truck; label: string; value: string; note: string }[] = [
    {
      icon: Truck,
      label: origin.id === "bc" ? "Movers" : "Movers & shipping",
      value: range(BASE_MOVERS, moversFactor),
      note:
        origin.id === "international"
          ? "Container shipping, customs handling, and inland delivery vary widely by origin port."
          : "Distance, access, stairs, and time of year all move this number.",
    },
    ...(storage
      ? [
          {
            icon: Boxes,
            label: "Storage (per month)",
            value: range(BASE_STORAGE_MONTH, size.factor),
            note: "Climate-controlled units cost more; many people need one to three months.",
          },
        ]
      : []),
    ...(tempWeeks
      ? [
          {
            icon: Home,
            label: `Temporary housing (~${tempWeeks} weeks)`,
            value: range(
              [BASE_TEMP_HOUSING_WEEK[0] * tempWeeks, BASE_TEMP_HOUSING_WEEK[1] * tempWeeks],
              1,
            ),
            note: "A short-term rental while you view homes and wait on possession dates.",
          },
        ]
      : []),
    {
      icon: Receipt,
      label: "Setup & miscellaneous",
      value: range(BASE_SETUP, setupFactor),
      note: "Deposits, utility hookups, furniture gaps, licensing, and the first grocery runs.",
    },
  ];

  const totals = (() => {
    let lo = BASE_MOVERS[0] * moversFactor + BASE_SETUP[0] * setupFactor;
    let hi = BASE_MOVERS[1] * moversFactor + BASE_SETUP[1] * setupFactor;
    if (storage) {
      lo += BASE_STORAGE_MONTH[0] * size.factor;
      hi += BASE_STORAGE_MONTH[1] * size.factor;
    }
    if (tempWeeks) {
      lo += BASE_TEMP_HOUSING_WEEK[0] * tempWeeks;
      hi += BASE_TEMP_HOUSING_WEEK[1] * tempWeeks;
    }
    return `${money(lo)} – ${money(hi)}`;
  })();

  return (
    <RevealGroup>
      <PageHero
        eyebrow="Calculator"
        title="What will the move itself cost?"
        description="Separate from the cost of living, the move has its own budget. Answer three quick questions to see an estimated range."
      />

      <section className="container-page my-12">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 grid gap-6 md:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="origin-select">
              Moving from
            </label>
            <Select value={originId} onValueChange={(v) => setOriginId(v as OriginId)}>
              <SelectTrigger id="origin-select" className="h-12 rounded-xl">
                <SelectValue placeholder="Where are you moving from?" />
              </SelectTrigger>
              <SelectContent>
                {ORIGINS.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="size-select">
              Move size
            </label>
            <Select value={sizeId} onValueChange={(v) => setSizeId(v as MoveSizeId)}>
              <SelectTrigger id="size-select" className="h-12 rounded-xl">
                <SelectValue placeholder="How much are you moving?" />
              </SelectTrigger>
              <SelectContent>
                {MOVE_SIZES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <span className="text-sm text-muted-foreground">Storage</span>
            <label className="flex h-12 items-center gap-3 rounded-xl border border-border bg-background px-4 text-sm text-foreground">
              <input
                type="checkbox"
                checked={storage}
                onChange={(e) => setStorage(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              I&rsquo;ll need storage
            </label>
          </div>
        </div>
      </section>

      <section className="container-page my-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Estimated move costs</p>
            <h2 className="mt-2 text-2xl md:text-3xl text-foreground">
              {origin.label} · {size.label}
            </h2>
          </div>
          <span className="rounded-full border border-border bg-secondary px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
            Estimated ranges — get a precise quote by connecting with a mover
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {lines.map((l) => (
            <article
              key={l.label}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <l.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-base text-foreground">{l.label}</h3>
              <p className="mt-2 font-serif text-3xl text-foreground">{l.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{l.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Estimated total for the move</p>
            <p className="mt-1 font-serif text-4xl text-foreground">{totals}</p>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A planning range only. Quotes from two or three movers will always beat an estimate.
          </p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Info className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-base text-foreground">Where these numbers come from</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              These are illustrative ranges based on typical move patterns, not live quotes. We
              review them periodically and will replace them with sourced figures as we add them.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <Truck className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-base text-foreground">Ready for real quotes?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our vetted mover and service-provider directory is on the way. In the meantime, we
              can point you to people we trust.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/resources"
                className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground"
              >
                Vendor directory (coming soon)
              </Link>
              <Link
                to="/consultation"
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EmailEstimate
        summary={`Moving from: ${origin.label}; Move size: ${size.label}; Storage: ${
          storage ? "yes" : "no"
        }; Estimated total: ${totals}`}
      />
    </RevealGroup>
  );
}

function EmailEstimate({ summary }: { summary: string }) {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  return (
    <section className="container-page my-16">
      <div className="rounded-3xl border border-border bg-primary text-primary-foreground p-8 md:p-12 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-3 text-primary-foreground/70">Save your estimate</p>
          <h3 className="font-serif text-3xl md:text-4xl leading-tight">Email me this estimate</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            We&rsquo;ll send your moving cost breakdown along with a short checklist of what to
            book and when.
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
              source: "moving_cost_estimator",
              name,
              email,
              engagement: { message: `Moving cost estimate — ${summary}` },
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
              Thanks — your estimate is on the way.
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
                {state === "sending" ? "Sending…" : "Email me this estimate"}
              </button>
              {error && <p className="text-sm text-primary-foreground/90">{error}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
