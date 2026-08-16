"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { DeleteAdminGameAction, RestoreAdminGameAction } from "@/API/actions";
import type { GamesCard } from "@/API/types";
import { formatMoney } from "@/lib/format";
import { resolveCoverImage } from "@/lib/gameImages";

export default function AdminGamesClient({
  games,
  page,
  totalPages,
  search,
  isDeleted,
}: {
  games: GamesCard[];
  page: number;
  totalPages: number;
  search: string;
  isDeleted: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(search);

  async function run(action: () => Promise<{ success: boolean; message?: string }>) {
    const result = await action();
    if (result.success) {
      toast.success(result.message ?? "Updated");
      router.refresh();
    } else {
      toast.error(result.message ?? "Action failed");
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search games"
          className="h-11 flex-1 rounded-lg border border-white/6 bg-[#15151a] px-4 text-sm text-white"
        />
        <button
          type="button"
          className="gx-btn gx-btn--primary"
          onClick={() => router.push(`/dashboard/games?search=${encodeURIComponent(query)}${isDeleted ? `&isDeleted=${isDeleted}` : ""}`)}
        >
          Search
        </button>
        <button
          type="button"
          className="gx-btn gx-btn--ghost"
          onClick={() => router.push(isDeleted === "true" ? "/dashboard/games" : "/dashboard/games?isDeleted=true")}
        >
          {isDeleted === "true" ? "Show active" : "Show deleted"}
        </button>
      </div>
      <div className="gx-table-wrap gx-panel">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>
                  <Link href={`/dashboard/games/${game.id}`} className="flex items-center gap-3 text-violet-400">
                    <img
                      src={resolveCoverImage(null, game.id, game.title, game.genre)}
                      alt={game.title}
                      width={36}
                      height={48}
                      style={{ width: 36, height: 48, objectFit: "cover", borderRadius: 6 }}
                    />
                    {game.title}
                  </Link>
                </td>
                <td>{formatMoney(game.finalPrice ?? game.price)}</td>
                <td>{game.stock ?? "—"}</td>
                <td>{game.isDeleted ? "Deleted" : game.isOutOfStock ? "Out of stock" : "Active"}</td>
                <td className="flex gap-2">
                  {game.isDeleted ? (
                    <button type="button" className="gx-btn gx-btn--ghost" onClick={() => run(() => RestoreAdminGameAction(game.id))}>
                      Restore
                    </button>
                  ) : (
                    <button type="button" className="gx-btn gx-btn--ghost" onClick={() => run(() => DeleteAdminGameAction(game.id))}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!games.length ? <p className="p-6 text-zinc-400">No games found.</p> : null}
      </div>
      <div className="flex justify-between text-sm text-zinc-400">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 ? <button type="button" onClick={() => router.push(`/dashboard/games?page=${page - 1}`)}>Previous</button> : null}
          {page < totalPages ? <button type="button" onClick={() => router.push(`/dashboard/games?page=${page + 1}`)}>Next</button> : null}
        </div>
      </div>
    </>
  );
}
