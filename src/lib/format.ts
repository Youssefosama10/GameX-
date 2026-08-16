import type { GamesCard } from "@/API/types";

export function toNumber(value: string | number | undefined | null): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(value || "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatMoney(value: string | number | undefined | null): string {
  return `$${toNumber(value).toFixed(2)}`;
}

export function formatDate(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getGamePrices(game: Pick<GamesCard, "price" | "discount" | "finalPrice">) {
  const price = toNumber(game.price);
  const discount = Math.max(0, toNumber(game.discount));
  const finalPrice =
    typeof game.finalPrice === "number" && Number.isFinite(game.finalPrice)
      ? game.finalPrice
      : discount > 0 && discount < 100
        ? price * (1 - discount / 100)
        : price;
  const savings = Math.max(0, price - finalPrice);

  return { price, discount, finalPrice, savings };
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined | null>): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}
