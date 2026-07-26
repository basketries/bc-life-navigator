import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/community/stories")({
  head: () => ({
    meta: [
      { title: "Stories — SettleInBC Community" },
      { name: "description", content: "Real stories from people building their lives across British Columbia." },
      { property: "og:title", content: "SettleInBC Community Stories" },
      { property: "og:description", content: "Voices from across BC." },
      { property: "og:url", content: "https://settleinbc.com/community/stories" },
    ],
    links: [{ rel: "canonical", href: "/community/stories" }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Stories"
        title="The people who make BC feel like home."
        description="Real stories from newcomers, families, and long-time BC residents — because everyone&rsquo;s journey looks a little different."
      />
      <section className="container-page my-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="aspect-[4/3] bg-secondary" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Story</p>
              <h3 className="mt-2 font-serif text-lg">[Replace with story title #{i + 1}]</h3>
              <p className="mt-2 text-sm text-muted-foreground">[Add a short excerpt.]</p>
            </div>
          </article>
        ))}
      </section>
    </>
  ),
});
