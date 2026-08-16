export const API_BASE_URL = "https://game-x-flax.vercel.app/api/v1/";

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}${normalizedPath}`;
}
