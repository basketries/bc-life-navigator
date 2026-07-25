import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/services/plan-your-future")({
  head: () => ({
    meta: [
      { title: "Plan Your Future in BC — SettleInBC" },
      {
        name: "description",
        content:
          "Financial education and long-term planning support for individuals and families building a life in British Columbia.",
      },
      { property: "og:title", content: "Plan Your Future in BC" },
      {
        property: "og:description",
        content: "Long-term planning for life in British Columbia.",
      },
      { property: "og:url", content: "/services/plan-your-future" },
    ],
    links: [{ rel: "canonical", href: "/services/plan-your-future" }],
  }),
  component: () => (
    <ServicePage
      eyebrow="📈 Plan Your Future"
      title="Set the direction for the life you want in BC."
      description="Financial planning is really life planning. We help you map the milestones — home, family, education, retirement — and align your money with them."
      sections={[
        {
          title: "Financial education",
          bullets: [
            "How Canadian accounts work: RRSP, TFSA, FHSA, RESP",
            "Budgeting and cash-flow habits that actually stick",
            "Understanding taxes for newcomers and residents",
          ],
        },
        {
          title: "Long-term planning",
          bullets: [
            "Building a simple, personal financial roadmap",
            "Aligning housing decisions with future goals",
            "Retirement basics for people early or mid-career",
          ],
        },
        {
          title: "Future goals",
          bullets: [
            "Kids' education, career transitions, and life pivots",
            "Balancing today's life with tomorrow's plans",
            "When to revisit the plan (life changes = plan changes)",
          ],
        },
      ]}
      cta={{ label: "Book a Future Planning Consultation", to: "/consultation" }}
    />
  ),
});
