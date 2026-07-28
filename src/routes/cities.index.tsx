import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import { primaryCities, secondaryCities, type City } from "@/data/cities";

export const Route = createFileRoute("/cities/")({
  head: () => ({
    meta: [
      { title: "Compare 18 BC Cities & Towns — Cost of Living, Climate & Neighbourhoods 2026" },
      {
        name: "description",
        content:
          "Side-by-side comparison of British Columbia's best places to live: rent, groceries, transit, and who each community suits.",
      },
      {
        property: "og:title",
        content: "Compare 18 BC Cities & Towns — Cost of Living, Climate & Neighbourhoods 2026",
      },
      {
        property: "og:description",
        content:
          "Side-by-side comparison of British Columbia's best places to live: rent, groceries, transit, and who each community suits.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://settleinbc.com/cities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://settleinbc.com/cities" }],
  }),
  component: CitiesIndex,
});

function PrimaryCard({ city }: { city: City }) {
  return (
    <Link
      to="/cities/$citySlug"
      params={{ citySlug: city.slug }}
      className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
    >
      <p className="eyebrow flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        {city.region}
      </p>
      <h3 className="mt-3 text-2xl text-foreground">{city.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{city.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {city.bestFor.slice(0, 3).map((b) => (
          <span
            key={b}
            className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
          >
            {b}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
        Explore {city.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function SecondaryCard({ city }: { city: City }) {
  return (
    <Link
      to="/cities/$citySlug"
      params={{ citySlug: city.slug }}
      className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
    >
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{city.region}</p>
      <h3 className="mt-2 text-lg text-foreground">{city.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{city.tagline}</p>
    </Link>
  );
}

function CitiesIndex() {
  return (
    <RevealGroup>
      <PageHero
        eyebrow="City guides"
        title="Find the BC community that fits your life."
        description="Every part of British Columbia feels different. Explore neighbourhoods, climate, and commuting so you can choose with confidence — not guesswork."
      />

      <section className="container-page my-20">
        <p className="eyebrow">Major centres</p>
        <h2 className="mt-3 text-3xl text-foreground">In-depth city guides.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {primaryCities.map((c) => (
            <PrimaryCard key={c.slug} city={c} />
          ))}
        </div>
      </section>

      <section className="container-page my-20">
        <p className="eyebrow">Also worth knowing</p>
        <h2 className="mt-3 text-3xl text-foreground">Smaller cities &amp; towns.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryCities.map((c) => (
            <SecondaryCard key={c.slug} city={c} />
          ))}
        </div>
      </section>

      <section className="container-page my-20">
        <div className="rounded-3xl border border-border bg-secondary/40 p-10 text-center">
          <h2 className="text-3xl text-foreground">Not sure where to start?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Tell us about your work, family, and budget, and we&rsquo;ll help you shortlist
            communities that actually fit.
          </p>
          <Link
            to="/consultation"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </RevealGroup>
  );
}
