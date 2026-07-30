import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { PageHero } from "./PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";
import { GroceryBasisToggle } from "@/components/site/GroceryBasisToggle";
import {
  GROCERY_BASIS_LABEL,
  scaleGroceryText,
  type GroceryBasis,
} from "@/lib/grocery-basis";
import { COST_SOURCE_NOTE, type City } from "@/data/cities";

const COST_GUIDANCE_NOTE =
  "Estimates based on market reports, updated periodically — for guidance only";

export function CityPage({ city }: { city: City }) {
  const cost = city.costOfLiving;
  const [groceryBasis, setGroceryBasis] = useState<GroceryBasis>("single");



  return (
    <RevealGroup>
      <PageHero
        eyebrow={`City Guide · ${city.region}`}
        title={city.name}
        description={city.tagline}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/consultation"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/cities"
            className="inline-flex h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            All city guides
          </Link>
        </div>
      </PageHero>

      <section className="container-page my-20 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 className="mt-3 text-3xl text-foreground">
            Getting to know {city.name}.
          </h2>
        </div>
        <div className="space-y-4">
          {city.overview.split("\n\n").map((para) => (
            <p key={para.slice(0, 40)} className="text-lg text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="container-page my-20">
        <p className="eyebrow">Who it&rsquo;s best for</p>
        <h2 className="mt-3 text-3xl text-foreground">
          {city.name} tends to suit&hellip;
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {city.bestFor.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm text-foreground"
            >
              <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {city.neighbourhoods.length > 0 && (
        <section className="container-page my-20">
          <p className="eyebrow">Neighbourhoods</p>
          <h2 className="mt-3 text-3xl text-foreground">Where people live.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {city.neighbourhoods.map((n) => (
              <div key={n.name} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 text-lg text-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {n.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-page my-20 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow">Climate</p>
          <h3 className="mt-3 text-xl text-foreground">What the year feels like</h3>
          <p className="mt-3 text-sm text-muted-foreground">{city.climate}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow">Getting around</p>
          <h3 className="mt-3 text-xl text-foreground">Commuting &amp; transit</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {city.commuteNotes
              ? city.commuteNotes
              : "Detailed commute and transit notes for this community are coming soon."}
          </p>
        </div>
      </section>

      {cost && (
        <section className="container-page my-20">
          <p className="eyebrow">Cost of living</p>
          <h2 className="mt-3 text-3xl text-foreground">What it costs to live here.</h2>
          {cost.updated && (
            <p className="mt-2 text-xs text-muted-foreground/80">
              Last updated: {cost.updated}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Grocery estimates for:
            </span>
            <GroceryBasisToggle value={groceryBasis} onChange={setGroceryBasis} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Housing (rent)", value: cost.housing },
              {
                label: `Monthly Groceries (${GROCERY_BASIS_LABEL[groceryBasis].toLowerCase()})`,
                value: scaleGroceryText(cost.groceries, groceryBasis),
              },
              { label: "Transit Pass (monthly)", value: cost.transit },
            ].map((row) => (
              <div key={row.label} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">{row.label}</p>
                <p className="mt-2 text-lg text-foreground">{row.value}</p>
              </div>
            ))}
          </div>
          {cost.notes && (
            <p className="mt-4 text-sm text-muted-foreground">{cost.notes}</p>
          )}
          <p className="mt-3 text-xs text-muted-foreground/80">{COST_GUIDANCE_NOTE}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">{COST_SOURCE_NOTE}</p>
        </section>
      )}


      <section className="container-page my-20">
        <div className="rounded-3xl border border-border bg-secondary/40 p-10 text-center">
          <h2 className="text-3xl text-foreground">
            Thinking about settling in {city.name}?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Talk through neighbourhoods, timing, and next steps with someone who knows the
            area — no pressure, just clarity.
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
