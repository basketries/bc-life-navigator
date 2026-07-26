import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import communityImg from "@/assets/community-bc.jpg";

export const Route = createFileRoute("/community/")({
  head: () => ({
    meta: [
      { title: "New to BC — SettleInBC" },
      {
        name: "description",
        content:
          "Events, BC lifestyle, and community stories from across British Columbia. Independent partnership with BCVoice.ca.",
      },
      { property: "og:title", content: "New to BC — SettleInBC" },
      { property: "og:description", content: "Stories, events, and BC lifestyle." },
      { property: "og:url", content: "/community" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: CommunityIndex,
});

function CommunityIndex() {
  return (
    <>
      <PageHero
        eyebrow="New to BC"
        title="You&rsquo;re not just moving to BC — you&rsquo;re joining it."
        description="Discover events, neighborhood guides, and community stories that help you feel connected. We partner with BCVoice.ca, an independent community media brand, to bring more voices to the conversation."
      />

      <section className="container-page my-16 grid gap-6 md:grid-cols-2">
        <Link to="/community/events" className="group rounded-3xl border border-border bg-card overflow-hidden">
          <div className="aspect-[16/10] bg-secondary" />
          <div className="p-6">
            <p className="eyebrow">Events</p>
            <h3 className="mt-2 font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
              Upcoming BC events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Workshops, meetups, and gatherings — for newcomers and long-time residents.
            </p>
          </div>
        </Link>
        <Link to="/community/stories" className="group rounded-3xl border border-border bg-card overflow-hidden">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={communityImg}
              alt="Coastal BC community from above"
              width={1400}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <p className="eyebrow">Stories</p>
            <h3 className="mt-2 font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
              Real stories from BC
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              From first-year newcomers to third-generation locals — the humans that make BC feel like home.
            </p>
          </div>
        </Link>
      </section>

      <section className="container-page my-20 rounded-3xl border border-border bg-secondary/60 p-10 md:p-14 grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
        <div>
          <p className="eyebrow">Partner</p>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl text-foreground">
            BCVoice.ca — independent community media
          </h3>
          <p className="mt-3 text-muted-foreground max-w-lg">
            BCVoice is our independent community media partner, focused on giving voice to
            people and places across British Columbia. It is not a sub-brand of SettleInBC.
          </p>
        </div>
        <a
          href="https://bcvoice.ca"
          target="_blank"
          rel="noreferrer"
          className="justify-self-start md:justify-self-end inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
        >
          Visit BCVoice.ca
        </a>
      </section>
    </>
  );
}
