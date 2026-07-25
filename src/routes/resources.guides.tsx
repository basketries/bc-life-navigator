import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

function ResourceList({ title, kind }: { title: string; kind: string }) {
  return (
    <>
      <PageHero
        eyebrow={kind}
        title={title}
        description={`Browse our ${kind.toLowerCase()} — practical, BC-focused, and updated regularly.`}
      />
      <section className="container-page my-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="aspect-video bg-secondary" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{kind}</p>
              <h3 className="mt-2 font-serif text-lg text-foreground">
                [Replace with {kind.toLowerCase()} title #{i + 1}]
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                [Add a short description of this {kind.slice(0, -1).toLowerCase()}.]
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export const Route = createFileRoute("/resources/guides")({
  head: () => ({
    meta: [
      { title: "Guides — SettleInBC Resources" },
      { name: "description", content: "In-depth guides for settling, buying, financing, and planning your future in BC." },
      { property: "og:title", content: "Guides — SettleInBC" },
      { property: "og:description", content: "Step-by-step BC guides." },
      { property: "og:url", content: "/resources/guides" },
    ],
    links: [{ rel: "canonical", href: "/resources/guides" }],
  }),
  component: () => <ResourceList title="Guides" kind="Guides" />,
});
