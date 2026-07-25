import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/services/build-wealth")({
  head: () => ({
    meta: [
      { title: "Build Wealth in BC — SettleInBC" },
      {
        name: "description",
        content:
          "Investment education and asset-building fundamentals for anyone growing wealth in British Columbia.",
      },
      { property: "og:title", content: "Build Wealth in BC" },
      { property: "og:description", content: "Investment education for BC residents." },
      { property: "og:url", content: "/services/build-wealth" },
    ],
    links: [{ rel: "canonical", href: "/services/build-wealth" }],
  }),
  component: () => (
    <ServicePage
      eyebrow="🌱 Build Wealth"
      title="Grow assets thoughtfully — with knowledge on your side."
      description="Wealth-building isn't luck — it's habits, understanding, and time. Learn the fundamentals of investing and asset growth in the Canadian context."
      sections={[
        {
          title: "Investment education",
          bullets: [
            "Investing 101: risk, time horizon, diversification",
            "Registered vs. non-registered accounts in Canada",
            "How to think about investing (not what to buy)",
          ],
        },
        {
          title: "Asset building",
          bullets: [
            "Homes, portfolios, and businesses as different asset classes",
            "The trade-offs between real estate and market investments in BC",
            "Cash-flow, equity, and appreciation explained simply",
          ],
        },
        {
          title: "Wealth concepts",
          bullets: [
            "Compounding, tax efficiency, and long-term thinking",
            "Common wealth-destroying mistakes to avoid",
            "How wealth supports the life you actually want",
          ],
        },
      ]}
      cta={{ label: "Book an Investment Consultation", to: "/consultation" }}
    />
  ),
});
