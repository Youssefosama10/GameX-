import Link from "next/link";
import StatCard from "./_components/StatCard";
import SalesOverview from "./_components/SalesOverview";
import RecentOrders from "./_components/RecentOrders";
import TopSellingGames from "./_components/TopSellingGames";
import UserActivities from "./_components/UserActivities";
import SalesByCategory from "./_components/SalesByCategory";
import { GetDashboardStats } from "@/API/route.services";
import { formatMoney } from "@/lib/format";
import { resolveCoverImage } from "@/lib/gameImages";
import {
  categoryTotal,
  salesByCategory,
  salesOverview,
  type DashboardStat,
  type RecentOrder,
  type TopSellingGame,
  type UserActivity,
} from "./_data/dashboard.mock";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await GetDashboardStats();

  const dashboardStats: DashboardStat[] = [
    {
      id: "sales",
      label: "Total Revenue",
      value: formatMoney(stats?.totalRevenue),
      change: "",
      comparison: "All time",
      icon: "wallet",
      trend: "neutral",
    },
    {
      id: "orders",
      label: "Total Orders",
      value: String(stats?.totalOrders ?? 0),
      change: "",
      comparison: `${stats?.pendingOrders ?? 0} pending`,
      icon: "orders",
      trend: "neutral",
    },
    {
      id: "users",
      label: "Total Users",
      value: String(stats?.totalUsers ?? 0),
      change: "",
      comparison: "Registered accounts",
      icon: "users",
      trend: "neutral",
    },
    {
      id: "games",
      label: "Total Games",
      value: String(stats?.totalGames ?? 0),
      change: "",
      comparison: `${stats?.outOfStockGames ?? 0} out of stock`,
      icon: "games",
      trend: "neutral",
    },
  ];

  const recentOrders: RecentOrder[] = (stats?.latestOrders ?? []).slice(0, 5).map((order) => ({
    id: order.id,
    title: order.items?.[0]?.title || order.items?.[0]?.game?.title || "Order",
    orderId: order.orderNumber || order.id,
    price: formatMoney(order.total),
    status: (["completed", "processing", "pending", "cancelled", "refunded"].includes(order.status || "")
      ? order.status
      : "pending") as RecentOrder["status"],
    image: resolveCoverImage(
      null,
      order.items?.[0]?.game?.id || order.id,
      order.items?.[0]?.title || order.items?.[0]?.game?.title,
      order.items?.[0]?.game?.genre
    ),
  }));

  const topSellingGames: TopSellingGame[] = (stats?.mostSoldGames ?? []).slice(0, 5).map((game, index) => ({
    rank: index + 1,
    title: game.title,
    sales: `${game.totalSales ?? 0} Sales`,
    revenue: formatMoney(game.finalPrice ?? game.price),
    image: resolveCoverImage(null, game.id, game.title, game.genre),
  }));

  const userActivities: UserActivity[] = (stats?.newestUsers ?? []).slice(0, 5).map((user, index) => ({
    id: user.email || String(index),
    title: "New user registered",
    detail: `${user.firstName} ${user.lastName}`,
    time: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently",
    icon: "user",
  }));

  return (
    <>
      <section className="dash-stats">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      <section className="dash-row-2">
        <SalesOverview data={salesOverview} />
        {recentOrders.length ? (
          <RecentOrders orders={recentOrders} />
        ) : (
          <article className="dash-card">
            <h2 className="dash-card__title">Recent Orders</h2>
            <p className="section-subtitle">No orders yet.</p>
            <Link href="/dashboard/orders" className="dash-view-all">
              Open orders
            </Link>
          </article>
        )}
      </section>

      <section className="dash-row-3">
        <TopSellingGames games={topSellingGames} />
        <UserActivities activities={userActivities} />
        <SalesByCategory categories={salesByCategory} total={categoryTotal} />
      </section>
    </>
  );
}
