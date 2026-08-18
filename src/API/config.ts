const DEFAULT_API_BASE_URL = "https://game-x-flax.vercel.app/api/v1/";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}

export const API_BASE_URL = normalizeBaseUrl(
  process.env.API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
);

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}${normalizedPath}`;
}
