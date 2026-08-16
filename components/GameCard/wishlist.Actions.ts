"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiFetch } from "@/API/client";
import { getWishlistCount, normalizeWishlistData } from "@/API/route.services";
import { ActionResult, RawWishlistData } from "@/API/types";

export async function AddToWishlist(gameId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch<RawWishlistData>("wishlist", {
      method: "POST",
      auth: true,
      body: { gameId },
    });

    revalidatePath("/wishlist");
    revalidateTag("GetUserWishlist", "max");

    return {
      success: true,
      message: response.message ?? "Added to wishlist!",
      wishlistCount: getWishlistCount(normalizeWishlistData(response.data)),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add to wishlist";
    return { success: false, message };
  }
}

export async function RemoveFromWishlist(gameId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch<RawWishlistData>(`wishlist/${gameId}`, {
      method: "DELETE",
      auth: true,
    });

    revalidatePath("/wishlist");
    revalidateTag("GetUserWishlist", "max");

    return {
      success: true,
      message: response.message ?? "Removed from wishlist",
      wishlistCount: getWishlistCount(normalizeWishlistData(response.data)),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove from wishlist";
    return { success: false, message };
  }
}

export async function GetNavbarCountsAction(): Promise<{
  cartCount: number;
  wishlistCount: number;
}> {
  const { GetNavbarCounts } = await import("@/API/route.services");
  return GetNavbarCounts();
}
