export type GroceryBasis = "single" | "family";

/** Typical grocery spend for a family of four vs. a single person. */
export const FAMILY_GROCERY_MULTIPLIER = 2.6;

export const GROCERY_BASIS_LABEL: Record<GroceryBasis, string> = {
  single: "Single person",
  family: "Family of 4",
};

const roundTo10 = (n: number) => Math.round(n / 10) * 10;

/**
 * Scales a grocery estimate string (e.g. "~$400-450/mo per person")
 * to the selected household basis, keeping the original formatting.
 */
export function scaleGroceryText(text: string, basis: GroceryBasis): string {
  if (basis === "single") return text;

  const scaled = text.replace(/\d[\d,]*/g, (match) => {
    const value = Number(match.replace(/,/g, ""));
    if (!Number.isFinite(value)) return match;
    return roundTo10(value * FAMILY_GROCERY_MULTIPLIER).toLocaleString("en-CA");
  });

  if (/per person/i.test(scaled)) {
    return scaled.replace(/per person/i, "for a family of 4");
  }
  return `${scaled} for a family of 4`;
}
