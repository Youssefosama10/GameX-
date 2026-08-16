"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { CategorySale } from "../_data/dashboard.mock";

type SalesByCategoryProps = {
  categories: CategorySale[];
  total: string;
};

export default function SalesByCategory({ categories, total }: SalesByCategoryProps) {
  return (
    <article className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">Sales by Category</h2>
      </div>

      <div className="dash-donut">
        <div className="dash-donut__chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={3}
                stroke="none"
              >
                {categories.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="dash-donut__center">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
        </div>

        <ul className="dash-legend">
          {categories.map((category) => (
            <li key={category.name} className="dash-legend__item">
              <span
                className="dash-legend__dot"
                style={{ background: category.color }}
              />
              <span className="dash-legend__name">{category.name}</span>
              <span className="dash-legend__value">{category.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
