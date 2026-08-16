import type { Metadata } from "next";
import { GetAllUsers } from "@/API/route.services";
import UsersClient from "./UsersClient";

export const metadata: Metadata = {
  title: "Users — Game Zone",
  description: "Manage all users, view their details and control their access.",
};

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; role?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const result = await GetAllUsers(page, 20, params.search, params.role);

  return (
    <UsersClient
      users={result?.users ?? []}
      page={result?.pagination.page ?? page}
      totalPages={result?.pagination.totalPages ?? 1}
      total={result?.pagination.total ?? result?.users.length ?? 0}
      search={params.search ?? ""}
      role={params.role ?? ""}
    />
  );
}
