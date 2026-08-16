import { redirect } from "next/navigation";
import { GetGameDetails } from "@/API/route.services";

export default async function ProductRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await GetGameDetails(id);
  redirect(game?.slug ? `/GameDetails/${game.slug}` : "/games");
}
