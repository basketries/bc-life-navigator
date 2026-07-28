import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import { useSubmitLead } from "@/lib/leads/client";
import { Check, ListChecks } from "lucide-react";

export const Route = createFileRoute("/resources/relocation-checklist")({
  head: () => ({
    meta: [
      { title: "Relocation Checklist — Moving to BC | SettleInBC" },
      {
        name: "description",
        content:
          "An interactive, phase-by-phase checklist for moving to British Columbia — from three months out through your first month settling in.",
      },
      { property: "og:title", content: "BC Relocation Checklist" },
      {
        property: "og:description",
        content:
          "Track every step of your move to BC: three months before, moving week, and your first month here.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://settleinbc.com/resources/relocation-checklist" },
    ],
    links: [{ rel: "canonical", href: "/resources/relocation-checklist" }],
  }),
  component: RelocationChecklist,
});

interface Phase {
  id: string;
  label: string;
  blurb: string;
  guide: string;
  items: string[];
}

const PHASES: Phase[] = [
  {
    id: "three-months",
    label: "3 months before",
    blurb: "The research and paperwork phase — decisions made now save money later.",
    guide: "Moving to BC — a newcomer's roadmap",
    items: [
      "Shortlist two or three BC communities and compare them honestly",
      "Set a housing budget and confirm what you can realistically afford",
      "Get mortgage pre-approval or a rental budget confirmed in writing",
      "Check immigration, work permit, or interprovincial paperwork timelines",
      "Research schools and registration deadlines if you have children",
      "Request quotes from two or three moving companies",
      "Review employer relocation support or tax-deductible moving expenses",
    ],
  },
  {
    id: "one-month",
    label: "1 month before",
    blurb: "Locking in dates and telling the world you're moving.",
    guide: "The BC home buying process, step by step",
    items: [
      "Book your movers and confirm dates in writing",
      "Arrange temporary housing if your dates don't line up",
      "Give notice to your landlord or confirm your closing date",
      "Start the mail forwarding and address change list",
      "Cancel or transfer utilities, internet, and subscriptions",
      "Collect medical, dental, school, and vet records",
      "Begin decluttering — you pay to move everything you keep",
    ],
  },
  {
    id: "moving-week",
    label: "Moving week",
    blurb: "Logistics week. Keep the essentials with you, not on the truck.",
    guide: "Moving to BC — a newcomer's roadmap",
    items: [
      "Pack an essentials box for the first 48 hours",
      "Keep IDs, permits, and financial documents in your carry-on",
      "Confirm arrival times and building elevator bookings",
      "Photograph valuables and electronics before they're packed",
      "Do a final walkthrough and take meter readings",
      "Confirm insurance covers your belongings in transit",
    ],
  },
  {
    id: "first-week",
    label: "First week in BC",
    blurb: "The administrative sprint — a few of these have waiting periods.",
    guide: "Moving to BC — a newcomer's roadmap",
    items: [
      "Apply for BC Medical Services Plan (MSP) coverage",
      "Set up utilities, internet, and tenant or home insurance",
      "Open or update your Canadian bank account",
      "Start the BC driver's licence exchange process",
      "Register children for school",
      "Locate the nearest clinic, pharmacy, and grocery store",
      "Get a Compass Card or figure out your transit options",
    ],
  },
  {
    id: "first-month",
    label: "First month in BC",
    blurb: "Settling in — the part that turns an address into a home.",
    guide: "Understanding your mortgage in plain English",
    items: [
      "Find a family doctor or join a local clinic's waitlist",
      "Update your address with CRA, banks, and insurers",
      "Explore your neighbourhood on foot and find your regular spots",
      "Join a community group, class, or sports league",
      "Review your budget against real BC costs after a full month",
      "Revisit your financial plan now that the move is behind you",
    ],
  },
];

const ALL_ITEMS = PHASES.flatMap((p) => p.items.map((_, i) => `${p.id}-${i}`));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RelocationChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const doneCount = useMemo(
    () => ALL_ITEMS.filter((k) => checked[k]).length,
    [checked],
  );
  const progress = Math.round((doneCount / ALL_ITEMS.length) * 100);

  const summary = PHASES.map((p) => {
    const done = p.items.filter((_, i) => checked[`${p.id}-${i}`]).length;
    return `${p.label}: ${done}/${p.items.length}`;
  }).join("; ");

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <RevealGroup>
      <PageHero
        eyebrow="Checklist"
        title="Your move to BC, one phase at a time."
        description="Everything worth doing before, during, and after the move — organized so nothing important arrives as a surprise."
      />

      <EmailChecklist summary={summary} progress={progress} placement="top" />

      <section className="container-page my-8">
        <div className="sticky top-20 z-10 rounded-2xl border border-border bg-card/95 backdrop-blur p-5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <ListChecks className="h-4 w-4 text-primary" />
              {doneCount} of {ALL_ITEMS.length} complete
            </span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Your ticks stay on this page only — nothing is saved, so email yourself a copy
            before you close the tab.
          </p>
        </div>
      </section>

      <section className="container-page my-12 space-y-8">
        {PHASES.map((phase, phaseIndex) => {
          const done = phase.items.filter((_, i) => checked[`${phase.id}-${i}`]).length;
          return (
            <div key={phase.id} className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Phase {phaseIndex + 1}</p>
                  <h2 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">
                    {phase.label}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{phase.blurb}</p>
                </div>
                <span className="rounded-full border border-border bg-secondary px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                  {done}/{phase.items.length} done
                </span>
              </div>

              <ul className="mt-6 grid gap-3">
                {phase.items.map((item, i) => {
                  const key = `${phase.id}-${i}`;
                  const isDone = !!checked[key];
                  return (
                    <li key={key}>
                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                          isDone
                            ? "border-primary/40 bg-primary/5"
                            : "border-border bg-background hover:border-primary/30"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            isDone
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          }`}
                        >
                          {isDone && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isDone}
                          onChange={() => toggle(key)}
                        />
                        <span
                          className={`text-sm ${
                            isDone ? "text-muted-foreground line-through" : "text-foreground"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 text-sm text-muted-foreground">
                Related guide:{" "}
                <Link to="/resources/guides" className="text-primary hover:underline">
                  {phase.guide}
                </Link>
              </p>
            </div>
          );
        })}
      </section>

      <EmailChecklist summary={summary} progress={progress} placement="bottom" />
    </RevealGroup>
  );
}

function EmailChecklist({
  summary,
  progress,
  placement,
}: {
  summary: string;
  progress: number;
  placement: "top" | "bottom";
}) {
  const submit = useSubmitLead();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});
  const idPrefix = `checklist-${placement}`;

  return (
    <section className="container-page my-10">
      <div className="rounded-3xl border border-border bg-primary text-primary-foreground p-8 md:p-10 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-3 text-primary-foreground/70">Take it with you</p>
          <h3 className="font-serif text-2xl md:text-3xl leading-tight">
            Email me this checklist
          </h3>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            We&rsquo;ll send the full BC relocation checklist so you can work through it at your
            own pace.
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
              source: "relocation_checklist",
              name,
              email,
              engagement: {
                message: `Relocation checklist — ${progress}% complete. Progress by phase: ${summary}`,
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
              Thanks — your checklist is on the way.
            </p>
          ) : (
            <>
              <div className="grid gap-1">
                <input
                  id={`${idPrefix}-name`}
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
                  id={`${idPrefix}-email`}
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
                {state === "sending" ? "Sending…" : "Email me this checklist"}
              </button>
              {error && <p className="text-sm text-primary-foreground/90">{error}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
