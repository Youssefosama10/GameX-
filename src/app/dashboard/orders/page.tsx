import { GetAdminOrders } from "@/API/route.services";
import AdminOrdersClient from "./AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const result = await GetAdminOrders(page, 20, params.status);

  return (
    <AdminOrdersClient
      orders={result?.orders ?? []}
      page={result?.pagination.page ?? page}
      totalPages={result?.pagination.totalPages ?? 1}
      status={params.status ?? ""}
    />
  );
}
