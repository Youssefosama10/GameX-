import { notFound } from "next/navigation";
import { GetAdminGame, GetCategories } from "@/API/route.services";
import GameForm from "../GameForm";

export const dynamic = "force-dynamic";

export default async function EditGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [game, categories] = await Promise.all([GetAdminGame(id), GetCategories()]);
  if (!game) notFound();

  return (
    <div>
      <h1 className="mb-6 text-[28px] font-extrabold text-white">Edit {game.title}</h1>
      <GameForm game={game} categories={categories} />
    </div>
  );
}
