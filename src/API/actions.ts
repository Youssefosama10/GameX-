"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiFetch } from "./client";
import { getWishlistCount, normalizeWishlistData } from "./normalize";
import type {
  ActionResult,
  AdminGameInput,
  CouponValidation,
  RawWishlistData,
  userCart,
} from "./types";

function getCartCount(data?: userCart): number {
  return data?.itemsCount ?? data?.items?.length ?? 0;
}

function fail(error: unknown, fallback: string): ActionResult {
  return {
    success: false,
    message: error instanceof Error ? error.message : fallback,
  };
}

export async function ClearCartAction(): Promise<ActionResult> {
  try {
    const response = await apiFetch<userCart>("cart", { method: "DELETE", auth: true });
    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidateTag("GetUserCart", "max");
    return {
      success: true,
      message: response.message ?? "Cart cleared",
      cartCount: getCartCount(response.data),
    };
  } catch (error) {
    return fail(error, "Failed to clear cart");
  }
}

export async function MoveWishlistToCart(gameId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch<unknown>(`wishlist/move-to-cart/${gameId}`, {
      method: "POST",
      auth: true,
    });
    revalidatePath("/wishlist");
    revalidatePath("/cart");
    revalidateTag("GetUserWishlist", "max");
    revalidateTag("GetUserCart", "max");
    return { success: true, message: response.message ?? "Moved to cart", data: response.data };
  } catch (error) {
    return fail(error, "Failed to move game to cart");
  }
}

export async function ValidateCouponAction(code: string, cartTotal: number): Promise<ActionResult> {
  try {
    const response = await apiFetch<CouponValidation>("coupons/validate", {
      method: "POST",
      auth: true,
      body: { code, cartTotal },
    });
    return {
      success: true,
      message: response.message ?? "Coupon applied",
      data: response.data,
    };
  } catch (error) {
    return fail(error, "Invalid coupon");
  }
}

export async function CheckoutAction(paymentMethod: string, couponCode?: string): Promise<ActionResult> {
  try {
    const response = await apiFetch<unknown>("checkout", {
      method: "POST",
      auth: true,
      body: { paymentMethod, couponCode: couponCode || "" },
    });
    revalidatePath("/cart");
    revalidatePath("/orders");
    revalidatePath("/library");
    revalidateTag("GetUserCart", "max");
    revalidateTag("GetMyOrders", "max");
    revalidateTag("GetLibrary", "max");
    return {
      success: true,
      message: response.message ?? "Order placed successfully",
      data: response.data,
    };
  } catch (error) {
    return fail(error, "Checkout failed");
  }
}

export async function UpdateProfileAction(body: {
  firstName?: string;
  lastName?: string;
  username?: string;
}): Promise<ActionResult> {
  try {
    const response = await apiFetch("users/me", { method: "PUT", auth: true, body });
    revalidatePath("/profile");
    revalidateTag("GetMyProfile", "max");
    return { success: true, message: response.message ?? "Profile updated", data: response.data };
  } catch (error) {
    return fail(error, "Failed to update profile");
  }
}

export async function UploadAvatarAction(formData: FormData): Promise<ActionResult> {
  try {
    const response = await apiFetch("users/me/avatar", {
      method: "PUT",
      auth: true,
      body: formData,
    });
    revalidatePath("/profile");
    revalidateTag("GetMyProfile", "max");
    return { success: true, message: response.message ?? "Avatar updated", data: response.data };
  } catch (error) {
    return fail(error, "Failed to upload avatar");
  }
}

export async function ChangePasswordAction(
  currentPassword: string,
  newPassword: string
): Promise<ActionResult> {
  try {
    const response = await apiFetch("users/change-password", {
      method: "PUT",
      auth: true,
      body: { currentPassword, newPassword },
    });
    return { success: true, message: response.message ?? "Password changed" };
  } catch (error) {
    return fail(error, "Failed to change password");
  }
}

export async function ForgotPasswordAction(email: string): Promise<ActionResult> {
  try {
    const response = await apiFetch("auth/forgot-password", {
      method: "POST",
      body: { email },
    });
    return { success: true, message: response.message ?? "Reset email sent" };
  } catch (error) {
    return fail(error, "Failed to send reset email");
  }
}

export async function ResetPasswordAction(token: string, password: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`auth/reset-password/${token}`, {
      method: "PUT",
      body: { password },
    });
    return { success: true, message: response.message ?? "Password reset successfully" };
  } catch (error) {
    return fail(error, "Failed to reset password");
  }
}

export async function LogoutApiAction(): Promise<void> {
  try {
    await apiFetch("auth/logout", { method: "POST", auth: "optional" });
  } catch {
    // Session is still cleared client-side.
  }
}

export async function CreateReviewAction(
  gameId: string,
  rating: number,
  comment: string
): Promise<ActionResult> {
  try {
    const response = await apiFetch(`reviews/game/${gameId}`, {
      method: "POST",
      auth: true,
      body: { rating, comment },
    });
    revalidatePath("/GameDetails");
    return { success: true, message: response.message ?? "Review posted", data: response.data };
  } catch (error) {
    return fail(error, "Failed to post review");
  }
}

export async function UpdateReviewAction(
  reviewId: string,
  rating: number,
  comment: string
): Promise<ActionResult> {
  try {
    const response = await apiFetch(`reviews/${reviewId}`, {
      method: "PATCH",
      auth: true,
      body: { rating, comment },
    });
    return { success: true, message: response.message ?? "Review updated", data: response.data };
  } catch (error) {
    return fail(error, "Failed to update review");
  }
}

export async function DeleteReviewAction(reviewId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`reviews/${reviewId}`, { method: "DELETE", auth: true });
    return { success: true, message: response.message ?? "Review deleted" };
  } catch (error) {
    return fail(error, "Failed to delete review");
  }
}

export async function GetNotificationsAction(page = 1, limit = 8) {
  const { GetNotifications } = await import("./route.services");
  return GetNotifications(page, limit);
}

export async function GetUnreadCountAction() {
  const { GetUnreadNotificationCount } = await import("./route.services");
  return GetUnreadNotificationCount();
}

export async function MarkNotificationReadAction(id: string): Promise<ActionResult> {
  try {
    await apiFetch(`notifications/${id}/read`, { method: "PUT", auth: true });
    revalidateTag("GetNotifications", "max");
    return { success: true };
  } catch (error) {
    return fail(error, "Failed to mark notification");
  }
}

export async function MarkAllNotificationsReadAction(): Promise<ActionResult> {
  try {
    await apiFetch("notifications/read-all", { method: "PUT", auth: true });
    revalidateTag("GetNotifications", "max");
    return { success: true, message: "All notifications marked as read" };
  } catch (error) {
    return fail(error, "Failed to mark notifications");
  }
}

export async function BlockUserAction(userId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/users/${userId}/block`, { method: "PATCH", auth: true });
    revalidatePath("/dashboard/Users");
    return { success: true, message: response.message ?? "User blocked" };
  } catch (error) {
    return fail(error, "Failed to block user");
  }
}

export async function UnblockUserAction(userId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/users/${userId}/unblock`, { method: "PATCH", auth: true });
    revalidatePath("/dashboard/Users");
    return { success: true, message: response.message ?? "User unblocked" };
  } catch (error) {
    return fail(error, "Failed to unblock user");
  }
}

export async function ChangeUserRoleAction(userId: string, role: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/users/${userId}/role`, {
      method: "PATCH",
      auth: true,
      body: { role },
    });
    revalidatePath("/dashboard/Users");
    return { success: true, message: response.message ?? "Role updated" };
  } catch (error) {
    return fail(error, "Failed to change role");
  }
}

export async function DeleteUserAction(userId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/users/${userId}`, { method: "DELETE", auth: true });
    revalidatePath("/dashboard/Users");
    return { success: true, message: response.message ?? "User deleted" };
  } catch (error) {
    return fail(error, "Failed to delete user");
  }
}

export async function UpdateOrderStatusAction(orderId: string, status: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/orders/${orderId}/status`, {
      method: "PATCH",
      auth: true,
      body: { status },
    });
    revalidatePath("/dashboard/orders");
    return { success: true, message: response.message ?? "Order status updated" };
  } catch (error) {
    return fail(error, "Failed to update order");
  }
}

export async function CancelOrderAction(orderId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/orders/${orderId}/cancel`, { method: "POST", auth: true });
    revalidatePath("/dashboard/orders");
    return { success: true, message: response.message ?? "Order cancelled" };
  } catch (error) {
    return fail(error, "Failed to cancel order");
  }
}

export async function RefundOrderAction(orderId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/orders/${orderId}/refund`, { method: "POST", auth: true });
    revalidatePath("/dashboard/orders");
    return { success: true, message: response.message ?? "Order refunded" };
  } catch (error) {
    return fail(error, "Failed to refund order");
  }
}

export async function CreateAdminGameAction(body: AdminGameInput): Promise<ActionResult> {
  try {
    const response = await apiFetch("admin/games", { method: "POST", auth: true, body });
    revalidatePath("/dashboard/games");
    return { success: true, message: response.message ?? "Game created", data: response.data };
  } catch (error) {
    return fail(error, "Failed to create game");
  }
}

export async function UpdateAdminGameAction(gameId: string, body: Partial<AdminGameInput>): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/games/${gameId}`, { method: "PUT", auth: true, body });
    revalidatePath("/dashboard/games");
    return { success: true, message: response.message ?? "Game updated", data: response.data };
  } catch (error) {
    return fail(error, "Failed to update game");
  }
}

export async function DeleteAdminGameAction(gameId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/games/${gameId}`, { method: "DELETE", auth: true });
    revalidatePath("/dashboard/games");
    return { success: true, message: response.message ?? "Game deleted" };
  } catch (error) {
    return fail(error, "Failed to delete game");
  }
}

export async function RestoreAdminGameAction(gameId: string): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/games/${gameId}/restore`, { method: "PATCH", auth: true });
    revalidatePath("/dashboard/games");
    return { success: true, message: response.message ?? "Game restored" };
  } catch (error) {
    return fail(error, "Failed to restore game");
  }
}

export async function UploadGameCoverAction(gameId: string, formData: FormData): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/games/${gameId}/cover`, {
      method: "POST",
      auth: true,
      body: formData,
    });
    revalidatePath("/dashboard/games");
    return { success: true, message: response.message ?? "Cover uploaded", data: response.data };
  } catch (error) {
    return fail(error, "Failed to upload cover");
  }
}

export async function UploadGameGalleryAction(gameId: string, formData: FormData): Promise<ActionResult> {
  try {
    const response = await apiFetch(`admin/games/${gameId}/gallery`, {
      method: "POST",
      auth: true,
      body: formData,
    });
    revalidatePath("/dashboard/games");
    return { success: true, message: response.message ?? "Gallery uploaded", data: response.data };
  } catch (error) {
    return fail(error, "Failed to upload gallery");
  }
}

export async function GetWishlistCountFromRaw(data?: RawWishlistData): Promise<number> {
  return getWishlistCount(normalizeWishlistData(data));
}
