import { createFileRoute, Link } from "@tanstack/react-router";
import { CityPage } from "@/components/site/CityPage";
import { getCityBySlug, citySeo } from "@/data/cities";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup } from "@/components/site/RevealGroup";

export const Route = createFileRoute("/cities/$citySlug")({
  head: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    const url = `https://settleinbc.com/cities/${params.citySlug}`;
    if (!city) {
      return {
        meta: [
          { title: "City guide not found — SettleInBC" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const seo = citySeo[city.slug];
    const title = seo?.title ?? `Living in ${city.name}, BC — City Guide | SettleInBC`;
    const description =
      seo?.description ??
      `${city.tagline} Explore ${city.name} neighbourhoods, climate, commuting, and what life in ${city.region} is really like.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `Living in ${city.name}, BC` },
        { property: "og:description", content: city.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CityRoute,
});

function CityRoute() {
  const { citySlug } = Route.useParams();
  const city = getCityBySlug(citySlug);

  if (!city) {
    return (
      <RevealGroup>
        <PageHero
          eyebrow="City guides"
          title="We don't have a guide for that city yet."
          description="The page you're looking for doesn't match any of our BC city guides."
        >
          <Link
            to="/cities"
            className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Browse all city guides
          </Link>
        </PageHero>
      </RevealGroup>
    );
  }

  return <CityPage city={city} />;
}
