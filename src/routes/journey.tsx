import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { JourneyPicker } from "@/components/site/JourneyPicker";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Start Your BC Journey — SettleInBC" },
      {
        name: "description",
        content:
          "Tell us where you are today and we'll point you to the right resources, people, and next steps for your life in BC.",
      },
      { property: "og:title", content: "Start Your BC Journey" },
      { property: "og:description", content: "A personal roadmap for life in British Columbia." },
      { property: "og:url", content: "https://settleinbc.com/journey" },
    ],
    links: [{ rel: "canonical", href: "/journey" }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Your journey"
        title="Where are you in your BC story?"
        description="Choose what fits you best. We'll build a starting point around your situation — no pressure, no sales pitch."
      />
      <JourneyPicker />
    </>
  ),
});
