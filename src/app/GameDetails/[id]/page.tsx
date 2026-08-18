import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GetGameDetails, GetGameReviews, GetRelatedGames } from "@/API/route.services";
import GameDetailsClient from "./GameDetailsClient";
import ReviewsPanel from "./ReviewsPanel";
import { resolveCoverImage, getGameThumbnails } from "@/lib/gameImages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const game = await GetGameDetails(id);

  if (!game) {
    return { title: "Game not found — GameX" };
  }

  return {
    title: `${game.title} — GameX`,
    description:
      game.shortDescription || game.description || `Buy ${game.title} on GameX.`,
  };
}

export default async function GameDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const gameDetailsObject = await GetGameDetails(slug);

  if (!gameDetailsObject) {
    notFound();
  }

  const related = gameDetailsObject.relatedGames?.length
    ? gameDetailsObject.relatedGames
    : await GetRelatedGames(slug);
  const reviews = await GetGameReviews(gameDetailsObject.id);
  const coverImage = resolveCoverImage(
    null,
    gameDetailsObject.id,
    gameDetailsObject.title,
    gameDetailsObject.genre
  );
  const thumbnails = getGameThumbnails(
    gameDetailsObject.id,
    gameDetailsObject.title,
    gameDetailsObject.genre
  );

  return (
    <>
      <GameDetailsClient
        game={gameDetailsObject}
        coverImage={coverImage}
        thumbnails={thumbnails}
        relatedGames={related}
      />
      <div className="container" style={{ paddingBottom: 64 }}>
        <ReviewsPanel gameId={gameDetailsObject.id} initialReviews={reviews.reviews} />
      </div>
    </>
  );
}
