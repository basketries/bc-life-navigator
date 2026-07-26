import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Handshake,
  HeartHandshake,
  Home,
  LifeBuoy,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import heroImg from "@/assets/about-bc-lifestyle.jpg";
import landscapeImg from "@/assets/bc-valley.jpg";
import communityImg from "@/assets/about-guidance.jpg";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SettleInBC — Guidance for Life in British Columbia" },
      {
        name: "description",
        content:
          "SettleInBC exists to make moving to British Columbia simpler — with trusted guidance, local knowledge, and connections to the right professionals at the right time.",
      },
      { property: "og:title", content: "About SettleInBC" },
      {
        property: "og:description",
        content:
          "Why SettleInBC exists, what we believe, and how we help people build a future in British Columbia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust",
    body: "Honest guidance and transparent communication — including when the answer is to wait, or to talk to someone else.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Helping people feel at home in British Columbia, not just find an address here.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge",
    body: "Sharing practical local insight so you can make informed decisions at your own pace.",
  },
  {
    icon: HeartHandshake,
    title: "Relationships",
    body: "Building long-term connections rather than one-time transactions.",
  },
];

const HELP = [
  {
    icon: Compass,
    title: "Relocation guidance",
    body: "Working through timing, regions, costs, and the practical steps of moving to BC — often long before a home search begins.",
  },
  {
    icon: Home,
    title: "Real estate advice",
    body: "Understanding how the local market works, what your options are, and what a realistic path to a home looks like.",
  },
  {
    icon: Handshake,
    title: "Local professional referrals",
    body: "Introductions to mortgage, legal, planning, and protection professionals when they're genuinely useful to you.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing support after arriving",
    body: "Settling in takes longer than moving day. We stay available for the questions that come afterwards.",
  },
];

const WHY_BC = [
  {
    title: "Natural beauty",
    body: "Mountains, coastline, and forest are part of ordinary weekday life here, not just a holiday.",
  },
  {
    title: "Diverse communities",
    body: "People arrive from across Canada and around the world, and neighbourhoods reflect that mix.",
  },
  {
    title: "Career opportunities",
    body: "Work spans technology, health care, trades, film, education, and resource industries.",
  },
  {
    title: "Quality education",
    body: "A public school system alongside colleges and universities with strong regional presence.",
  },
  {
    title: "Outdoor lifestyle",
    body: "Trails, water, and slopes are close enough to be a habit rather than a trip.",
  },
  {
    title: "Strong economy",
    body: "A broad economic base connected to the Pacific and the rest of the country.",
  },
];

function About() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-16 md:py-24 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="animate-fade-in">
            <p className="eyebrow">About SettleInBC</p>
            <h1 className="mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground">
              Helping people build their future in British Columbia
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Moving to a new province is one of life&rsquo;s biggest decisions. SettleInBC
              was created to make that journey simpler by providing trusted guidance, local
              expertise, and meaningful connections every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/consultation"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-95"
              >
                Book Your Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/new-to-bc"
                className="inline-flex h-12 items-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                New to BC
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <img
              src={heroImg}
              alt="Friends and a young family sitting together on a lakeside dock below forested mountains in British Columbia"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="container-page my-20 md:my-28 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Why SettleInBC exists
          </h2>
        </div>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Moving to British Columbia involves far more than buying a home. Before a
            listing ever matters, people are weighing regions and commutes, comparing school
            options, sorting out healthcare and banking, learning how financing works here,
            and trying to picture what daily life will actually feel like.
          </p>
          <p>
            Most of that information exists somewhere. The hard part is that it&rsquo;s
            scattered, often out of date, and rarely written for someone who is new. It can
            be difficult to know which advice applies to your situation and which
            professionals are worth talking to.
          </p>
          <p>
            SettleInBC was created to sit in that gap. We bring the practical pieces
            together in one place, explain them plainly, and connect people with trusted
            local professionals when the timing is right. The goal is simple: fewer
            surprises, clearer choices, and more confidence at each step.
          </p>
          <p className="text-foreground">
            We&rsquo;d rather help you make a well-informed decision slowly than a rushed one
            quickly.
          </p>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="border-y border-border bg-secondary/40 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">What we believe</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
              The values behind how we work
            </h2>
            <p className="mt-4 text-muted-foreground">
              These four ideas shape every conversation, guide, and introduction we make.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40"
              >
                <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="container-page my-20 md:my-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">How we help</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Support that follows your journey
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Every journey looks different. Someone arriving with a young family has little
            in common with someone relocating for work or planning an investment. We start
            by understanding where you are, then tailor the support from there.
          </p>
          <div className="mt-8 space-y-6">
            {HELP.map((h) => (
              <div key={h.title} className="flex gap-4">
                <div className="mt-0.5 inline-grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground">{h.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {h.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 overflow-hidden rounded-3xl border border-border">
          <img
            src={communityImg}
            alt="Two people talking over coffee and notes at a sunlit table overlooking British Columbia forest"
            width={1600}
            height={1104}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* WHY BC */}
      <section className="border-y border-border bg-card/60 py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={landscapeImg}
              alt="Autumn vineyards above a wide blue lake in the Okanagan valley, British Columbia"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Why British Columbia</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
              A place people choose for the long term
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Beyond the scenery, BC is a province people build careers, raise families, and
              settle into. These are the parts of life here that tend to matter most once
              the moving boxes are unpacked.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {WHY_BC.map((w) => (
                <div key={w.title}>
                  <dt className="font-serif text-base text-foreground">{w.title}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {w.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page my-20 md:my-28">
        <div
          className="rounded-3xl p-10 md:p-16 text-primary-foreground grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"
          style={{ backgroundColor: "var(--forest-deep)" }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl leading-tight">
              Let&rsquo;s start your BC journey together
            </h2>
            <p className="mt-4 max-w-xl opacity-90">
              Whether you&rsquo;re planning your move, searching for your next home, or
              exploring investment opportunities, we&rsquo;re here to help you move forward
              with confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/consultation"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Book Your Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
