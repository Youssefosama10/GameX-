"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { CreateReviewAction, DeleteReviewAction, UpdateReviewAction } from "@/API/actions";
import type { Review } from "@/API/types";

export default function ReviewsPanel({
  gameId,
  initialReviews,
}: {
  gameId: string;
  initialReviews: Review[];
}) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const userId = session?.user?.id;
  const ownReview = reviews.find((review) => review.user?.id && review.user.id === userId);

  async function submit() {
    setPending(true);
    try {
      const result = ownReview
        ? await UpdateReviewAction(ownReview.id, rating, comment)
        : await CreateReviewAction(gameId, rating, comment);
      if (result.success) {
        toast.success(result.message ?? "Review saved");
        if (!ownReview) {
          setReviews((current) => [
            {
              id: `temp-${Date.now()}`,
              rating,
              comment,
              user: { id: userId, username: session?.user?.name ?? "You" },
              createdAt: new Date().toISOString(),
            },
            ...current,
          ]);
        } else {
          setReviews((current) =>
            current.map((review) =>
              review.id === ownReview.id ? { ...review, rating, comment } : review
            )
          );
        }
      } else {
        toast.error(result.message ?? "Could not save review");
      }
    } finally {
      setPending(false);
    }
  }

  async function remove(id: string) {
    const result = await DeleteReviewAction(id);
    if (result.success) {
      setReviews((current) => current.filter((review) => review.id !== id));
      toast.info("Review deleted");
    } else {
      toast.error(result.message ?? "Could not delete review");
    }
  }

  return (
    <section className="gx-panel">
      <h2 className="section-title" style={{ fontSize: 22 }}>Reviews</h2>
      {session ? (
        <div className="gx-form-grid" style={{ margin: "16px 0 24px" }}>
          <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} stars
              </option>
            ))}
          </select>
          <textarea
            rows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={ownReview ? "Update your review" : "Share your thoughts. You must own the game."}
          />
          <button type="button" className="gx-btn gx-btn--primary" onClick={submit} disabled={pending || !comment.trim()}>
            {pending ? "Saving..." : ownReview ? "Update review" : "Post review"}
          </button>
        </div>
      ) : (
        <p className="section-subtitle">Sign in to write a review after purchase.</p>
      )}
      {reviews.length ? (
        reviews.map((review) => (
          <article key={review.id} className="gx-review">
            <strong>{review.user?.username || review.user?.firstName || "Player"}</strong>
            <p>{review.rating}/5</p>
            <p>{review.comment}</p>
            {review.user?.id === userId ? (
              <button type="button" className="gx-btn gx-btn--ghost" onClick={() => remove(review.id)}>
                Delete
              </button>
            ) : null}
          </article>
        ))
      ) : (
        <p className="section-subtitle">No reviews yet.</p>
      )}
    </section>
  );
}
