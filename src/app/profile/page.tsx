import Link from "next/link";
import { GetLibrary, GetMyOrders, GetMyProfile, GetRecentlyViewed, GetRecommendedGames } from "@/API/route.services";
import ProfileClient from "./ProfileClient";
import GameCard from "../../../components/GameCard/GameCard";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const [profile, orders, library, recent, recommended] = await Promise.all([
    GetMyProfile(),
    GetMyOrders(1, 5),
    GetLibrary(),
    GetRecentlyViewed(),
    GetRecommendedGames(),
  ]);

  return (
    <div className="page-wrapper">
      <div className="container gx-account-grid">
        <div>
          <ProfileClient profile={profile} />
          {recent.length ? (
            <section className="gx-section">
              <h2 className="section-title">Recently viewed</h2>
              <GameCard gameDetails={recent.slice(0, 4)} />
            </section>
          ) : null}
          {recommended.length ? (
            <section className="gx-section">
              <h2 className="section-title">Recommended for you</h2>
              <GameCard gameDetails={recommended.slice(0, 4)} />
            </section>
          ) : null}
        </div>
        <aside className="gx-panel">
          <h2 className="section-title" style={{ fontSize: 20 }}>Library</h2>
          <p className="section-subtitle">{library.length} owned games</p>
          <Link href="/library" className="gx-btn gx-btn--ghost" style={{ margin: "12px 0 24px" }}>
            Open library
          </Link>
          <h3 className="section-title" style={{ fontSize: 18 }}>Recent orders</h3>
          {(orders?.orders ?? []).length ? (
            <ul className="gx-form-grid" style={{ marginTop: 12 }}>
              {orders?.orders.map((order) => (
                <li key={order.id}>
                  <Link href={`/orders/${order.id}`} className="flex justify-between">
                    <span>{order.orderNumber || order.id.slice(-6)}</span>
                    <span className="text-zinc-400">{formatDate(order.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="section-subtitle">No orders yet.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
