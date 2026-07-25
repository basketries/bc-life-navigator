import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useSubmitLead } from "@/lib/leads/client";
import type { Timeline, VisitorGoal } from "@/lib/leads/types";

const OPTIONS: {
  id: VisitorGoal;
  label: string;
  next: string;
}[] = [
  { id: "newcomer", label: "I'm new to BC", next: "Welcome. Explore our newcomer guides and consultation options." },
  { id: "moving", label: "I'm planning to move to BC", next: "Get a relocation roadmap and connect with a moving-to-BC consultation." },
  { id: "buying", label: "I'm looking to buy a home", next: "Start with our home-buying education and a Buying a Home consultation." },
  { id: "planning", label: "I'm interested in financial planning", next: "Explore Plan Your Future and book a Future Planning consultation." },
  { id: "investing", label: "I'm exploring investment opportunities", next: "Learn the basics of Build Wealth and book an Investment consultation." },
  { id: "learning", label: "I want to learn about BC", next: "Dive into our community stories, guides, and neighborhood resources." },
];

const TIMELINES: { id: Timeline; label: string }[] = [
  { id: "immediate", label: "0–3 months" },
  { id: "short", label: "3–6 months" },
  { id: "medium", label: "6–12 months" },
  { id: "long", label: "12+ months" },
  { id: "exploring", label: "Just exploring" },
];

export function JourneyPicker() {
  const submit = useSubmitLead();
  const [selected, setSelected] = useState<VisitorGoal | null>(null);
  const [step, setStep] = useState<"pick" | "contact" | "done">("pick");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const active = OPTIONS.find((o) => o.id === selected) ?? null;

  return (
    <section id="journey" className="container-page my-24">
      <div className="max-w-2xl">
        <p className="eyebrow">Start your journey</p>
        <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
          What brings you to SettleInBC?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Tell us where you are today. We&rsquo;ll point you to the right resources, people,
          and next steps — no pressure, no sales pitch.
        </p>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((o) => {
          const isSelected = selected === o.id;
          return (
            <button
              key={o.id}
              onClick={() => {
                setSelected(o.id);
                setStep("pick");
              }}
              className={`text-left rounded-2xl border p-5 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium text-foreground">{o.label}</span>
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border ${
                    isSelected
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {isSelected ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-8 md:p-10">
          {step !== "done" && (
            <>
              <p className="eyebrow">Your next step</p>
              <h3 className="mt-2 text-2xl text-foreground">{active.next}</h3>
            </>
          )}
          {step === "pick" && (
            <button
              onClick={() => setStep("contact")}
              className="mt-6 inline-flex items-center gap-2 h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Get my personal roadmap <ArrowRight className="h-4 w-4" />
            </button>
          )}
          {step === "contact" && (
            <form
              className="mt-6 grid gap-3 md:grid-cols-2"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setState("sending");
                setError(null);
                const res = await submit({
                  source: "journey_picker",
                  name: String(fd.get("name") || ""),
                  email: String(fd.get("email") || ""),
                  phone: String(fd.get("phone") || "") || undefined,
                  journey: {
                    goal: active.id,
                    timeline: (fd.get("timeline") as Timeline) || undefined,
                    locationInterest: String(fd.get("location") || "") || undefined,
                  },
                });
                if (res.ok) {
                  setState("idle");
                  setStep("done");
                } else {
                  setError(res.error ?? "Something went wrong.");
                  setState("error");
                }
              }}
            >
              <input required name="name" placeholder="Your name" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
              <input required name="email" type="email" placeholder="Email" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
              <input name="phone" placeholder="Phone (optional)" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
              <input name="location" placeholder="Area of BC you're interested in" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
              <select name="timeline" defaultValue="" className="h-11 rounded-lg border border-input bg-background px-3 text-sm md:col-span-2">
                <option value="" disabled>What's your timeline?</option>
                {TIMELINES.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
              <button
                disabled={state === "sending"}
                className="md:col-span-2 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Send me my roadmap"}
              </button>
              {error && <p className="md:col-span-2 text-sm text-destructive">{error}</p>}
            </form>
          )}
          {step === "done" && (
            <div>
              <p className="eyebrow">Thanks</p>
              <h3 className="mt-2 text-2xl text-foreground">
                We&rsquo;ll be in touch within one business day.
              </h3>
              <p className="mt-2 text-muted-foreground">
                In the meantime, you can explore our resources or book a consultation.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
