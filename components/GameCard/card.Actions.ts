"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiFetch } from "@/API/client";
import { ActionResult, userCart } from "@/API/types";

function getCartCount(data?: userCart): number {
  return data?.itemsCount ?? data?.items?.length ?? 0;
}

export async function AddCardAction(id: string): Promise<ActionResult> {
  try {
    const response = await apiFetch<userCart>("cart", {
      method: "POST",
      auth: true,
      body: { gameId: id, quantity: 1 },
    });

    revalidatePath("/cart");
    revalidateTag("GetUserCart", "max");

    return {
      success: true,
      message: response.message ?? "Product added to cart successfully",
      itemsCount: getCartCount(response.data),
      cartCount: getCartCount(response.data),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add product to cart";
    return { success: false, message };
  }
}

export async function DeleteCartItem(gameId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch<userCart>(`cart/${gameId}`, {
      method: "DELETE",
      auth: true,
    });

    revalidatePath("/cart");
    revalidateTag("GetUserCart", "max");

    return {
      success: true,
      message: response.message ?? "Product removed from cart",
      itemsCount: getCartCount(response.data),
      cartCount: getCartCount(response.data),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove product from cart";
    return { success: false, message };
  }
}

export async function UpdateCartQuantity(
  gameId: string,
  quantity: number
): Promise<ActionResult> {
  if (quantity < 1) {
    return DeleteCartItem(gameId);
  }

  try {
    const response = await apiFetch<userCart>(`cart/${gameId}`, {
      method: "PATCH",
      auth: true,
      body: { quantity },
    });

    revalidatePath("/cart");
    revalidateTag("GetUserCart", "max");

    return {
      success: true,
      message: response.message ?? "Cart quantity updated",
      itemsCount: getCartCount(response.data),
      cartCount: getCartCount(response.data),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update cart quantity";
    return { success: false, message };
  }
}

/** @deprecated Use DeleteCartItem */
export async function DeleteingGame(id: string): Promise<ActionResult> {
  return DeleteCartItem(id);
}

/** @deprecated Use AddCardAction */
export async function CardAction(id: string): Promise<ActionResult> {
  return AddCardAction(id);
}
