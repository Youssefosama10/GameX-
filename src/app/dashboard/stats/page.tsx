import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  CircleX,
  Clock,
  DollarSign,
  Download,
  Gamepad2,
  Package,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import GameImage from "@components/GameImage/GameImage";
import { resolveCoverImage } from "@/lib/gameImages";
import { GetDashboardStats } from "@/API/route.services";
import { GamesCard, userData } from "@/API/types";
import { formatDate, formatMoney } from "@/lib/format";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stats — Game Zone",
  description: "Detailed statistics and insights about your store performance.",
};

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const dashboardStats = await GetDashboardStats();
  return (
    <div className="so">
      <div className="so-top">
        <div className="so-heading">
          <span className="so-heading__icon">
            <Activity size={18} />
          </span>
          <div>
            <h1 className="so-heading__title">Stats Overview</h1>
            <p className="so-heading__crumb">
              Admin <span>›</span> <em>Stats</em>
            </p>
            <p className="so-heading__desc">
              Detailed statistics and insights about your store performance.
            </p>
          </div>
        </div>
        <div className="so-actions">
          <button type="button" className="so-date">
            <CalendarDays size={15} />
            May 1 – May 31, 2024
            <ChevronDown size={14} />
          </button>
          <button type="button" className="so-export">
            <Download size={15} />
            Export Report
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="so-metrics">
        <article className="so-card">
          <div>
            <p className="so-card__label">Total Users</p>
            <p className="so-card__value"> { dashboardStats?.totalUsers } </p>
            <p className="so-card__trend is-neutral">
              <span>Registered</span>
            </p>
          </div>
          <span className="so-card__icon is-purple">
            <Users size={18} />
          </span>
        </article>

        <article className="so-card">
          <div>
            <p className="so-card__label">Total Games</p>
            <p className="so-card__value"> { dashboardStats?.totalGames } </p>
            <p className="so-card__trend is-neutral">
              <span>Catalog</span>
            </p>
          </div>
          <span className="so-card__icon is-purple">
            <Gamepad2 size={18} />
          </span>
        </article>

        <article className="so-card">
          <div>
            <p className="so-card__label">Total Orders</p>
            <p className="so-card__value"> { dashboardStats?.totalOrders } </p>
            <p className="so-card__trend is-neutral">
              <span>— 0%</span> vs last month
            </p>
          </div>
          <span className="so-card__icon is-purple">
            <ShoppingBag size={18} />
          </span>
        </article>

        <article className="so-card">
          <div>
            <p className="so-card__label">Total Revenue</p>
            <p className="so-card__value"> { formatMoney(dashboardStats?.totalRevenue) } </p>
            <p className="so-card__trend is-neutral">
              <span>— 0%</span> vs last month
            </p>
          </div>
          <span className="so-card__icon is-purple">
            <DollarSign size={18} />
          </span>
        </article>
      </div>

      <div className="so-metrics">
        <article className="so-card">
          <div>
            <p className="so-card__label">Pending Orders</p>
            <p className="so-card__value"> { dashboardStats?.pendingOrders } </p>
            <p className="so-card__trend is-neutral">
              <span>— 0%</span> vs last month
            </p>
          </div>
          <span className="so-card__icon is-orange">
            <Clock size={18} />
          </span>
        </article>

        <article className="so-card">
          <div>
            <p className="so-card__label">Completed Orders</p>
            <p className="so-card__value"> { dashboardStats?.completedOrders } </p>
            <p className="so-card__trend is-neutral">
              <span>— 0%</span> vs last month
            </p>
          </div>
          <span className="so-card__icon is-green">
            <CircleCheck size={18} />
          </span>
        </article>

        <article className="so-card">
          <div>
            <p className="so-card__label">Cancelled Orders</p>
            <p className="so-card__value"> { dashboardStats?.cancelledOrders } </p>
            <p className="so-card__trend is-neutral">
              <span>— 0%</span> vs last month
            </p>
          </div>
          <span className="so-card__icon is-red">
            <CircleX size={18} />
          </span>
        </article>

        <article className="so-card">
          <div>
            <p className="so-card__label">Out of Stock Games</p>
            <p className="so-card__value"> { dashboardStats?.outOfStockGames } </p>
            <p className="so-card__trend is-down">
              <span>↓ 75%</span> vs last month
            </p>
          </div>
          <span className="so-card__icon is-orange">
            <Package size={18} />
          </span>
        </article>
      </div>

      <div className="so-mid">
        <article className="so-panel">
          <div className="so-panel__head">
            <h2>Most Sold Games</h2>
            <Link href="/dashboard/games">View All</Link>
          </div>
          <ul className="so-list">

            {/* display Users List */}
          {dashboardStats?.mostSoldGames?.slice(0, 5).map(function (game: GamesCard, index: number) {
  return (
    <li className="so-game" key={game.id}>
      <span className="so-game__rank"> { index + 1 } </span>

      <span className="so-game__thumb">
        <GameImage
          src={resolveCoverImage(null, game.id, game.title, game.genre)}
          alt={game.title}
          fill
          sizes="40px"
          style={{ objectFit: "cover" }}
        />
      </span>

      <div className="so-game__info">
        <p className="so-game__title">{game.title}</p>

        <p className="so-game__sales">
          Total Sales: <b>{game.price}</b>
        </p>
      </div>

      <div className="so-game__price">
        <span>{game.price}</span>
      </div>
    </li>
  );
})}

          </ul>
          <Link href="/dashboard/games" className="so-outline">
            View All Games <ArrowRight size={14} />
          </Link>
        </article>

        <article className="so-panel">
          <div className="so-panel__head">
            <h2>Newest Users</h2>
            <Link href="/dashboard/Users">View All</Link>
          </div>
          <ul className="so-list">

            {/* display Users List */}
            
            { dashboardStats?.newestUsers?.slice(0, 5).map(  function( user: userData ){ return <li className="so-user" key={user.username}>
              <span className="so-user__avatar">
                <User size={15} />
              </span>
              <div className="so-user__info">
                <p className="so-user__name"> { user.firstName } { user.lastName } </p>
                <p className="so-user__meta"> { user.username } · { user.email }</p>
              </div>
              <div className="so-user__when">
                <span>{formatDate(user.createdAt)}</span>
              </div>
            </li>  }  )   }


            {/* <li className="so-user">
              <span className="so-user__avatar">
                <User size={15} />
              </span>
              <div className="so-user__info">
                <p className="so-user__name">Johnk4n Doe</p>
                <p className="so-user__meta">johnndoe · john@example.com</p>
              </div>
              <div className="so-user__when">
                <span>Aug 14, 2026</span>
                <span>11:29 PM</span>
              </div>
            </li> */}

            {/* <li className="so-user">
              <span className="so-user__avatar">
                <User size={15} />
              </span>
              <div className="so-user__info">
                <p className="so-user__name">Johnk4n Doe</p>
                <p className="so-user__meta">johnndoe · john@example.com</p>
              </div>
              <div className="so-user__when">
                <span>Aug 13, 2026</span>
                <span>02:03 AM</span>
              </div>
            </li>

            <li className="so-user">
              <span className="so-user__avatar">
                <User size={15} />
              </span>
              <div className="so-user__info">
                <p className="so-user__name">Youssef Osama</p>
                <p className="so-user__meta">youssefgame9 · youssefnew@gmail.com</p>
              </div>
              <div className="so-user__when">
                <span>Aug 12, 2026</span>
                <span>06:04 PM</span>
              </div>
            </li>

            <li className="so-user">
              <span className="so-user__avatar">
                <User size={15} />
              </span>
              <div className="so-user__info">
                <p className="so-user__name">John4n Doe</p>
                <p className="so-user__meta">johndoe · john@example.com</p>
              </div>
              <div className="so-user__when">
                <span>Aug 12, 2026</span>
                <span>01:13 AM</span>
              </div>
            </li>

            <li className="so-user">
              <span className="so-user__avatar">
                <User size={15} />
              </span>
              <div className="so-user__info">
                <p className="so-user__name">Youssef Osama</p>
                <p className="so-user__meta">youssefgamew · youssefosamanew@gmail.com</p>
              </div>
              <div className="so-user__when">
                <span>Aug 10, 2026</span>
                <span>08:25 PM</span>
              </div>
            </li>
             */}
          </ul>
          <Link href="/dashboard/Users" className="so-outline">
            View All Users <ArrowRight size={14} />
          </Link>
        </article>
      </div>

      <article className="so-panel so-orders">
        <div className="so-panel__head">
          <h2>Latest Orders</h2>
          <Link href="/dashboard/orders">View All Orders</Link>
        </div>
        <div className="so-table-wrap">
          <table className="so-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(dashboardStats?.latestOrders ?? []).slice(0, 8).map((order) => (
                <tr key={order.id}>
                  <td data-label="Order ID">{order.orderNumber || order.id.slice(-8)}</td>
                  <td data-label="Customer">{order.user ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}` : "Customer"}</td>
                  <td data-label="Items">{order.items?.length ?? 0}</td>
                  <td data-label="Total">{formatMoney(order.total)}</td>
                  <td data-label="Status">{order.status || "pending"}</td>
                  <td data-label="Date">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(dashboardStats?.latestOrders ?? []).length === 0 ? (
          <div className="so-empty">
            <span className="so-empty__icon">
              <ShoppingBag size={26} />
            </span>
            <p className="so-empty__title">No orders found</p>
            <p className="so-empty__text">There are no orders to display at the moment.</p>
          </div>
        ) : null}
      </article>

      <style>{`
        .so {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .so-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .so-heading {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
        }
        .so-heading__icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.4);
          flex-shrink: 0;
        }
        .so-heading__title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #fff;
          line-height: 1.15;
        }
        .so-heading__crumb {
          margin-top: 4px;
          font-size: 12px;
          color: #6b7280;
        }
        .so-heading__crumb span { margin: 0 4px; }
        .so-heading__crumb em {
          font-style: normal;
          color: #7c3aed;
          font-weight: 600;
        }
        .so-heading__desc {
          margin-top: 4px;
          font-size: 13px;
          color: #9ca3af;
        }
        .so-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .so-date, .so-export {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        .so-date {
          color: #fff;
          background: #15151a;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .so-export {
          color: #fff;
          background: #7c3aed;
          border: none;
        }
        .so-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }
        .so-card, .so-panel {
          background: #15151a;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
        }
        .so-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          padding: 14px;
        }
        .so-card__label { font-size: 13px; color: #9ca3af; margin-bottom: 6px; }
        .so-card__value { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.4px; line-height: 1.1; }
        .so-card__trend { margin-top: 6px; font-size: 12px; color: #6b7280; }
        .so-card__trend span { font-weight: 700; }
        .so-card__trend.is-up span { color: #22c55e; }
        .so-card__trend.is-down span { color: #ef4444; }
        .so-card__trend.is-neutral span { color: #6b7280; }
        .so-card__icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .so-card__icon.is-purple { background: linear-gradient(135deg, #7c3aed, #6d28d9); box-shadow: 0 0 14px rgba(124,58,237,0.4); }
        .so-card__icon.is-orange { background: linear-gradient(135deg, #f59e0b, #d97706); box-shadow: 0 0 14px rgba(245,158,11,0.35); }
        .so-card__icon.is-green { background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 0 14px rgba(34,197,94,0.35); }
        .so-card__icon.is-red { background: linear-gradient(135deg, #ef4444, #dc2626); box-shadow: 0 0 14px rgba(239,68,68,0.35); }
        .so-mid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 10px;
          align-items: stretch;
        }
        .so-panel {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 14px;
        }
        .so-panel__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .so-panel__head h2 { font-size: 15px; font-weight: 700; color: #fff; }
        .so-panel__head a { font-size: 12px; font-weight: 600; color: #7c3aed; }
        .so-list { display: flex; flex-direction: column; flex: 1; }
        .so-game, .so-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          min-width: 0;
        }
        .so-game + .so-game, .so-user + .so-user { border-top: 1px solid rgba(255,255,255,0.04); }
        .so-game__rank {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          background: #7c3aed;
          flex-shrink: 0;
        }
        .so-game__thumb {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
          background: #1a1824;
          flex-shrink: 0;
        }
        .so-game__info, .so-user__info { min-width: 0; flex: 1; }
        .so-game__title, .so-user__name {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .so-game__sales { margin-top: 2px; font-size: 11px; color: #6b7280; }
        .so-game__sales b { color: #7c3aed; font-weight: 700; }
        .so-game__price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-shrink: 0;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }
        .so-game__price s { color: #ef4444; font-weight: 600; }
        .so-game__price .is-sale { color: #ef4444; }
        .so-user__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #c4b5fd;
          background: rgba(124, 58, 237, 0.16);
          border: 1px solid rgba(124, 58, 237, 0.28);
          flex-shrink: 0;
        }
        .so-user__meta {
          margin-top: 2px;
          font-size: 11px;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .so-user__when {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          font-size: 11px;
          color: #6b7280;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .so-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(124, 58, 237, 0.45);
          color: #c4b5fd;
          font-size: 13px;
          font-weight: 700;
        }
        .so-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .so-table { width: 100%; border-collapse: collapse; }
        .so-table th, .so-table td { text-align: left; padding: 10px 12px; font-size: 12px; }
        .so-table th { color: #6b7280; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .so-table td { color: #fff; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .so-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 28px 16px 18px;
          gap: 6px;
        }
        .so-empty__icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #c4b5fd;
          background: rgba(124, 58, 237, 0.12);
          border: 1px solid rgba(124, 58, 237, 0.25);
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.18);
          margin-bottom: 4px;
        }
        .so-empty__title { font-size: 15px; font-weight: 700; color: #fff; }
        .so-empty__text { font-size: 13px; color: #9ca3af; }
        @media (max-width: 1100px) {
          .so-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .so-mid { grid-template-columns: 1fr; }
        }
        @media (max-width: 767px) {
          .so-top { flex-direction: column; }
          .so-heading__desc, .so-heading__crumb { display: none; }
          .so-actions { width: 100%; }
          .so-date, .so-export { flex: 1; justify-content: center; }
          .so-metrics { grid-template-columns: 1fr; }
          .so-user { flex-wrap: wrap; }
          .so-user__when { width: 100%; flex-direction: row; justify-content: space-between; padding-left: 46px; }
          .so-table-wrap { overflow-x: visible; }
          .so-table thead { display: none; }
          .so-table tbody { display: flex; flex-direction: column; gap: 12px; }
          .so-table tr {
            display: block;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 14px;
            padding: 4px 14px 10px;
          }
          .so-table td {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            text-align: right;
          }
          .so-table td:last-child { border-bottom: none; }
          .so-table td::before {
            content: attr(data-label);
            font-weight: 600;
            font-size: 12px;
            color: #9ca3af;
            text-align: left;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
