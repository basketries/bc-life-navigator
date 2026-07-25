import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import consultationImg from "@/assets/consultation-bc.jpg";
import { Calendar, Check } from "lucide-react";
import { useState } from "react";

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
      { property: "og:url", content: "/consultation" },
    ],
    links: [{ rel: "canonical", href: "/consultation" }],
  }),
  component: Consultation,
});

function Consultation() {
  const [selected, setSelected] = useState<string>(TYPES[0].id);
  const active = TYPES.find((t) => t.id === selected)!;

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
                onClick={() => setSelected(t.id)}
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

            <div className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium text-foreground">Calendly integration</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                [Embed the Calendly link for &ldquo;{active.title}&rdquo; here. Different
                consultation types can point to different Calendly event types.]
              </p>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                Open Calendly →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
