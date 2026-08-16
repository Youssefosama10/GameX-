import { buildQueryString } from "@/lib/format";
import type {
  AllUsers,
  Category,
  FlashSale,
  GamesCard,
  GamesQuery,
  HeroBanner,
  LibraryGame,
  NotificationItem,
  Order,
  Pagination,
  RawWishlistData,
  Review,
  UserProfile,
  WishlistData,
  WishlistItem,
} from "./types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

export function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

export function entityId(raw: Record<string, unknown>): string {
  if (typeof raw.id === "string" && raw.id) return raw.id;
  if (typeof raw._id === "string" && raw._id) return raw._id;
  return "";
}

export function normalizeGame(raw: unknown): GamesCard {
  const game = isRecord(raw) ? raw : {};
  return {
    id: entityId(game),
    title: asString(game.title),
    slug: asString(game.slug),
    coverImage: asString(game.coverImage),
    price: (game.price as string | number) ?? 0,
    discount: (game.discount as string | number) ?? 0,
    finalPrice: typeof game.finalPrice === "number" ? game.finalPrice : undefined,
    rating: typeof game.rating === "number" ? game.rating : undefined,
    reviewCount: typeof game.reviewCount === "number" ? game.reviewCount : undefined,
    genre: Array.isArray(game.genre) ? (game.genre as string[]) : undefined,
    platform: Array.isArray(game.platform) ? (game.platform as string[]) : undefined,
    stock: typeof game.stock === "number" ? game.stock : undefined,
    isOutOfStock: asBoolean(game.isOutOfStock),
    isWishlist: asBoolean(game.isWishlist),
    isInCart: asBoolean(game.isInCart),
    totalSales: typeof game.totalSales === "number" ? game.totalSales : undefined,
    isDeleted: asBoolean(game.isDeleted),
    isActive: asBoolean(game.isActive),
  };
}

export function normalizeGames(raw: unknown): GamesCard[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeGame).filter((game) => game.id || game.slug);
}

export function normalizeCategory(raw: unknown): Category | null {
  if (!isRecord(raw)) return null;
  const id = entityId(raw);
  const name = asString(raw.name);
  const slug = asString(raw.slug);
  if (!id && !slug) return null;
  return {
    id,
    _id: asString(raw._id) || id,
    name,
    slug,
    image: asString(raw.image) || undefined,
    icon: asString(raw.icon) || undefined,
  };
}

export function normalizeCategories(raw: unknown): Category[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeCategory).filter((item): item is Category => item !== null);
}

export function normalizeBanner(raw: unknown): HeroBanner | null {
  if (!isRecord(raw)) return null;
  return {
    id: entityId(raw),
    title: asString(raw.title),
    subtitle: asString(raw.subtitle) || undefined,
    description: asString(raw.description) || undefined,
    backgroundImage: asString(raw.backgroundImage) || undefined,
    buttonText: asString(raw.buttonText) || undefined,
    buttonLink: asString(raw.buttonLink) || undefined,
    displayOrder: typeof raw.displayOrder === "number" ? raw.displayOrder : undefined,
    isActive: asBoolean(raw.isActive),
  };
}

export function normalizeFlashSale(raw: unknown): FlashSale | null {
  if (!isRecord(raw)) return null;
  const games = Array.isArray(raw.games)
    ? raw.games.map((entry) => {
        if (isRecord(entry) && isRecord(entry.game)) {
          return {
            game: normalizeGame(entry.game),
            salePrice: typeof entry.salePrice === "number" ? entry.salePrice : undefined,
            saleDiscount: typeof entry.saleDiscount === "number" ? entry.saleDiscount : undefined,
          };
        }
        return { game: normalizeGame(entry) };
      })
    : [];

  return {
    id: entityId(raw),
    title: asString(raw.title),
    discount: typeof raw.discount === "number" ? raw.discount : undefined,
    startDate: asString(raw.startDate) || undefined,
    endDate: asString(raw.endDate) || undefined,
    isActive: asBoolean(raw.isActive),
    games,
  };
}

export function normalizeWishlistItem(entry: unknown): WishlistItem | null {
  if (!isRecord(entry)) return null;

  if (isRecord(entry.game)) {
    const game = normalizeGame(entry.game);
    if (!game.id) return null;
    return {
      _id: typeof entry._id === "string" ? entry._id : undefined,
      game,
      title: typeof entry.title === "string" ? entry.title : game.title,
      price: (entry.price as string | number | undefined) ?? game.price,
    };
  }

  if (typeof entry.id === "string" || typeof entry._id === "string") {
    const game = normalizeGame(entry);
    if (!game.id) return null;
    return {
      _id: typeof entry._id === "string" ? entry._id : undefined,
      game,
      title: game.title,
      price: game.price,
    };
  }

  return null;
}

export function normalizeWishlistData(raw: unknown): WishlistData {
  if (!isRecord(raw)) {
    return { items: [], itemsCount: 0 };
  }

  const data = raw as RawWishlistData;
  const source = data.items ?? data.games ?? data.wishlist ?? [];
  const items = Array.isArray(source)
    ? source.map(normalizeWishlistItem).filter((item): item is WishlistItem => item !== null)
    : [];

  const itemsCount =
    typeof data.itemsCount === "number"
      ? data.itemsCount
      : typeof data.count === "number"
        ? data.count
        : typeof data.gamesCount === "number"
          ? data.gamesCount
          : items.length;

  return { items, itemsCount };
}

export function getWishlistCount(data?: WishlistData | unknown): number {
  if (!data) return 0;
  return normalizeWishlistData(data).itemsCount;
}

export function normalizePagination(raw: unknown, fallbackTotal = 0, page = 1, limit = 12): Pagination {
  const data = isRecord(raw) ? raw : {};
  const currentPage = asNumber(data.page ?? data.currentPage, page);
  const currentLimit = asNumber(data.limit ?? data.perPage, limit);
  const total = asNumber(data.total ?? data.totalItems ?? data.count, fallbackTotal);
  const totalPages = asNumber(
    data.totalPages ?? data.pages,
    currentLimit > 0 ? Math.max(1, Math.ceil(total / currentLimit)) : 1
  );

  return { page: currentPage, limit: currentLimit, total, totalPages };
}

export function normalizeProfile(raw: unknown): UserProfile | undefined {
  if (!isRecord(raw)) return undefined;
  const user = isRecord(raw.user) ? raw.user : raw;
  return {
    id: entityId(user),
    firstName: asString(user.firstName) || undefined,
    lastName: asString(user.lastName) || undefined,
    fullName: asString(user.fullName) || undefined,
    username: asString(user.username) || undefined,
    email: asString(user.email) || undefined,
    role: asString(user.role) || undefined,
    avatar: asString(user.avatar) || undefined,
    createdAt: asString(user.createdAt) || undefined,
  };
}

export function normalizeOrder(raw: unknown): Order | null {
  if (!isRecord(raw)) return null;
  const itemsSource = Array.isArray(raw.items) ? raw.items : Array.isArray(raw.games) ? raw.games : [];
  const items = itemsSource.map((item) => {
    const record = isRecord(item) ? item : {};
    const game = isRecord(record.game) ? normalizeGame(record.game) : undefined;
    return {
      game,
      title: asString(record.title) || game?.title,
      price: typeof record.price === "number" ? record.price : toOptionalNumber(record.price),
      quantity: typeof record.quantity === "number" ? record.quantity : 1,
      coverImage: asString(record.coverImage) || game?.coverImage,
    };
  });

  return {
    id: entityId(raw),
    _id: asString(raw._id) || entityId(raw),
    orderNumber: asString(raw.orderNumber || raw.orderId) || undefined,
    status: asString(raw.status) || undefined,
    paymentStatus: asString(raw.paymentStatus) || undefined,
    paymentMethod: asString(raw.paymentMethod) || undefined,
    items,
    games: items,
    subtotal: toOptionalNumber(raw.subtotal),
    discount: toOptionalNumber(raw.discount),
    tax: toOptionalNumber(raw.tax),
    total: toOptionalNumber(raw.total),
    createdAt: asString(raw.createdAt) || undefined,
    couponCode: asString(raw.couponCode) || undefined,
    user: isRecord(raw.user) ? (raw.user as unknown as Order["user"]) : undefined,
  };
}

function toOptionalNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export function normalizeOrders(raw: unknown): Order[] {
  if (Array.isArray(raw)) {
    return raw.map(normalizeOrder).filter((item): item is Order => item !== null);
  }
  if (isRecord(raw) && Array.isArray(raw.orders)) {
    return raw.orders.map(normalizeOrder).filter((item): item is Order => item !== null);
  }
  return [];
}

export function normalizeReview(raw: unknown): Review | null {
  if (!isRecord(raw)) return null;
  const user = isRecord(raw.user) ? raw.user : undefined;
  return {
    id: entityId(raw),
    rating: asNumber(raw.rating),
    comment: asString(raw.comment) || undefined,
    createdAt: asString(raw.createdAt) || undefined,
    updatedAt: asString(raw.updatedAt) || undefined,
    user: user
      ? {
          id: entityId(user),
          firstName: asString(user.firstName) || undefined,
          lastName: asString(user.lastName) || undefined,
          username: asString(user.username) || undefined,
          avatar: asString(user.avatar) || undefined,
        }
      : undefined,
  };
}

export function normalizeLibraryGame(raw: unknown): LibraryGame | null {
  if (!isRecord(raw)) return null;
  const game = isRecord(raw.game) ? normalizeGame(raw.game) : normalizeGame(raw);
  if (!game.id && !game.slug) return null;
  return {
    id: entityId(raw) || game.id,
    game,
    licenseKey: asString(raw.licenseKey || raw.key) || undefined,
    downloadLink: asString(raw.downloadLink || raw.downloadUrl) || undefined,
    purchasedAt: asString(raw.purchasedAt || raw.createdAt) || undefined,
  };
}

export function normalizeNotification(raw: unknown): NotificationItem | null {
  if (!isRecord(raw)) return null;
  return {
    id: entityId(raw),
    title: asString(raw.title),
    message: asString(raw.message) || undefined,
    type: asString(raw.type) || undefined,
    link: asString(raw.link) || undefined,
    isRead: asBoolean(raw.isRead) ?? asBoolean(raw.read),
    createdAt: asString(raw.createdAt) || undefined,
  };
}

export function normalizeUser(raw: unknown): AllUsers | null {
  if (!isRecord(raw)) return null;
  const id = entityId(raw);
  return {
    _id: id,
    id,
    firstName: asString(raw.firstName),
    lastName: asString(raw.lastName),
    email: asString(raw.email),
    username: asString(raw.username),
    createdAt: asString(raw.createdAt),
    updatedAt: asString(raw.updatedAt),
    isActive: Boolean(raw.isActive ?? !raw.isBlocked),
    isBlocked: Boolean(raw.isBlocked),
    isAdmin: Boolean(raw.isAdmin || raw.role === "admin"),
    isSuperAdmin: Boolean(raw.isSuperAdmin),
    role: asString(raw.role, "user"),
    avatar: asString(raw.avatar) || undefined,
  };
}

export function gamesQueryPath(query: GamesQuery = {}, base = "games"): string {
  return `${base}${buildQueryString({
    page: query.page ?? 1,
    limit: query.limit ?? 12,
    sort: query.sort,
    search: query.search,
    genre: query.genre,
    platform: query.platform,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    discount: query.discount,
    rating: query.rating,
    availability: query.availability,
    featured: query.featured,
    trending: query.trending,
    newReleases: query.newReleases,
    category: query.category,
  })}`;
}
