import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ServiceGrid } from "@/components/site/ServiceGrid";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — SettleInBC" },
      {
        name: "description",
        content:
          "Explore goal-based guidance: buying a home, financing, protecting your family, planning your future, and building wealth in British Columbia.",
      },
      { property: "og:title", content: "SettleInBC Services" },
      { property: "og:description", content: "Goal-based guidance for life in BC." },
      { property: "og:url", content: "https://settleinbc.com/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Services"
        title="Goal-based guidance for every step of life in BC."
        description="Choose the outcome that fits where you are today. Each path starts with education and connects you to trusted professionals only when you're ready."
      />
      <ServiceGrid />
    </>
  ),
});
