import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cities,
  primaryCities,
  secondaryCities,
  getCityBySlug,
  COST_SOURCE_NOTE,
  type City,
} from "@/data/cities";

export const Route = createFileRoute("/cities/compare")({
  head: () => ({
    meta: [
      { title: "Compare BC Cities Side by Side | SettleInBC" },
      {
        name: "description",
        content:
          "Compare any two British Columbia cities on region, climate, commuting, who they suit best, neighbourhoods, and cost of living.",
      },
      { property: "og:title", content: "Compare BC Cities" },
      {
        property: "og:description",
        content: "Pick two BC communities and see how they stack up side by side.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://settleinbc.com/cities/compare" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://settleinbc.com/cities/compare" }],
  }),
  component: CompareCities,
});

const COST_GUIDANCE_NOTE =
  "Estimates based on market reports, updated periodically — for guidance only";

function costLine(city: City) {
  return city.costOfLiving;
}

function CitySelect({
  label,
  value,
  onChange,
  disabledSlug,
}: {
  label: string;
  value: string;
  onChange: (slug: string) => void;
  disabledSlug?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-2 h-11 rounded-full">
          <SelectValue placeholder="Choose a city" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Major centres</SelectLabel>
            {primaryCities.map((c) => (
              <SelectItem key={c.slug} value={c.slug} disabled={c.slug === disabledSlug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Smaller cities &amp; towns</SelectLabel>
            {secondaryCities.map((c) => (
              <SelectItem key={c.slug} value={c.slug} disabled={c.slug === disabledSlug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function Row({
  label,
  left,
  right,
}: {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-t border-border py-6 md:grid-cols-[180px_1fr_1fr] md:gap-6">
      <p className="eyebrow md:pt-0.5">{label}</p>
      <div className="text-sm text-muted-foreground">{left}</div>
      <div className="text-sm text-muted-foreground">{right}</div>
    </div>
  );
}

function CostCell({ city }: { city: City }) {
  const c = costLine(city);
  if (!c) return null;
  return (
    <ul className="space-y-1">
      <li>Housing (rent): {c.housing}</li>
      <li>Monthly Groceries (single person): {c.groceries}</li>
      <li>Transit Pass (monthly): {c.transit}</li>
      {c.notes && <li className="text-muted-foreground/80">{c.notes}</li>}
      <li className="pt-1 text-xs text-muted-foreground/80">{COST_GUIDANCE_NOTE}</li>
      <li className="text-xs text-muted-foreground/80">{COST_SOURCE_NOTE}</li>
    </ul>
  );
}

function BestForCell({ city }: { city: City }) {
  return (
    <div className="flex flex-wrap gap-2">
      {city.bestFor.map((b) => (
        <span
          key={b}
          className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
        >
          {b}
        </span>
      ))}
    </div>
  );
}

function NeighbourhoodColumn({ city }: { city: City }) {
  return (
    <div>
      <h3 className="text-xl text-foreground">{city.name}</h3>
      <div className="mt-4 space-y-3">
        {city.neighbourhoods.map((n) => (
          <div key={n.name} className="rounded-2xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 text-base text-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              {n.name}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{n.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareCities() {
  const [leftSlug, setLeftSlug] = useState("vancouver");
  const [rightSlug, setRightSlug] = useState("victoria");

  const left = getCityBySlug(leftSlug);
  const right = getCityBySlug(rightSlug);
  const bothPrimary =
    left && right && left.tier === "primary" && right.tier === "primary";

  return (
    <RevealGroup>
      <PageHero
        eyebrow="City guides"
        title="Compare two BC communities."
        description="Pick any two cities and see how they differ on climate, commuting, neighbourhoods, and who they suit best."
      />

      <section className="container-page my-16">
        <div className="grid gap-5 sm:grid-cols-2 max-w-2xl">
          <CitySelect
            label="First city"
            value={leftSlug}
            onChange={setLeftSlug}
            disabledSlug={rightSlug}
          />
          <CitySelect
            label="Second city"
            value={rightSlug}
            onChange={setRightSlug}
            disabledSlug={leftSlug}
          />
        </div>

        {left && right && (
          <div className="mt-14">
            <div className="grid gap-3 pb-6 md:grid-cols-[180px_1fr_1fr] md:gap-6">
              <div />
              <div>
                <h2 className="text-2xl text-foreground">{left.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{left.tagline}</p>
              </div>
              <div>
                <h2 className="text-2xl text-foreground">{right.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{right.tagline}</p>
              </div>
            </div>

            <Row label="Region" left={left.region} right={right.region} />
            <Row
              label="Climate"
              left={left.climate}
              right={right.climate}
            />
            <Row
              label="Best for"
              left={<BestForCell city={left} />}
              right={<BestForCell city={right} />}
            />
            <Row
              label="Commute notes"
              left={left.commuteNotes || <ComingSoon />}
              right={right.commuteNotes || <ComingSoon />}
            />
            <Row
              label="Cost of living"
              left={<CostCell city={left} />}
              right={<CostCell city={right} />}
            />
            <Row
              label="Full guide"
              left={
                <Link
                  to="/cities/$citySlug"
                  params={{ citySlug: left.slug }}
                  className="inline-flex items-center gap-2 font-medium text-primary"
                >
                  {left.name} guide <ArrowRight className="h-4 w-4" />
                </Link>
              }
              right={
                <Link
                  to="/cities/$citySlug"
                  params={{ citySlug: right.slug }}
                  className="inline-flex items-center gap-2 font-medium text-primary"
                >
                  {right.name} guide <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          </div>
        )}
      </section>

      {bothPrimary && left && right && (
        <section className="container-page my-20">
          <p className="eyebrow">Neighbourhoods</p>
          <h2 className="mt-3 text-3xl text-foreground">Where people live in each.</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <NeighbourhoodColumn city={left} />
            <NeighbourhoodColumn city={right} />
          </div>
        </section>
      )}

      <section className="container-page my-20">
        <div className="rounded-3xl border border-border bg-secondary/40 p-10 text-center">
          <h2 className="text-3xl text-foreground">
            Still deciding between these two?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Let&rsquo;s talk it through — schools, commutes, budget, and timing all factor
            in. No pressure, just a clear next step.
          </p>
          <Link
            to="/consultation"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Or browse all {cities.length} BC city guides on the{" "}
            <Link to="/cities" className="underline">
              city directory
            </Link>
            .
          </p>
        </div>
      </section>
    </RevealGroup>
  );
}
