import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/services/finance-your-home")({
  head: () => ({
    meta: [
      { title: "Finance Your Home in BC — SettleInBC" },
      {
        name: "description",
        content:
          "Mortgage education, affordability planning, and financing preparation for buyers in British Columbia.",
      },
      { property: "og:title", content: "Finance Your Home in BC" },
      {
        property: "og:description",
        content: "Understand mortgages and affordability before you shop.",
      },
      { property: "og:url", content: "/services/finance-your-home" },
    ],
    links: [{ rel: "canonical", href: "/services/finance-your-home" }],
  }),
  component: () => (
    <ServicePage
      eyebrow="💰 Finance Your Home"
      title="Understand your mortgage — before you fall in love with a home."
      description="Learn how mortgages actually work in Canada, what you can realistically afford, and how to prepare so you're ready when the right home shows up."
      sections={[
        {
          title: "Mortgage education",
          bullets: [
            "How Canadian mortgages work: fixed vs. variable, term vs. amortization",
            "The stress test and how it affects your budget",
            "Rate types, penalties, and portability explained plainly",
          ],
        },
        {
          title: "Financing preparation",
          bullets: [
            "Getting pre-approved: what lenders actually look at",
            "Down payment strategies (including newcomer considerations)",
            "Building credit and documentation checklists",
          ],
        },
        {
          title: "Understanding affordability",
          bullets: [
            "Beyond the mortgage: property taxes, strata, insurance & maintenance",
            "How much home you can comfortably carry — not just qualify for",
            "Planning for rate changes and life changes",
          ],
        },
      ]}
      cta={{ label: "Book a Mortgage & Financing Consultation", to: "/consultation" }}
    />
  ),
});
