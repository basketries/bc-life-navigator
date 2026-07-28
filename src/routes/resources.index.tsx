import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Newsletter } from "@/components/site/Newsletter";
import { BookOpen, FileText, PlayCircle, Calculator, Compass, Truck, ListChecks } from "lucide-react";
import { RevealGroup } from "@/components/site/RevealGroup";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — SettleInBC Content Hub" },
      {
        name: "description",
        content:
          "Guides, articles, videos, and calculators to help you make informed decisions about life, home, and money in British Columbia.",
      },
      { property: "og:title", content: "SettleInBC Resources" },
      {
        property: "og:description",
        content: "Educational guides, articles, videos and calculators for BC life.",
      },
      { property: "og:url", content: "https://settleinbc.com/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const CATS = [
  { to: "/resources/guides", icon: BookOpen, title: "Guides", desc: "Step-by-step playbooks for moving, buying, and planning in BC." },
  { to: "/resources/articles", icon: FileText, title: "Articles", desc: "Short reads on life, home, money, and community in BC." },
  { to: "/resources/videos", icon: PlayCircle, title: "Videos", desc: "Explainers and interviews with BC-focused experts." },
  { to: "/resources/cost-of-living-calculator", icon: Calculator, title: "Cost of Living Calculator", desc: "Estimate monthly costs by city and household size before you commit." },
  { to: "/resources/neighbourhood-quiz", icon: Compass, title: "Where Should You Live?", desc: "A five-question quiz that matches you to BC communities worth exploring." },
  { to: "/resources/moving-cost-estimator", icon: Truck, title: "Moving Cost Estimator", desc: "Estimate movers, storage, temporary housing, and setup costs for your move." },
  { to: "/resources/relocation-checklist", icon: ListChecks, title: "Relocation Checklist", desc: "An interactive, phase-by-phase checklist from three months out to settled in." },
];

const PILLARS = [
  {
    label: "Education",
    items: [
      "Moving to BC — a newcomer's roadmap",
      "The BC home buying process, step by step",
      "Understanding your mortgage in plain English",
      "RRSP, TFSA, FHSA — which account when?",
    ],
  },
  {
    label: "Community",
    items: [
      "Neighborhood guide: North Shore essentials",
      "Neighborhood guide: Vancouver Island welcome",
      "Local stories: settling from abroad",
      "Community resources across BC",
    ],
  },
  {
    label: "Entertainment",
    items: [
      "Weekend escapes within 2 hours of Vancouver",
      "The best BC road trips by season",
      "Local experiences worth trying this month",
      "BC lifestyle: living well in every season",
    ],
  },
];

function Resources() {
  return (
    <RevealGroup>
      <PageHero
        eyebrow="Content Hub"
        title="Learn about BC — at your own pace."
        description="Our growing library of guides, articles, videos, and calculators is built to help you understand before you decide."
      />

      <section className="container-page my-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CATS.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
          >
            <c.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg text-foreground">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </section>

      <section className="container-page my-24 space-y-16">
        {PILLARS.map((p) => (
          <div key={p.label}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{p.label}</p>
                <h2 className="mt-2 text-2xl md:text-3xl text-foreground">
                  {p.label} pillar
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.items.map((title) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-card overflow-hidden group"
                >
                  <div className="aspect-video bg-secondary" />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.label}
                    </p>
                    <h3 className="mt-2 font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      [Add published date] · [Add author]
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Newsletter />
    </RevealGroup>
  );
}
