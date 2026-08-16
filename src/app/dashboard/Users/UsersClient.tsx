"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Ban, Shield, Trash2, Unlock } from "lucide-react";
import {
  BlockUserAction,
  ChangeUserRoleAction,
  DeleteUserAction,
  UnblockUserAction,
} from "@/API/actions";
import type { AllUsers } from "@/API/types";
import { formatDate } from "@/lib/format";

export default function UsersClient({
  users,
  page,
  totalPages,
  total,
  search,
  role,
}: {
  users: AllUsers[];
  page: number;
  totalPages: number;
  total: number;
  search: string;
  role: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(search);
  const [roleFilter, setRoleFilter] = useState(role);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const blocked = users.filter((user) => user.isBlocked).length;
  const admins = users.filter((user) => user.role === "admin").length;

  function applyFilters() {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (roleFilter) params.set("role", roleFilter);
    router.push(`/dashboard/Users?${params.toString()}`);
  }

  async function run(id: string, action: () => Promise<{ success: boolean; message?: string }>) {
    setPendingId(id);
    try {
      const result = await action();
      if (result.success) {
        toast.success(result.message ?? "Updated");
        router.refresh();
      } else {
        toast.error(result.message ?? "Action failed");
      }
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 px-2 pt-2 pb-4">
      <div>
        <h1 className="text-[28px] font-extrabold text-white">Users</h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">Manage access, roles, and blocked accounts.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/6 bg-[#15151a] p-5">
          <p className="text-xs uppercase text-zinc-400">Total</p>
          <p className="mt-2 text-2xl font-extrabold text-white">{total}</p>
        </article>
        <article className="rounded-xl border border-white/6 bg-[#15151a] p-5">
          <p className="text-xs uppercase text-zinc-400">Admins on page</p>
          <p className="mt-2 text-2xl font-extrabold text-white">{admins}</p>
        </article>
        <article className="rounded-xl border border-white/6 bg-[#15151a] p-5">
          <p className="text-xs uppercase text-zinc-400">Blocked on page</p>
          <p className="mt-2 text-2xl font-extrabold text-white">{blocked}</p>
        </article>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, email or username"
          className="h-11 min-w-[240px] flex-1 rounded-lg border border-white/6 bg-[#15151a] px-4 text-sm text-white"
        />
        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          className="h-11 rounded-lg border border-white/6 bg-[#15151a] px-4 text-sm text-white"
        >
          <option value="">All roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="button" className="gx-btn gx-btn--primary" onClick={applyFilters}>
          Apply
        </button>
      </div>

      <div className="gx-table-wrap rounded-xl border border-white/6 bg-[#15151a]">
        <table className="gx-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <p className="font-bold text-white">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-zinc-500">{user.username}</p>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    defaultValue={user.role}
                    disabled={pendingId === user._id}
                    onChange={(event) => run(user._id, () => ChangeUserRoleAction(user._id, event.target.value))}
                    className="rounded bg-[#0b0a10] px-2 py-1 text-sm"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <span className={`gx-status ${user.isBlocked ? "gx-status--blocked" : "gx-status--active"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label={user.isBlocked ? "Unblock" : "Block"}
                      disabled={pendingId === user._id}
                      onClick={() =>
                        run(user._id, () => (user.isBlocked ? UnblockUserAction(user._id) : BlockUserAction(user._id)))
                      }
                    >
                      {user.isBlocked ? <Unlock size={16} /> : <Ban size={16} />}
                    </button>
                    <button
                      type="button"
                      aria-label="Delete user"
                      disabled={pendingId === user._id}
                      onClick={() => run(user._id, () => DeleteUserAction(user._id))}
                    >
                      <Trash2 size={16} />
                    </button>
                    <Shield size={16} className="text-zinc-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between text-sm text-zinc-400">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 ? (
            <button type="button" onClick={() => router.push(`/dashboard/Users?page=${page - 1}`)}>Previous</button>
          ) : null}
          {page < totalPages ? (
            <button type="button" onClick={() => router.push(`/dashboard/Users?page=${page + 1}`)}>Next</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
