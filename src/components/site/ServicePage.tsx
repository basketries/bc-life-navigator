import { Link } from "@tanstack/react-router";
import { PageHero } from "./PageHero";
import { Check, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { RevealGroup } from "@/components/site/RevealGroup";

export function ServicePage({
  eyebrow,
  title,
  description,
  sections,
  cta,
  footnote,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: { title: string; bullets: string[] }[];
  cta?: { label: string; to: string };
  footnote?: ReactNode;
}) {
  return (
    <RevealGroup>
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <div className="flex flex-wrap gap-3">
          <Link
            to={cta?.to ?? "/consultation"}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            {cta?.label ?? "Book a Consultation"} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/resources"
            className="inline-flex h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Explore resources
          </Link>
        </div>
      </PageHero>

      <section className="container-page my-20 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">What&rsquo;s included</p>
          <h2 className="mt-3 text-3xl text-foreground">
            Practical education, no pressure.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every SettleInBC service starts with helping you understand. We connect you
            with trusted professionals only when you&rsquo;re ready.
          </p>
          {footnote && <div className="mt-6 text-sm text-muted-foreground">{footnote}</div>}
        </div>
        <div className="grid gap-4">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg text-foreground">{s.title}</h3>
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </RevealGroup>
  );
}
