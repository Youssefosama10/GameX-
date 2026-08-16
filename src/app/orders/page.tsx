import Link from "next/link";
import { GetMyOrders } from "@/API/route.services";
import Pagination from "../../../components/Pagination/Pagination";
import { formatDate, formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = Number(page) || 1;
  const result = await GetMyOrders(currentPage, 10);
  const orders = result?.orders ?? [];

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="gx-catalog__intro">
          <p className="gx-kicker">Account</p>
          <h1 className="section-title">My Orders</h1>
          <p className="section-subtitle">Track purchases, license keys, and order status.</p>
        </div>
        {orders.length ? (
          <div className="gx-table-wrap gx-panel">
            <table className="gx-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber || order.id.slice(-8)}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <span className={`gx-status gx-status--${order.status || "pending"}`}>
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td>{formatMoney(order.total)}</td>
                    <td>
                      <Link href={`/orders/${order.id}`} className="text-violet-400">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No orders yet</h3>
            <p>When you complete checkout, your orders will appear here.</p>
            <Link href="/games" className="gx-btn gx-btn--primary">
              Browse games
            </Link>
          </div>
        )}
        <Pagination
          page={result?.pagination.page ?? currentPage}
          totalPages={result?.pagination.totalPages ?? 1}
          hrefFor={(next) => `/orders?page=${next}`}
        />
      </div>
    </div>
  );
}
