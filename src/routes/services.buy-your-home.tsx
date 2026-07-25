import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/services/buy-your-home")({
  head: () => ({
    meta: [
      { title: "Buy Your Home in BC — SettleInBC" },
      {
        name: "description",
        content:
          "Understand the BC home buying journey. Newcomer and first-time buyer education, housing resources, and connections to trusted real estate partners.",
      },
      { property: "og:title", content: "Buy Your Home in BC" },
      { property: "og:description", content: "Education-first home buying guidance for BC." },
      { property: "og:url", content: "/services/buy-your-home" },
    ],
    links: [{ rel: "canonical", href: "/services/buy-your-home" }],
  }),
  component: () => (
    <ServicePage
      eyebrow="🏡 Buy Your Home"
      title="Understand the BC home buying journey — before you commit."
      description="From first-time buyers to newcomers exploring homeownership in Canada, we help you learn the process, the numbers, and the neighborhoods that fit your life."
      sections={[
        {
          title: "First-time buyer education",
          bullets: [
            "How the BC home buying process actually works, step by step",
            "Down payments, closing costs, and typical timelines",
            "Common mistakes first-time buyers make (and how to avoid them)",
          ],
        },
        {
          title: "Newcomer home buying information",
          bullets: [
            "What newcomers to Canada need to know before buying",
            "Credit history, employment, and mortgage eligibility basics",
            "Cultural and practical guidance from experienced professionals",
          ],
        },
        {
          title: "BC housing resources",
          bullets: [
            "Neighborhood guides across Metro Vancouver, the Island & Interior",
            "Rent-vs-buy considerations for BC market conditions",
            "Government programs and first-time buyer supports",
          ],
        },
      ]}
      footnote={
        <>
          Ready to actively search properties or work with a licensed realtor? We&rsquo;ll
          connect you with our real estate partner{" "}
          <span className="text-foreground font-medium">Dwello.ca</span>.
        </>
      }
      cta={{ label: "Book a Buying a Home Consultation", to: "/consultation" }}
    />
  ),
});
