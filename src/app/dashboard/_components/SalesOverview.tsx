"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SalesPoint } from "../_data/dashboard.mock";

type SalesOverviewProps = {
  data: SalesPoint[];
};

function SalesTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload?: SalesPoint }>;
}) {
  if (!active || !payload?.length) return null;

  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="dash-tooltip">
      <p className="dash-tooltip__date">{point.date}</p>
      <p className="dash-tooltip__value">
        ${point.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

function formatAxis(value: number) {
  if (value === 0) return "$0";
  return `$${value / 1000}K`;
}

export default function SalesOverview({ data }: SalesOverviewProps) {
  return (
    <article className="dash-card dash-chart-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">Sales Overview</h2>
        <label className="dash-select">
          <select defaultValue="month" aria-label="Sales period">
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="year">This Year</option>
          </select>
        </label>
      </div>

      <div className="dash-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="dashSalesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.38} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              tickFormatter={formatAxis}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              width={42}
              domain={[0, 10000]}
              ticks={[0, 2000, 4000, 6000, 8000, 10000]}
            />
            <Tooltip
              content={<SalesTooltip />}
              cursor={{ stroke: "#7C3AED", strokeWidth: 1, strokeDasharray: "4 4" }}
              defaultIndex={3}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#7C3AED"
              strokeWidth={3}
              fill="url(#dashSalesFill)"
              activeDot={{
                r: 6,
                fill: "#7C3AED",
                stroke: "#0B0A10",
                strokeWidth: 3,
              }}
              dot={{
                r: 4,
                fill: "#7C3AED",
                stroke: "#0B0A10",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
