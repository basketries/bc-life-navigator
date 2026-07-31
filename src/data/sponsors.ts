export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  active: boolean;
}

/**
 * Placeholder sponsor entries. Replace the logo files under /public/sponsors/
 * and the business details below with real partners.
 * Only sponsors with `active: true` are ever rendered.
 */
export const sponsors: Sponsor[] = [
  {
    id: "sponsor-1",
    name: "Sponsor One",
    logoUrl: "/sponsors/sponsor-1.svg",
    websiteUrl: "https://example.com",
    active: true,
  },
  {
    id: "sponsor-2",
    name: "Sponsor Two",
    logoUrl: "/sponsors/sponsor-2.svg",
    websiteUrl: "https://example.com",
    active: true,
  },
  {
    id: "sponsor-3",
    name: "Sponsor Three",
    logoUrl: "/sponsors/sponsor-3.svg",
    websiteUrl: "https://example.com",
    active: true,
  },
];

export const activeSponsors = () => sponsors.filter((s) => s.active);
