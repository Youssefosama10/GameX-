import { GetCategories } from "@/API/route.services";
import GameForm from "../GameForm";

export default async function NewGamePage() {
  const categories = await GetCategories();
  return (
    <div>
      <h1 className="mb-6 text-[28px] font-extrabold text-white">Create game</h1>
      <GameForm categories={categories} />
    </div>
  );
}
