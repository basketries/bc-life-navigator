/**
 * Pulls a representative dollar amount out of a free-form cost string
 * such as "1BR ~$2,089/mo, 2BR ~$2,715-3,355/mo" or "$340–380".
 * Returns the midpoint of the first range found, or null if there is no figure.
 */
export function parseCostAmount(text: string | undefined | null): number | null {
  if (!text) return null;
  const match = text.match(/\$\s?([\d,]+)(?:\s?[–—-]\s?\$?([\d,]+))?/);
  if (!match) return null;

  const lo = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(lo)) return null;
  const hi = match[2] ? Number(match[2].replace(/,/g, "")) : null;
  if (hi && Number.isFinite(hi) && hi > lo) return Math.round((lo + hi) / 2);
  return lo;
}
