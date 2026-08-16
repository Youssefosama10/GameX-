export interface GamesCard {
  coverImage: string;
  id: string;
  title: string;
  slug: string;
  price: string | number;
  discount: string | number;
  finalPrice?: number;
  rating?: number;
  reviewCount?: number;
  genre?: string[];
  platform?: string[];
  stock?: number;
  isOutOfStock?: boolean;
  isWishlist?: boolean;
  isInCart?: boolean;
  totalSales?: number;
  isDeleted?: boolean;
  isActive?: boolean;
}

export interface GameDetails extends GamesCard {
  description?: string;
  shortDescription?: string;
  publisher?: string;
  developer?: string;
  releaseDate?: string;
  trailer?: string;
  tags?: string[];
  gallery?: string[];
  screenshots?: string[];
  category?: Category | string;
  systemRequirements?: {
    minimum?: Record<string, string>;
    recommended?: Record<string, string>;
  };
  relatedGames?: GamesCard[];
}

export interface Category {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface FlashSaleGame {
  game: GamesCard;
  salePrice?: number;
  saleDiscount?: number;
}

export interface FlashSale {
  id: string;
  title: string;
  discount?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  games: FlashSaleGame[];
}

export interface HomeData {
  heroBanners: HeroBanner[];
  featuredGames: GamesCard[];
  trendingGames: GamesCard[];
  newReleases: GamesCard[];
  topRated: GamesCard[];
  flashSale: FlashSale | null;
  categories: Category[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GamesQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  genre?: string;
  platform?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  discount?: boolean | string;
  rating?: number | string;
  availability?: string;
  featured?: boolean | string;
  trending?: boolean | string;
  newReleases?: boolean | string;
  category?: string;
}

export interface GamesListResult {
  games: GamesCard[];
  pagination: Pagination;
}

export interface userCart {
  itemsCount: number;
  items: ItemType[];
  total: number;
  subtotal?: number;
  discount?: number;
  tax?: number;
  savings?: number;
}

export interface ItemType {
  game: GamesCard;
  title: string;
  _id: string;
  price: string | number;
  quantity?: number;
}

export interface WishlistItem {
  _id?: string;
  game: GamesCard;
  title?: string;
  price?: string | number;
}

export interface RawWishlistData {
  items?: unknown[];
  games?: unknown[];
  wishlist?: unknown[];
  itemsCount?: number;
  count?: number;
  gamesCount?: number;
}

export interface WishlistData {
  itemsCount: number;
  items: WishlistItem[];
}

export interface NavbarCounts {
  cartCount: number;
  wishlistCount: number;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  itemsCount?: number;
  cartCount?: number;
  wishlistCount?: number;
  data?: unknown;
}

export interface CouponValidation {
  code?: string;
  discount?: number;
  discountAmount?: number;
  valid?: boolean;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username?: string;
  email?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
}

export interface OrderItem {
  game?: GamesCard;
  title?: string;
  price?: number;
  quantity?: number;
  coverImage?: string;
}

export interface Order {
  id: string;
  _id?: string;
  orderNumber?: string;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  items?: OrderItem[];
  games?: OrderItem[];
  subtotal?: number;
  discount?: number;
  tax?: number;
  total?: number;
  createdAt?: string;
  couponCode?: string;
  user?: userData | AllUsers;
}

export interface OrdersResult {
  orders: Order[];
  pagination: Pagination;
}

export interface ReviewUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  user?: ReviewUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewsResult {
  reviews: Review[];
  pagination: Pagination;
}

export interface LibraryGame {
  id: string;
  game: GamesCard;
  licenseKey?: string;
  downloadLink?: string;
  purchasedAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  type?: string;
  link?: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface NotificationsResult {
  notifications: NotificationItem[];
  pagination: Pagination;
}

export interface DashboardStats {
  totalGames: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalSales: number;
  totalCustomers: number;
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  pendingOrders: number;
  processingOrders?: number;
  completedOrders: number;
  cancelledOrders: number;
  outOfStockGames: number;
  mostSoldGames: GamesCard[];
  newestUsers: userData[];
  latestOrders?: Order[];
}

export interface userData {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt: string;
  role?: string;
  avatar?: string;
}

export interface AllUsers {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isBlocked: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  role: string;
  avatar?: string;
}

export interface UsersResult {
  users: AllUsers[];
  pagination: Pagination;
}

export interface AdminGameInput {
  title: string;
  description?: string;
  shortDescription?: string;
  price: number;
  discount?: number;
  platform?: string[];
  genre?: string[];
  category?: string;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  stock?: number;
  tags?: string[];
  trailer?: string;
}
