import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Newsletter } from "@/components/site/Newsletter";
import { CalendarDays } from "lucide-react";

// Toggle to true once real events exist.
const HAS_EVENTS = false;

const EVENTS: { title: string; date: string; location: string; description: string }[] = [];

export const Route = createFileRoute("/community/events")({
  head: () => ({
    meta: [
      { title: "Events — SettleInBC Community" },
      { name: "description", content: "Upcoming SettleInBC events across British Columbia." },
      { property: "og:title", content: "SettleInBC Events" },
      { property: "og:description", content: "Workshops, meetups & gatherings across BC." },
      { property: "og:url", content: "/community/events" },
    ],
    links: [{ rel: "canonical", href: "/community/events" }],
  }),
  component: Events,
});

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Meet SettleInBC in person, across British Columbia."
        description="Workshops for newcomers, home buying seminars, community meetups, and future planning sessions — hosted online and across BC."
      />

      {HAS_EVENTS && EVENTS.length > 0 ? (
        <section className="container-page my-16 grid gap-4">
          {EVENTS.map((e) => (
            <div key={e.title} className="rounded-2xl border border-border bg-card p-6 flex gap-6">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {e.date} · {e.location}
                </p>
                <h3 className="mt-1 font-serif text-xl text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="container-page my-16">
          <div className="rounded-3xl border border-border bg-card p-10 md:p-14 text-center max-w-2xl mx-auto">
            <p className="eyebrow">No events scheduled yet</p>
            <h2 className="mt-3 font-serif text-3xl text-foreground">
              Be the first to hear about new events.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We&rsquo;re planning upcoming workshops and gatherings across BC. Join our
              newsletter and we&rsquo;ll let you know when tickets open.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <Newsletter compact title="Get event updates" description="Name, email, and we'll be in touch when the next event is announced." />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
