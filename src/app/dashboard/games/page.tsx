import Link from "next/link";
import { GetAdminGames } from "@/API/route.services";
import AdminGamesClient from "./AdminGamesClient";

export const dynamic = "force-dynamic";

export default async function AdminGamesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; isDeleted?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const result = await GetAdminGames(page, 20, params.search, params.isDeleted);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-white">Games</h1>
          <p className="text-sm text-zinc-400">Create, update, archive, and restore catalog titles.</p>
        </div>
        <Link href="/dashboard/games/new" className="gx-btn px-4! gx-btn--primary shrink-0">
          Add game
        </Link>
      </div>
      <AdminGamesClient
        games={result?.games ?? []}
        page={result?.pagination.page ?? page}
        totalPages={result?.pagination.totalPages ?? 1}
        search={params.search ?? ""}
        isDeleted={params.isDeleted ?? ""}
      />
    </div>
  );
}
