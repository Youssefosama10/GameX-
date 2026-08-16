import {
  CircleCheck,
  CircleX,
  Clock,
  DollarSign,
  Gamepad2,
  Package,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardStat, StatIcon } from "../_data/dashboard.mock";

const STAT_ICONS: Record<StatIcon, LucideIcon> = {
  wallet: Wallet,
  orders: ShoppingBag,
  users: Users,
  games: Gamepad2,
  pending: Clock,
  completed: CircleCheck,
  cancelled: CircleX,
  stock: Package,
  revenue: DollarSign,
};

const TREND_MARK = {
  up: "↑",
  down: "↓",
  neutral: "—",
} as const;

export default function StatCard({
  label,
  value,
  change,
  comparison,
  icon,
  trend = "up",
  tone = "purple",
}: DashboardStat) {
  const Icon = STAT_ICONS[icon];

  return (
    <article className="dash-stat">
      <div className="dash-stat__body">
        <p className="dash-stat__label">{label}</p>
        <p className="dash-stat__value">{value}</p>
        <p className={`dash-stat__growth dash-stat__growth--${trend}`}>
          <span>
            {TREND_MARK[trend]} {change}
          </span>{" "}
          {comparison}
        </p>
      </div>
      <div className={`dash-stat__icon dash-stat__icon--${tone}`}>
        <Icon size={20} />
      </div>
    </article>
  );
}
