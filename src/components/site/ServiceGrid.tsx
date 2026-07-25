import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const SERVICES = [
  {
    to: "/services/buy-your-home",
    icon: "🏡",
    title: "Buy Your Home",
    tagline: "Understand the BC home buying journey from first question to keys.",
  },
  {
    to: "/services/finance-your-home",
    icon: "💰",
    title: "Finance Your Home",
    tagline: "Mortgage education, affordability, and preparation — before you shop.",
  },
  {
    to: "/services/protect-your-family",
    icon: "🛡",
    title: "Protect Your Family",
    tagline: "Protection basics and planning resources for the people you love.",
  },
  {
    to: "/services/plan-your-future",
    icon: "📈",
    title: "Plan Your Future",
    tagline: "Long-term financial planning and goal-setting for life in BC.",
  },
  {
    to: "/services/build-wealth",
    icon: "🌱",
    title: "Build Wealth",
    tagline: "Investment education and asset building fundamentals.",
  },
] as const;

export function ServiceGrid() {
  return (
    <section id="services" className="container-page my-24">
      <div className="max-w-2xl">
        <p className="eyebrow">What we help with</p>
        <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
          Guidance for every step of your life in BC.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Education-first support across housing, finances, protection, and long-term
          planning — connected to trusted partners when you&rsquo;re ready to act.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl">{s.icon}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <h3 className="mt-6 text-xl text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
