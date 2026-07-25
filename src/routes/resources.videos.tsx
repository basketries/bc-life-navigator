import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PlayCircle } from "lucide-react";

export const Route = createFileRoute("/resources/videos")({
  head: () => ({
    meta: [
      { title: "Videos — SettleInBC Resources" },
      { name: "description", content: "Video explainers and interviews with BC-focused experts." },
      { property: "og:title", content: "Videos — SettleInBC" },
      { property: "og:description", content: "Watch and learn about life in BC." },
      { property: "og:url", content: "/resources/videos" },
    ],
    links: [{ rel: "canonical", href: "/resources/videos" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Videos" title="Videos" description="Explainers and interviews with BC-focused experts." />
      <section className="container-page my-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-2xl border border-border bg-card overflow-hidden group">
            <div className="aspect-video bg-secondary grid place-items-center">
              <PlayCircle className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Video</p>
              <h3 className="mt-2 font-serif text-lg">[Replace with video title #{i + 1}]</h3>
            </div>
          </article>
        ))}
      </section>
    </>
  ),
});
