import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import consultationImg from "@/assets/consultation-bc.jpg";
import { Calendar, Check } from "lucide-react";
import { useState } from "react";
import { calendlyUrl, type ConsultationTypeId } from "@/lib/calendly";
import { useSubmitLead } from "@/lib/leads/client";


const TYPES = [
  {
    id: "buying",
    title: "Buying a Home Consultation",
    desc: "Walk through the BC home buying journey. Ideal for first-time and newcomer buyers.",
  },
  {
    id: "moving",
    title: "Moving to BC Consultation",
    desc: "Plan your relocation to British Columbia — practical, cultural, and financial.",
  },
  {
    id: "mortgage",
    title: "Mortgage & Financing Consultation",
    desc: "Understand affordability, mortgage options, and pre-approval before you shop.",
  },
  {
    id: "planning",
    title: "Future Planning Consultation",
    desc: "Set up a personal financial roadmap aligned with life in BC.",
  },
  {
    id: "investment",
    title: "Investment Consultation",
    desc: "Explore investment basics, asset building, and long-term wealth concepts.",
  },
] as const;

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — SettleInBC" },
      {
        name: "description",
        content:
          "Free consultations for home buying, moving to BC, mortgage, future planning, and investment — with the SettleInBC team.",
      },
      { property: "og:title", content: "Book a SettleInBC Consultation" },
      { property: "og:description", content: "Choose the consultation that fits your journey." },
      { property: "og:url", content: "https://settleinbc.com/consultation" },
    ],
    links: [{ rel: "canonical", href: "/consultation" }],
  }),
  component: Consultation,
});

function Consultation() {
  const [selected, setSelected] = useState<ConsultationTypeId>(TYPES[0].id as ConsultationTypeId);
  const active = TYPES.find((t) => t.id === selected)!;
  const submit = useSubmitLead();
  const [reqState, setReqState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reqError, setReqError] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Consultations"
        title="Book a real conversation about your BC journey."
        description="Every consultation is free and pressure-free. Choose the one that best fits where you are today."
      />

      <section className="container-page my-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-3 h-fit">
          {TYPES.map((t) => {
            const isActive = selected === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelected(t.id as ConsultationTypeId)}
                className={`text-left rounded-2xl border p-5 transition-all ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{t.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border shrink-0 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {isActive ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-hidden">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={consultationImg}
              alt="Advisor consultation with clients in a bright office"
              width={1400}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-8">
            <p className="eyebrow">Selected</p>
            <h3 className="mt-2 font-serif text-2xl text-foreground">{active.title}</h3>
            <p className="mt-2 text-muted-foreground">{active.desc}</p>

            <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-foreground">Book instantly with Calendly</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Pick a time that works for you. Bookings are tracked back to this page.
              </p>
              <a
                href={calendlyUrl(selected, `consultation_${selected}`)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                Open Calendly →
              </a>
            </div>

            <form
              className="mt-6 grid gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setReqState("sending");
                setReqError(null);
                const res = await submit({
                  source: "consultation",
                  name: String(fd.get("name") || ""),
                  email: String(fd.get("email") || ""),
                  phone: String(fd.get("phone") || "") || undefined,
                  engagement: {
                    consultationRequested: selected,
                    message: String(fd.get("message") || "") || undefined,
                  },
                });
                if (res.ok) setReqState("done");
                else {
                  setReqError(res.error ?? "Something went wrong.");
                  setReqState("error");
                }
              }}
            >
              <p className="text-sm font-medium text-foreground">Or request a call back</p>
              {reqState === "done" ? (
                <p className="text-sm text-muted-foreground">
                  Thanks — we&rsquo;ll reach out to schedule your {active.title.toLowerCase()}.
                </p>
              ) : (
                <>
                  <div className="grid gap-3 md:grid-cols-2">
                    <input required name="name" placeholder="Your name" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
                    <input required name="email" type="email" placeholder="Email" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
                  </div>
                  <input name="phone" placeholder="Phone (optional)" className="h-11 rounded-lg border border-input bg-background px-3 text-sm" />
                  <textarea name="message" rows={3} placeholder="Anything we should know?" className="rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" />
                  <button
                    disabled={reqState === "sending"}
                    className="h-11 rounded-full bg-secondary text-secondary-foreground text-sm font-medium disabled:opacity-60"
                  >
                    {reqState === "sending" ? "Sending…" : "Request a call back"}
                  </button>
                  {reqError && <p className="text-sm text-destructive">{reqError}</p>}
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

