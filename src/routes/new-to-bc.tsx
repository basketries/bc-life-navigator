import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Bus,
  Building2,
  GraduationCap,
  HeartPulse,
  Home,
  KeyRound,
  MapPin,
  Users,
  Briefcase,
  Trees,
  Wallet,
  LifeBuoy,
} from "lucide-react";
import heroImg from "@/assets/newcomers-bc.jpg";
import neighbourhoodImg from "@/assets/neighbourhood-bc.jpg";
import landscapeImg from "@/assets/bc-coastal-forest.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/new-to-bc")({
  head: () => ({
    meta: [
      { title: "New to BC — Moving to British Columbia Guide | SettleInBC" },
      {
        name: "description",
        content:
          "A practical BC relocation guide for newcomers: choosing a community, renting vs buying, schools, healthcare, banking, and transportation when moving to British Columbia.",
      },
      { property: "og:title", content: "New to BC — Your British Columbia Relocation Guide" },
      {
        property: "og:description",
        content:
          "Trusted guidance and newcomer resources for relocating to BC and living in British Columbia.",
      },
      { property: "og:url", content: "/new-to-bc" },
    ],
    links: [{ rel: "canonical", href: "/new-to-bc" }],
  }),
  component: NewToBC,
});

const STARTERS = [
  { icon: MapPin, title: "Choosing the right community", body: "Compare regions and neighbourhoods against your budget, work, and daily life." },
  { icon: KeyRound, title: "Renting vs buying", body: "Understand when renting first makes sense and what buying in BC involves." },
  { icon: GraduationCap, title: "Schools and education", body: "How public, independent, and post-secondary options are organised in BC." },
  { icon: HeartPulse, title: "Healthcare registration", body: "Enrolling in provincial medical coverage and finding local care." },
  { icon: Banknote, title: "Banking", body: "Opening accounts, building Canadian credit, and preparing for financing." },
  { icon: Bus, title: "Transportation", body: "Transit networks, commuting patterns, and driving licence considerations." },
  { icon: Users, title: "Building local connections", body: "Community groups, events, and networks that help you feel settled." },
  { icon: Home, title: "Understanding the housing market", body: "How BC housing works — from types of homes to timelines and costs." },
];

const WHY = [
  { title: "Beautiful natural surroundings", body: "Mountains, coastline, forests, and lakes are part of everyday life across the province." },
  { title: "Diverse communities", body: "People arrive from around the world, and many neighbourhoods reflect that mix." },
  { title: "Career opportunities", body: "Work spans technology, health care, trades, film, tourism, and resource industries." },
  { title: "Excellent education", body: "A public school system alongside well-known universities and colleges." },
  { title: "Outdoor lifestyle", body: "Hiking, skiing, paddling, and cycling are accessible from most communities." },
  { title: "Strong economy", body: "A broad economic base connected to the Pacific and the rest of Canada." },
  { title: "High quality of life", body: "Walkable neighbourhoods, public spaces, and a mild coastal climate in many regions." },
];

const FACTORS = [
  "Budget — what housing costs look like across regions",
  "Commute — travel time to work, school, or family",
  "Schools — catchment areas and programs that fit your children",
  "Family needs — space, accessibility, and proximity to support",
  "Lifestyle — urban energy, small town pace, or somewhere in between",
  "Public transportation — how well you can live without a car",
  "Amenities — parks, groceries, health care, recreation, and culture",
];

const RESOURCES = [
  { icon: Home, title: "Housing", body: "Renting, buying, and the practical steps of finding a home in BC." },
  { icon: GraduationCap, title: "Schools", body: "How to research schools, catchments, and registration timelines." },
  { icon: HeartPulse, title: "Healthcare", body: "Provincial coverage, family doctors, walk-in clinics, and pharmacies." },
  { icon: Banknote, title: "Banking", body: "Accounts, credit history, and preparing financially for a move." },
  { icon: Bus, title: "Transportation", body: "Transit, driving, and getting around your new region." },
  { icon: Wallet, title: "Cost of Living", body: "Everyday budgeting for housing, utilities, food, and transport." },
  { icon: Briefcase, title: "Employment", body: "Job searching, credential recognition, and local industries." },
  { icon: LifeBuoy, title: "Community Services", body: "Settlement services, language support, and local organisations." },
];

const FAQS = [
  {
    q: "Can SettleInBC help before I move?",
    a: "Yes. Much of what we do is planning work — understanding regions, housing options, timelines, and costs before you arrive in British Columbia. You can use our resources on your own or book a consultation to talk through your situation.",
  },
  {
    q: "Should I rent before buying?",
    a: "Many newcomers rent first. It gives you time to experience a neighbourhood, confirm your commute, and understand local pricing before committing. Others buy sooner because of family or work certainty. We'll walk through the trade-offs rather than push a direction.",
  },
  {
    q: "How do I choose the right neighbourhood?",
    a: "Start with the parts of daily life that are hardest to change: budget, commute, schools, and the amenities you rely on. From there, shortlist a few communities and spend time in them. Our community guidance is built around that process.",
  },
  {
    q: "Can you connect me with trusted professionals?",
    a: "Yes. When you're ready, we can introduce you to professionals across real estate, mortgage, planning, and protection. Introductions happen when they're useful to you, not as a first step.",
  },
  {
    q: "What areas of British Columbia do you serve?",
    a: "We focus on British Columbia broadly — Metro Vancouver, the Fraser Valley, Vancouver Island, the Okanagan, and the Interior — with resources that apply province-wide and local insight where it matters.",
  },
];

function NewToBC() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-16 md:py-24 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">New to BC</p>
            <h1 className="mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground">
              Welcome to British Columbia
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Whether you&rsquo;re planning your move or have recently arrived, SettleInBC
              helps you navigate life in British Columbia with trusted guidance, practical
              resources, and local expertise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/journey"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-95"
              >
                Start Your BC Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/consultation"
                className="inline-flex h-12 items-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <img
              src={heroImg}
              alt="A young family walking a seawall path with mountains and ocean behind them in British Columbia"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1 — STARTING YOUR JOURNEY */}
      <section className="container-page my-20 md:my-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Section one</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Starting your journey
          </h2>
          <p className="mt-4 text-muted-foreground">
            Once the decision to move is made, a handful of practical questions shape
            everything that follows. These are the areas most people relocating to BC work
            through first.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STARTERS.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40"
            >
              <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 2 — WHY BC */}
      <section className="border-y border-border bg-secondary/40 py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={landscapeImg}
              alt="Mossy coastal rainforest trail opening to the Pacific ocean and misty islands in British Columbia"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Section two</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
              Why people choose British Columbia
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              People move here for different reasons. These are the ones we hear most often
              from newcomers settling into life in British Columbia.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {WHY.map((w) => (
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

      {/* SECTION 3 — CHOOSING A COMMUNITY */}
      <section className="container-page my-20 md:my-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Section three</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Choosing the right community
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            There is no single best place to live in BC. Every newcomer arrives with
            different priorities, and the right community is the one that fits how you
            actually spend your days.
          </p>
          <ul className="mt-6 space-y-3">
            {FACTORS.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/community"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95"
            >
              Explore Communities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 overflow-hidden rounded-3xl border border-border">
          <img
            src={neighbourhoodImg}
            alt="Tree-lined residential street with craftsman homes in a British Columbia neighbourhood"
            width={1600}
            height={1104}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* SECTION 4 — RESOURCES */}
      <section className="border-y border-border bg-card/60 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Section four</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-foreground">Helpful resources</h2>
            <p className="mt-4 text-muted-foreground">
              Newcomer resources grouped by the parts of life that need attention first.
              Each topic will grow into its own guide.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.map((r) => (
              <ResourceCard key={r.title} {...r} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/resources"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Browse the full resource library <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQ */}
      <section className="container-page my-20 md:my-28 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        <div>
          <p className="eyebrow">Section five</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm">
            Common questions from people relocating to BC — answered plainly.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FINAL CTA */}
      <section className="container-page my-20 md:my-28">
        <div
          className="rounded-3xl p-10 md:p-16 text-primary-foreground grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"
          style={{ backgroundColor: "var(--forest-deep)" }}
        >
          <div>
            <p className="eyebrow text-primary-foreground/70">Next step</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Ready to begin your BC journey?
            </h2>
            <p className="mt-4 max-w-lg opacity-80">
              Every relocation is unique. Whether you&rsquo;re moving alone, with family, or
              investing in your future, we&rsquo;re here to help you move forward with
              confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/consultation"
              className="inline-flex h-11 items-center rounded-full bg-primary-foreground px-5 text-sm font-medium text-primary"
            >
              Book a Consultation
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full border border-primary-foreground/30 px-5 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ResourceCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Building2;
  title: string;
  body: string;
}) {
  return (
    <article className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-sm">
      <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-serif text-lg text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </article>
  );
}
