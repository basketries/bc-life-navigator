import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";

export const Route = createFileRoute("/resources/articles")({
  head: () => ({
    meta: [
      { title: "Articles — SettleInBC Resources" },
      { name: "description", content: "Short reads on life, home, money, and community in British Columbia." },
      { property: "og:title", content: "Articles — SettleInBC" },
      { property: "og:description", content: "BC-focused short reads." },
      { property: "og:url", content: "https://settleinbc.com/resources/articles" },
    ],
    links: [{ rel: "canonical", href: "/resources/articles" }],
  }),
  component: () => (
    <RevealGroup>
      <PageHero eyebrow="Articles" title="Articles" description="Short, focused reads on life in British Columbia." />
      <section className="container-page my-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="aspect-video bg-secondary" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Article</p>
              <h3 className="mt-2 font-serif text-lg">[Replace with article title #{i + 1}]</h3>
              <p className="mt-2 text-sm text-muted-foreground">[Add a short excerpt.]</p>
            </div>
          </article>
        ))}
      </section>
    </RevealGroup>
  ),
});
