import { GetGameDetails, GetGameReviews, GetRelatedGames } from "@/API/route.services";
import GameDetailsClient from "./GameDetailsClient";
import ReviewsPanel from "./ReviewsPanel";
import { resolveCoverImage, getGameThumbnails } from "@/lib/gameImages";

export default async function GameDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const gameDetailsObject = await GetGameDetails(slug);

  if (!gameDetailsObject) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <h3>Game not found</h3>
          <p>The game you are looking for could not be loaded.</p>
        </div>
      </div>
    );
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
