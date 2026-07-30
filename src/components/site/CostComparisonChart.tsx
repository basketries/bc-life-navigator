import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type CostChartSeries = { key: string; label: string; color: string };
export type CostChartRow = { category: string } & Record<string, number | string | null>;

export const COST_CHART_COLORS = ["var(--primary)", "var(--accent)"];

const money = (n: number) => `$${n.toLocaleString("en-CA")}`;

export function CostComparisonChart({
  data,
  series,
  caption,
}: {
  data: CostChartRow[];
  series: CostChartSeries[];
  caption?: string;
}) {
  const hasData = data.some((row) =>
    series.some((s) => typeof row[s.key] === "number" && (row[s.key] as number) > 0),
  );

  if (!hasData) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough comparable figures to chart for these selections.
      </p>
    );
  }

  return (
    <div>
      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(v: number) => money(v)}
              tickLine={false}
              axisLine={false}
              width={70}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
              formatter={(value) =>
                typeof value === "number" ? money(value) : "Not available"
              }
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--foreground)",
                fontSize: 12,
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
            />
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color}
                radius={[6, 6, 0, 0]}
                maxBarSize={56}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {caption && (
        <p className="mt-3 text-xs text-muted-foreground/80">{caption}</p>
      )}
    </div>
  );
}
