import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SettleInBC — Our Mission for British Columbia" },
      {
        name: "description",
        content:
          "SettleInBC is a platform helping individuals and families settle, grow, and invest in British Columbia through education and trusted connections.",
      },
      { property: "og:title", content: "About SettleInBC" },
      { property: "og:description", content: "Our mission, values, and community." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About SettleInBC"
        title="A platform built to help you feel at home in British Columbia."
        description="SettleInBC exists to help individuals and families settle, grow, and invest in BC — through education, trusted guidance, and community connections. We're a company-first platform, not a personal brand."
      />

      <section className="container-page my-20 grid gap-12 lg:grid-cols-3">
        <Block
          title="Our Mission"
          body="To make life in British Columbia clearer, warmer, and more accessible — starting with education and ending with the right people at the right time."
        />
        <Block
          title="Our Values"
          body="Education over sales. Warmth over jargon. Local knowledge over generic advice. Community over transactions."
        />
        <Block
          title="Who We Serve"
          body="Newcomers to Canada, families relocating to BC, international professionals, first-time buyers, and long-term residents planning their future."
        />
      </section>

      <section className="container-page my-20">
        <p className="eyebrow">Team</p>
        <h2 className="mt-3 text-3xl text-foreground">The people behind SettleInBC.</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Our team brings together local BC expertise across housing, mortgage, planning,
          and community — plus content creators, educators, and researchers.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <div className="aspect-square w-16 rounded-full bg-secondary" />
              <h3 className="mt-4 text-lg text-foreground">[Team Member {i}]</h3>
              <p className="text-sm text-muted-foreground">[Role & bio placeholder]</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page my-20">
        <p className="eyebrow">Partners</p>
        <h2 className="mt-3 text-3xl text-foreground">A trusted network across BC.</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          We collaborate with vetted professionals in real estate, mortgage, financial
          planning, insurance, and community media — including independent partners like{" "}
          <span className="text-foreground">Dwello.ca</span> for property search and{" "}
          <span className="text-foreground">BCVoice.ca</span> for community storytelling.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Dwello.ca", "BCVoice.ca", "[Partner]", "[Partner]"].map((p) => (
            <div
              key={p}
              className="h-24 rounded-xl border border-border bg-card grid place-items-center text-sm text-muted-foreground"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-serif text-xl text-foreground">{title}</h3>
      <p className="mt-3 text-muted-foreground">{body}</p>
    </div>
  );
}
