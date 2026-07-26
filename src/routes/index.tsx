import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Compass, Users, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-bc-landscape.jpg";
import familyImg from "@/assets/hero-bc.jpg";
import communityImg from "@/assets/community-bc.jpg";
import { JourneyPicker } from "@/components/site/JourneyPicker";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SettleInBC — Settle, Grow & Invest in British Columbia" },
      {
        name: "description",
        content:
          "Trusted guidance, local knowledge, and practical resources for newcomers, families, and future planners in British Columbia.",
      },
      { property: "og:title", content: "SettleInBC — Your BC Life Journey Platform" },
      {
        property: "og:description",
        content:
          "Education, resources, and community for people building their future in British Columbia.",
      },
      { property: "og:url", content: "https://settleinbc.com/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const heroImgRef = useRef<HTMLImageElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (heroImgRef.current) {
          gsap.fromTo(
            heroImgRef.current,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: heroImgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        const steps = stepsRef.current?.querySelectorAll("li");
        if (steps?.length) {
          gsap.from(steps, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 85%",
              once: true,
            },
          });
        }
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-page pt-14 md:pt-20 pb-16 md:pb-24 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Your BC life journey platform
            </p>
            <h1 className="mt-5 text-5xl md:text-6xl leading-[1.08] text-foreground">
              Helping You<br />
              <span className="italic text-primary">Settle</span>, Grow &amp;{" "}
              <span className="italic text-accent">Invest</span><br />
              in British Columbia.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Whether you are new to BC, relocating, buying your first home, planning your
              finances, or building your future — find trusted guidance, local knowledge,
              and practical resources, all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/journey"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95"
              >
                Start Your BC Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/consultation"
                className="inline-flex h-12 items-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-lg">
              <img
                src={heroImg}
                alt="Snow-capped coastal mountains above a calm ocean inlet in British Columbia"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl border border-border bg-card p-4 shadow-md w-64">
              <p className="eyebrow">Welcome home</p>
              <p className="mt-1 font-serif text-lg leading-snug text-foreground">
                Helping you confidently build your future in British Columbia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY PATH */}
      <section className="border-y border-border bg-card/60">
        <div className="container-page py-14 md:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-2xl md:text-3xl text-foreground">
              Four simple steps — at your own pace.
            </h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Discover BC", d: "Explore neighborhoods, guides, and stories from across the province." },
              { n: "02", t: "Choose your goal", d: "Tell us where you are — new to BC, buying, financing, or planning." },
              { n: "03", t: "Get resources", d: "Read, watch, and use tools tailored to your next step." },
              { n: "04", t: "Connect with professionals", d: "Meet trusted BC experts — only when you're ready." },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-background p-5">
                <span className="font-serif text-sm text-accent">{s.n}</span>
                <h3 className="mt-2 text-lg text-foreground">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <JourneyPicker />
      <ServiceGrid />

      {/* AFTER YOU ARRIVE */}
      <section className="container-page my-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-border">
          <img
            src={familyImg}
            alt="A family walking together through a British Columbia neighbourhood at golden hour"
            width={1600}
            height={1100}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">Life after the move</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Your journey doesn&rsquo;t end when you arrive.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Settling in is the beginning. From finding a neighbourhood that fits your
            family, to understanding how homes, mortgages, and long-term planning work
            here — we stay with you as your life in BC grows.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {[
              "Neighbourhood and school-area insight across the province",
              "Plain-language education on homes, financing, and planning",
              "Community events and stories to help you feel at home",
            ].map((i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>




      {/* WHY */}
      <section className="bg-secondary/50 py-24 border-y border-border">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Why SettleInBC</p>
            <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
              A calmer, clearer path into life in British Columbia.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              We&rsquo;re a platform — not a sales pipeline. Our job is to make you feel
              welcome, informed, and connected before any decisions are made.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <WhyCard
              icon={<Compass className="h-5 w-5" />}
              title="Education First"
              body="Understand before you commit. Our guides and consultations exist to answer questions, not close deals."
            />
            <WhyCard
              icon={<Users className="h-5 w-5" />}
              title="Trusted Network"
              body="Vetted professionals across real estate, mortgage, planning, and protection — introduced only when you're ready."
            />
            <WhyCard
              icon={<MapPin className="h-5 w-5" />}
              title="Local Knowledge"
              body="Neighborhood-level insight across BC, from Metro Vancouver to Vancouver Island and the Interior."
            />
            <WhyCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Community Focus"
              body="Stories, events, and connections that help you feel like you belong here — because you do."
            />
          </div>
        </div>
      </section>

      {/* CONTENT HUB PROMO */}
      <section className="container-page my-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Content hub</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-foreground">
            Guides, articles, videos & calculators for life in BC.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            From moving-to-BC checklists to home-buying and investment fundamentals — our
            resource library grows every month.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Guides", "Articles", "Videos", "Calculators"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/resources"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Browse resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="aspect-[5/4] overflow-hidden rounded-3xl border border-border">
            <img
              src={communityImg}
              alt="Coastal BC community from above"
              width={1400}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="container-page my-24">
        <div className="rounded-3xl bg-forest-deep text-primary-foreground p-10 md:p-16 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"
             style={{ backgroundColor: "var(--forest-deep)" }}>
          <div>
            <p className="eyebrow text-primary-foreground/70">New to BC</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Real stories, real neighborhoods, real people in BC.
            </h2>
            <p className="mt-4 max-w-lg opacity-80">
              Events, neighborhood guides, and community stories — plus an independent
              partnership with{" "}
              <span className="underline underline-offset-4">BCVoice.ca</span>, a
              community media brand covering life across the province.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/community"
              className="inline-flex h-11 items-center rounded-full bg-primary-foreground text-primary px-5 text-sm font-medium"
            >
              Explore New to BC
            </Link>
            <Link
              to="/community/events"
              className="inline-flex h-11 items-center rounded-full border border-primary-foreground/30 px-5 text-sm font-medium hover:bg-primary-foreground/10"
            >
              Upcoming events
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}


function WhyCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
