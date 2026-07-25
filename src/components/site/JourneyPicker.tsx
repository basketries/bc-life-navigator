import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const OPTIONS = [
  { id: "new", label: "I'm new to BC", next: "Welcome. Explore our newcomer guides and consultation options." },
  { id: "moving", label: "I'm planning to move to BC", next: "Get a relocation roadmap and connect with a moving-to-BC consultation." },
  { id: "buying", label: "I'm looking to buy a home", next: "Start with our home-buying education and a Buying a Home consultation." },
  { id: "finance", label: "I'm interested in financial planning", next: "Explore Plan Your Future and book a Future Planning consultation." },
  { id: "invest", label: "I'm exploring investment opportunities", next: "Learn the basics of Build Wealth and book an Investment consultation." },
  { id: "learn", label: "I want to learn about BC", next: "Dive into our community stories, guides, and neighborhood resources." },
] as const;

export function JourneyPicker() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "contact" | "done">("pick");

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
              className="mt-6 grid gap-3 md:grid-cols-3"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("done");
              }}
            >
              <input required placeholder="Your name" className="h-11 rounded-lg border border-input bg-background px-3 text-sm md:col-span-1" />
              <input required type="email" placeholder="Email" className="h-11 rounded-lg border border-input bg-background px-3 text-sm md:col-span-1" />
              <input placeholder="Phone (optional)" className="h-11 rounded-lg border border-input bg-background px-3 text-sm md:col-span-1" />
              <button className="md:col-span-3 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Send me my roadmap
              </button>
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
