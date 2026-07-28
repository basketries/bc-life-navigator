import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { cities } from "@/data/cities";

const BASE_URL = "https://settleinbc.com";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/journey", changefreq: "monthly", priority: "0.8" },
          { path: "/consultation", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/services/buy-your-home", changefreq: "monthly", priority: "0.8" },
          { path: "/services/finance-your-home", changefreq: "monthly", priority: "0.8" },
          { path: "/services/protect-your-family", changefreq: "monthly", priority: "0.7" },
          { path: "/services/plan-your-future", changefreq: "monthly", priority: "0.7" },
          { path: "/services/build-wealth", changefreq: "monthly", priority: "0.7" },
          { path: "/resources", changefreq: "weekly", priority: "0.8" },
          { path: "/resources/guides", changefreq: "weekly", priority: "0.7" },
          { path: "/resources/articles", changefreq: "weekly", priority: "0.7" },
          { path: "/resources/videos", changefreq: "weekly", priority: "0.7" },
          { path: "/new-to-bc", changefreq: "monthly", priority: "0.9" },
          { path: "/community", changefreq: "weekly", priority: "0.7" },
          { path: "/community/events", changefreq: "weekly", priority: "0.7" },
          { path: "/community/stories", changefreq: "weekly", priority: "0.7" },
          { path: "/cities", changefreq: "monthly", priority: "0.8" },
          { path: "/cities/compare", changefreq: "monthly", priority: "0.7" },
          ...cities.map((c) => ({
            path: `/cities/${c.slug}`,
            changefreq: "monthly" as const,
            priority: c.tier === "primary" ? "0.7" : "0.6",
          })),
        ];

        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
