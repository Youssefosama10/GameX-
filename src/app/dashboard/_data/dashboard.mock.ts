import { getGameImage } from "@/lib/gameImages";

export type StatIcon =
  | "wallet"
  | "orders"
  | "users"
  | "games"
  | "pending"
  | "completed"
  | "cancelled"
  | "stock"
  | "revenue";

export type StatTrend = "up" | "down" | "neutral";
export type StatTone = "purple" | "orange" | "green" | "red";

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  comparison: string;
  icon: StatIcon;
  trend?: StatTrend;
  tone?: StatTone;
};

export type SalesPoint = {
  label: string;
  date: string;
  value: number;
};

export type OrderStatus = "completed" | "processing" | "pending" | "cancelled" | "refunded";

export type RecentOrder = {
  id: string;
  title: string;
  orderId: string;
  price: string;
  status: OrderStatus;
  image: string;
};

export type TopSellingGame = {
  rank: number;
  title: string;
  sales: string;
  revenue: string;
  image: string;
};

export type ActivityIcon = "user" | "order" | "game" | "review" | "role";

export type UserActivity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: ActivityIcon;
};

export type CategorySale = {
  name: string;
  value: number;
  color: string;
};

export type AdminProfileData = {
  name: string;
  role: string;
  avatar: string;
};

export type DashboardNavIcon =
  | "dashboard"
  | "stats"
  | "orders"
  | "products"
  | "users";

export type DashboardNavItem = {
  id: string;
  label: string;
  href: string;
  icon: DashboardNavIcon;
};

export const dashboardAdmin: AdminProfileData = {
  name: "Admin",
  role: "Super Admin",
  avatar: "/batman.png",
};

export const notificationCount = 8;

export const dashboardNav: DashboardNavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { id: "stats", label: "Stats", href: "/dashboard/stats", icon: "stats" },
  { id: "orders", label: "Orders", href: "/dashboard/orders", icon: "orders" },
  { id: "products", label: "Products", href: "/dashboard/games", icon: "products" },
  { id: "users", label: "Users", href: "/dashboard/Users", icon: "users" },
];

export const dashboardStats: DashboardStat[] = [
  {
    id: "sales",
    label: "Total Sales",
    value: "$24,780.50",
    change: "12.5%",
    comparison: "vs last month",
    icon: "wallet",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "1,248",
    change: "8.3%",
    comparison: "vs last month",
    icon: "orders",
  },
  {
    id: "users",
    label: "Total Users",
    value: "3,682",
    change: "15.7%",
    comparison: "vs last month",
    icon: "users",
  },
  {
    id: "games",
    label: "Total Games",
    value: "156",
    change: "5.2%",
    comparison: "vs last month",
    icon: "games",
  },
];

export const salesOverview: SalesPoint[] = [
  { label: "May 1", date: "May 1, 2024", value: 3200 },
  { label: "May 6", date: "May 6, 2024", value: 4100 },
  { label: "May 11", date: "May 11, 2024", value: 5600 },
  { label: "May 16", date: "May 16, 2024", value: 6420 },
  { label: "May 21", date: "May 21, 2024", value: 5400 },
  { label: "May 26", date: "May 26, 2024", value: 8100 },
  { label: "May 31", date: "May 31, 2024", value: 9200 },
];

export const recentOrders: RecentOrder[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    orderId: "#ORD-00125",
    price: "$29.99",
    status: "completed",
    image: getGameImage("Cyberpunk 2077", 0),
  },
  {
    id: "2",
    title: "Red Dead Redemption 2",
    orderId: "#ORD-00124",
    price: "$19.99",
    status: "completed",
    image: getGameImage("Red Dead Redemption 2", 1),
  },
  {
    id: "3",
    title: "Elden Ring",
    orderId: "#ORD-00123",
    price: "$41.99",
    status: "completed",
    image: getGameImage("Elden Ring", 2),
  },
  {
    id: "4",
    title: "God of War",
    orderId: "#ORD-00122",
    price: "$27.99",
    status: "processing",
    image: getGameImage("God of War", 3),
  },
  {
    id: "5",
    title: "Horizon Zero Dawn",
    orderId: "#ORD-00121",
    price: "$19.99",
    status: "pending",
    image: getGameImage("Horizon Forbidden West", 4),
  },
];

export const topSellingGames: TopSellingGame[] = [
  {
    rank: 1,
    title: "Cyberpunk 2077",
    sales: "523 Sales",
    revenue: "$15,682.77",
    image: getGameImage("Cyberpunk 2077", 0),
  },
  {
    rank: 2,
    title: "Elden Ring",
    sales: "412 Sales",
    revenue: "$17,298.88",
    image: getGameImage("Elden Ring", 2),
  },
  {
    rank: 3,
    title: "Red Dead Redemption 2",
    sales: "389 Sales",
    revenue: "$7,776.11",
    image: getGameImage("Red Dead Redemption 2", 1),
  },
  {
    rank: 4,
    title: "God of War",
    sales: "356 Sales",
    revenue: "$9,964.44",
    image: getGameImage("God of War", 3),
  },
  {
    rank: 5,
    title: "Horizon Zero Dawn",
    sales: "298 Sales",
    revenue: "$5,957.02",
    image: getGameImage("Horizon Forbidden West", 4),
  },
];

export const userActivities: UserActivity[] = [
  {
    id: "1",
    title: "New user registered",
    detail: "John Doe",
    time: "2 min ago",
    icon: "user",
  },
  {
    id: "2",
    title: "New order placed",
    detail: "Order #ORD-00125",
    time: "5 min ago",
    icon: "order",
  },
  {
    id: "3",
    title: "Game added to store",
    detail: "Witcher 3: Wild Hunt",
    time: "15 min ago",
    icon: "game",
  },
  {
    id: "4",
    title: "Review submitted",
    detail: "by Mike Tyson",
    time: "25 min ago",
    icon: "review",
  },
  {
    id: "5",
    title: "User role updated",
    detail: "Sarah Johnson",
    time: "1 hour ago",
    icon: "role",
  },
];

export const salesByCategory: CategorySale[] = [
  { name: "Action", value: 35, color: "#7C3AED" },
  { name: "RPG", value: 25, color: "#EC4899" },
  { name: "Adventure", value: 20, color: "#3B82F6" },
  { name: "Sports", value: 10, color: "#F97316" },
  { name: "Racing", value: 10, color: "#22D3EE" },
];

export const categoryTotal = "$24,780.50";
