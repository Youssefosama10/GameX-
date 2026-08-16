import { apiFetch, publicApiFetch } from "./client";
import {
  getWishlistCount,
  isRecord,
  normalizeBanner,
  normalizeCategories,
  normalizeCategory,
  normalizeFlashSale,
  normalizeGame,
  normalizeGames,
  normalizeLibraryGame,
  normalizeNotification,
  normalizeOrder,
  normalizeOrders,
  normalizePagination,
  normalizeProfile,
  normalizeReview,
  normalizeUser,
  normalizeWishlistData,
  gamesQueryPath,
} from "./normalize";
import type {
  AllUsers,
  Category,
  DashboardStats,
  FlashSale,
  GameDetails,
  GamesCard,
  GamesListResult,
  GamesQuery,
  HeroBanner,
  HomeData,
  LibraryGame,
  NavbarCounts,
  NotificationItem,
  NotificationsResult,
  Order,
  OrdersResult,
  RawWishlistData,
  ReviewsResult,
  UserProfile,
  UsersResult,
  WishlistData,
  userCart,
  userData,
} from "./types";

export {
  getWishlistCount,
  normalizeGame,
  normalizeWishlistData,
} from "./normalize";

function listFrom(data: unknown, keys: string[]): unknown[] {
  if (Array.isArray(data)) return data;
  if (!isRecord(data)) return [];
  for (const key of keys) {
    if (Array.isArray(data[key])) return data[key] as unknown[];
  }
  return [];
}

export async function GetAllGames(query: GamesQuery = {}): Promise<GamesCard[] | undefined> {
  const result = await GetGames(query);
  return result?.games;
}

export async function GetGames(query: GamesQuery = {}): Promise<GamesListResult | undefined> {
  try {
    const response = await publicApiFetch<Record<string, unknown>>(gamesQueryPath(query));
    const data = response.data ?? {};
    const games = normalizeGames(listFrom(data, ["games", "items"]));
    return {
      games,
      pagination: normalizePagination(
        isRecord(data) ? data.pagination ?? data : data,
        games.length,
        query.page ?? 1,
        query.limit ?? 12
      ),
    };
  } catch (error) {
    console.log("error from Games", error);
    return undefined;
  }
}

export async function GetGameDetails(slug: string): Promise<GameDetails | undefined> {
  try {
    const response = await publicApiFetch<{ game?: unknown; relatedGames?: unknown }>(`games/${slug}`);
    const raw = isRecord(response.data) ? response.data.game ?? response.data : undefined;
    if (!raw) return undefined;

    const game = normalizeGame(raw) as GameDetails;
    const record = isRecord(raw) ? raw : {};
    game.description = typeof record.description === "string" ? record.description : undefined;
    game.shortDescription = typeof record.shortDescription === "string" ? record.shortDescription : undefined;
    game.publisher = typeof record.publisher === "string" ? record.publisher : undefined;
    game.developer = typeof record.developer === "string" ? record.developer : undefined;
    game.releaseDate = typeof record.releaseDate === "string" ? record.releaseDate : undefined;
    game.trailer = typeof record.trailer === "string" ? record.trailer : undefined;
    game.tags = Array.isArray(record.tags) ? (record.tags as string[]) : undefined;
    game.gallery = Array.isArray(record.gallery) ? (record.gallery as string[]) : undefined;
    game.screenshots = Array.isArray(record.screenshots) ? (record.screenshots as string[]) : undefined;
    game.category = isRecord(record.category)
      ? normalizeCategory(record.category) ?? undefined
      : typeof record.category === "string"
        ? record.category
        : undefined;
    game.systemRequirements = isRecord(record.systemRequirements)
      ? (record.systemRequirements as GameDetails["systemRequirements"])
      : undefined;
    game.relatedGames = normalizeGames(
      record.relatedGames ?? (isRecord(response.data) ? response.data.relatedGames : undefined)
    );
    return game;
  } catch (error) {
    console.log("error GameDetails", error);
    return undefined;
  }
}

export async function GetRelatedGames(slug: string): Promise<GamesCard[]> {
  try {
    const response = await publicApiFetch<unknown>(`games/${slug}/related`);
    return normalizeGames(listFrom(response.data, ["games", "relatedGames", "items"]));
  } catch {
    return [];
  }
}

export async function GetRecommendedGames(): Promise<GamesCard[]> {
  try {
    const response = await apiFetch<unknown>("games/recommended", { auth: true });
    return normalizeGames(listFrom(response.data, ["games", "items"]));
  } catch {
    return [];
  }
}

export async function GetHomeData(): Promise<HomeData | undefined> {
  try {
    const response = await publicApiFetch<Record<string, unknown>>("home");
    const data = isRecord(response.data) ? response.data : {};
    return {
      heroBanners: listFrom(data.heroBanners, []).map(normalizeBanner).filter((item): item is HeroBanner => item !== null),
      featuredGames: normalizeGames(data.featuredGames),
      trendingGames: normalizeGames(data.trendingGames),
      newReleases: normalizeGames(data.newReleases),
      topRated: normalizeGames(data.topRated),
      flashSale: normalizeFlashSale(data.flashSale),
      categories: normalizeCategories(data.categories),
    };
  } catch (error) {
    console.log("error from GetHomeData", error);
    return undefined;
  }
}

export async function GetHeroBanners(): Promise<HeroBanner[]> {
  try {
    const response = await publicApiFetch<unknown>("hero-banners");
    return listFrom(response.data, ["banners", "heroBanners", "items"])
      .map(normalizeBanner)
      .filter((item): item is HeroBanner => item !== null);
  } catch {
    return [];
  }
}

export async function GetActiveFlashSale(): Promise<FlashSale | null> {
  try {
    const response = await publicApiFetch<unknown>("flash-sales/active");
    return normalizeFlashSale(isRecord(response.data) ? response.data.flashSale ?? response.data : response.data);
  } catch {
    return null;
  }
}

export async function GetCategories(): Promise<Category[]> {
  try {
    const response = await publicApiFetch<unknown>("categories");
    return normalizeCategories(listFrom(response.data, ["categories", "items"]));
  } catch {
    return [];
  }
}

export async function GetCategory(slug: string): Promise<Category | undefined> {
  try {
    const response = await publicApiFetch<unknown>(`categories/${slug}`);
    const raw = isRecord(response.data) ? response.data.category ?? response.data : response.data;
    return normalizeCategory(raw) ?? undefined;
  } catch {
    return undefined;
  }
}

export async function GetCategoryGames(
  slug: string,
  page = 1,
  limit = 12
): Promise<GamesListResult | undefined> {
  try {
    const response = await publicApiFetch<Record<string, unknown>>(
      `categories/${slug}/games?page=${page}&limit=${limit}`
    );
    const data = response.data ?? {};
    const games = normalizeGames(listFrom(data, ["games", "items"]));
    return {
      games,
      pagination: normalizePagination(isRecord(data) ? data.pagination ?? data : data, games.length, page, limit),
    };
  } catch {
    return undefined;
  }
}

export async function GetUserCart(): Promise<userCart | undefined> {
  try {
    const response = await apiFetch<userCart>("cart", {
      auth: true,
      tags: ["GetUserCart"],
    });
    return response.data;
  } catch (error) {
    console.log("error from GetUserCart", error);
    return undefined;
  }
}

export async function GetUserWishlist(): Promise<WishlistData | null> {
  try {
    const response = await apiFetch<RawWishlistData>("wishlist", {
      auth: true,
      tags: ["GetUserWishlist"],
    });
    return normalizeWishlistData(response.data);
  } catch (error) {
    console.log("error from GetUserWishlist", error);
    return null;
  }
}

export async function GetNavbarCounts(): Promise<NavbarCounts> {
  try {
    const [cartResponse, wishlistResponse] = await Promise.allSettled([
      apiFetch<userCart>("cart", { auth: true }),
      apiFetch<RawWishlistData>("wishlist", { auth: true }),
    ]);

    const cartCount =
      cartResponse.status === "fulfilled"
        ? cartResponse.value.data?.itemsCount ?? cartResponse.value.data?.items?.length ?? 0
        : 0;

    const wishlistCount =
      wishlistResponse.status === "fulfilled"
        ? getWishlistCount(wishlistResponse.value.data)
        : 0;

    return { cartCount, wishlistCount };
  } catch {
    return { cartCount: 0, wishlistCount: 0 };
  }
}

export async function GetMyProfile(): Promise<UserProfile | undefined> {
  try {
    const response = await apiFetch<unknown>("users/me", { auth: true, tags: ["GetMyProfile"] });
    return normalizeProfile(response.data);
  } catch {
    return undefined;
  }
}

export async function GetMyOrders(page = 1, limit = 10): Promise<OrdersResult | undefined> {
  try {
    const response = await apiFetch<unknown>(`orders?page=${page}&limit=${limit}`, {
      auth: true,
      tags: ["GetMyOrders"],
    });
    const data = response.data;
    const orders = normalizeOrders(data);
    return {
      orders,
      pagination: normalizePagination(
        isRecord(data) ? (data as Record<string, unknown>).pagination ?? data : data,
        orders.length,
        page,
        limit
      ),
    };
  } catch {
    return undefined;
  }
}

export async function GetOrderDetails(orderId: string): Promise<Order | undefined> {
  try {
    const response = await apiFetch<unknown>(`orders/${orderId}`, { auth: true });
    const raw = isRecord(response.data) ? response.data.order ?? response.data : response.data;
    return normalizeOrder(raw) ?? undefined;
  } catch {
    return undefined;
  }
}

export async function GetLibrary(): Promise<LibraryGame[]> {
  try {
    const response = await apiFetch<unknown>("library", { auth: true, tags: ["GetLibrary"] });
    return listFrom(response.data, ["games", "items", "library"])
      .map(normalizeLibraryGame)
      .filter((item): item is LibraryGame => item !== null);
  } catch {
    return [];
  }
}

export async function GetLibraryGame(id: string): Promise<LibraryGame | undefined> {
  try {
    const response = await apiFetch<unknown>(`library/${id}`, { auth: true });
    const raw = isRecord(response.data) ? response.data.game ?? response.data : response.data;
    return normalizeLibraryGame(raw) ?? undefined;
  } catch {
    return undefined;
  }
}

export async function GetRecentlyViewed(): Promise<GamesCard[]> {
  try {
    const response = await apiFetch<unknown>("recently-viewed", { auth: true });
    return normalizeGames(listFrom(response.data, ["games", "items"]));
  } catch {
    return [];
  }
}

export async function GetGameReviews(gameId: string, page = 1, limit = 10): Promise<ReviewsResult> {
  try {
    const response = await publicApiFetch<unknown>(`reviews/game/${gameId}?page=${page}&limit=${limit}`);
    const reviews = listFrom(response.data, ["reviews", "items"])
      .map(normalizeReview)
      .filter((item): item is NonNullable<ReturnType<typeof normalizeReview>> => item !== null);
    return {
      reviews,
      pagination: normalizePagination(
        isRecord(response.data) ? (response.data as Record<string, unknown>).pagination ?? response.data : response.data,
        reviews.length,
        page,
        limit
      ),
    };
  } catch {
    return { reviews: [], pagination: { page, limit, total: 0, totalPages: 1 } };
  }
}

export async function GetNotifications(page = 1, limit = 20): Promise<NotificationsResult> {
  try {
    const response = await apiFetch<unknown>(`notifications?page=${page}&limit=${limit}`, {
      auth: true,
      tags: ["GetNotifications"],
    });
    const notifications = listFrom(response.data, ["notifications", "items"])
      .map(normalizeNotification)
      .filter((item): item is NotificationItem => item !== null);
    return {
      notifications,
      pagination: normalizePagination(
        isRecord(response.data) ? (response.data as Record<string, unknown>).pagination ?? response.data : response.data,
        notifications.length,
        page,
        limit
      ),
    };
  } catch {
    return { notifications: [], pagination: { page, limit, total: 0, totalPages: 1 } };
  }
}

export async function GetUnreadNotificationCount(): Promise<number> {
  try {
    const response = await apiFetch<unknown>("notifications/unread-count", { auth: true });
    const data = response.data;
    if (typeof data === "number") return data;
    if (isRecord(data)) {
      return Number(data.count ?? data.unreadCount ?? 0);
    }
    return 0;
  } catch {
    return 0;
  }
}

export async function GetDashboardStats(): Promise<DashboardStats | undefined> {
  try {
    const response = await apiFetch<DashboardStats>("admin/dashboard", { auth: true });
    const data = response.data;
    if (!data) return undefined;
    return {
      ...data,
      mostSoldGames: normalizeGames(data.mostSoldGames),
      newestUsers: Array.isArray(data.newestUsers) ? data.newestUsers : [],
      latestOrders: normalizeOrders(data.latestOrders),
    };
  } catch (error) {
    console.log("error from GetDashboardStats", error);
    return undefined;
  }
}

export async function GetAllUsers(
  page = 1,
  limit = 20,
  search?: string,
  role?: string
): Promise<UsersResult | undefined> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (role) params.set("role", role);
    const response = await apiFetch<unknown>(`admin/users?${params.toString()}`, { auth: true });
    const data = response.data;
    const users = listFrom(data, ["users", "items"])
      .map(normalizeUser)
      .filter((item): item is AllUsers => item !== null);
    return {
      users,
      pagination: normalizePagination(
        isRecord(data) ? (data as Record<string, unknown>).pagination ?? data : data,
        users.length,
        page,
        limit
      ),
    };
  } catch (error) {
    console.log("error from GetAllUsers", error);
    return undefined;
  }
}

export async function GetAdminUser(userId: string): Promise<AllUsers | undefined> {
  try {
    const response = await apiFetch<unknown>(`admin/users/${userId}`, { auth: true });
    const raw = isRecord(response.data) ? response.data.user ?? response.data : response.data;
    return normalizeUser(raw) ?? undefined;
  } catch {
    return undefined;
  }
}

export async function GetAdminOrders(
  page = 1,
  limit = 20,
  status?: string,
  paymentStatus?: string
): Promise<OrdersResult | undefined> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (status) params.set("status", status);
    if (paymentStatus) params.set("paymentStatus", paymentStatus);
    const response = await apiFetch<unknown>(`admin/orders?${params.toString()}`, { auth: true });
    const orders = normalizeOrders(response.data);
    return {
      orders,
      pagination: normalizePagination(
        isRecord(response.data)
          ? (response.data as Record<string, unknown>).pagination ?? response.data
          : response.data,
        orders.length,
        page,
        limit
      ),
    };
  } catch {
    return undefined;
  }
}

export async function GetAdminOrder(orderId: string): Promise<Order | undefined> {
  try {
    const response = await apiFetch<unknown>(`admin/orders/${orderId}`, { auth: true });
    const raw = isRecord(response.data) ? response.data.order ?? response.data : response.data;
    return normalizeOrder(raw) ?? undefined;
  } catch {
    return undefined;
  }
}

export async function GetAdminGames(
  page = 1,
  limit = 20,
  search?: string,
  isDeleted?: string
): Promise<GamesListResult | undefined> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (isDeleted) params.set("isDeleted", isDeleted);
    const response = await apiFetch<unknown>(`admin/games?${params.toString()}`, { auth: true });
    const games = normalizeGames(listFrom(response.data, ["games", "items"]));
    return {
      games,
      pagination: normalizePagination(
        isRecord(response.data)
          ? (response.data as Record<string, unknown>).pagination ?? response.data
          : response.data,
        games.length,
        page,
        limit
      ),
    };
  } catch {
    return undefined;
  }
}

export async function GetAdminGame(gameId: string): Promise<GameDetails | undefined> {
  try {
    const response = await apiFetch<unknown>(`admin/games/${gameId}`, { auth: true });
    const raw = isRecord(response.data) ? response.data.game ?? response.data : response.data;
    if (!raw) return undefined;
    const game = normalizeGame(raw) as GameDetails;
    const record = isRecord(raw) ? raw : {};
    game.description = typeof record.description === "string" ? record.description : undefined;
    game.shortDescription = typeof record.shortDescription === "string" ? record.shortDescription : undefined;
    game.developer = typeof record.developer === "string" ? record.developer : undefined;
    game.publisher = typeof record.publisher === "string" ? record.publisher : undefined;
    game.trailer = typeof record.trailer === "string" ? record.trailer : undefined;
    game.category = isRecord(record.category)
      ? normalizeCategory(record.category) ?? undefined
      : typeof record.category === "string"
        ? record.category
        : undefined;
    return game;
  } catch {
    return undefined;
  }
}

export function newestUsersAsData(users: userData[] = []): userData[] {
  return users;
}
