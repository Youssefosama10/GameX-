"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { CancelOrderAction, RefundOrderAction, UpdateOrderStatusAction } from "@/API/actions";
import type { Order } from "@/API/types";
import { formatDate, formatMoney } from "@/lib/format";

const STATUSES = ["pending", "processing", "completed", "cancelled", "refunded"];

export default function AdminOrdersClient({
  orders,
  page,
  totalPages,
  status,
}: {
  orders: Order[];
  page: number;
  totalPages: number;
  status: string;
}) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function run(id: string, action: () => Promise<{ success: boolean; message?: string }>) {
    if (pendingId) return;
    setPendingId(id);
    try {
      const result = await action();
      if (result.success) {
        toast.success(result.message ?? "Updated");
        router.refresh();
      } else {
        toast.error(result.message ?? "Action failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-white">Orders</h1>
          <p className="text-sm text-zinc-400">Update status, cancel, or refund customer orders.</p>
        </div>
        <select
          value={status}
          onChange={(event) => router.push(event.target.value ? `/dashboard/orders?status=${event.target.value}` : "/dashboard/orders")}
          className="h-11 rounded-lg border border-white/6 bg-[#15151a] px-4 text-sm text-white"
        >
          <option value="">All statuses</option>
          {STATUSES.map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <div className="gx-table-wrap gx-panel">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link href={`/dashboard/orders/${order.id}`} className="text-violet-400">
                    {order.orderNumber || order.id.slice(-8)}
                  </Link>
                </td>
                <td>{order.user ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}` : "—"}</td>
                <td>{formatMoney(order.total)}</td>
                <td>
                  <select
                    value={order.status || "pending"}
                    disabled={pendingId === order.id}
                    onChange={(event) => run(order.id, () => UpdateOrderStatusAction(order.id, event.target.value))}
                    className="rounded bg-[#0b0a10] px-2 py-1 text-sm"
                  >
                    {STATUSES.map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td className="flex gap-2">
                  <button
                    type="button"
                    className="gx-btn gx-btn--ghost"
                    disabled={pendingId === order.id}
                    onClick={() => run(order.id, () => CancelOrderAction(order.id))}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="gx-btn gx-btn--ghost"
                    disabled={pendingId === order.id}
                    onClick={() => run(order.id, () => RefundOrderAction(order.id))}
                  >
                    Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length ? <p className="p-6 text-zinc-400">No orders found.</p> : null}
      </div>

      <div className="flex justify-between text-sm text-zinc-400">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 ? <button type="button" onClick={() => router.push(`/dashboard/orders?page=${page - 1}`)}>Previous</button> : null}
          {page < totalPages ? <button type="button" onClick={() => router.push(`/dashboard/orders?page=${page + 1}`)}>Next</button> : null}
        </div>
      </div>
    </div>
  );
}
