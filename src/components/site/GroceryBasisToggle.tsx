import { GROCERY_BASIS_LABEL, type GroceryBasis } from "@/lib/grocery-basis";
import { cn } from "@/lib/utils";

const OPTIONS: GroceryBasis[] = ["single", "family"];

export function GroceryBasisToggle({
  value,
  onChange,
  className,
}: {
  value: GroceryBasis;
  onChange: (basis: GroceryBasis) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Grocery estimate household size"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-1",
        className,
      )}
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "min-h-9 rounded-full px-4 text-xs font-medium transition-colors",
            value === option
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {GROCERY_BASIS_LABEL[option]}
        </button>
      ))}
    </div>
  );
}
