import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/services/protect-your-family")({
  head: () => ({
    meta: [
      { title: "Protect Your Family — SettleInBC" },
      {
        name: "description",
        content:
          "Protection education and family planning resources to help BC families feel secure about the future.",
      },
      { property: "og:title", content: "Protect Your Family in BC" },
      {
        property: "og:description",
        content: "Protection basics and family planning for BC.",
      },
      { property: "og:url", content: "/services/protect-your-family" },
    ],
    links: [{ rel: "canonical", href: "/services/protect-your-family" }],
  }),
  component: () => (
    <ServicePage
      eyebrow="🛡 Protect Your Family"
      title="Peace of mind for the people who matter most."
      description="Protection isn't about fear — it's about giving your family confidence and options. We help you understand the basics so you can make thoughtful decisions."
      sections={[
        {
          title: "Protection education",
          bullets: [
            "The main types of personal & family protection in Canada",
            "How coverage needs change as your life changes",
            "Common gaps newcomers and young families overlook",
          ],
        },
        {
          title: "Family planning resources",
          bullets: [
            "Aligning protection with your mortgage and long-term goals",
            "Estate basics: wills, beneficiaries, and simple planning steps",
            "Educational guides — no obligation, no pushy sales",
          ],
        },
      ]}
    />
  ),
});
