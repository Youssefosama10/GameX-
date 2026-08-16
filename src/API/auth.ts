import { jwtDecode } from "jwt-decode";
import { buildApiUrl } from "./config";

export interface LoginTokenPayload {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpires: number;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken?: string;
  };
}

export function getAccessTokenExpiry(accessToken: string): number {
  try {
    const decoded = jwtDecode<{ exp?: number }>(accessToken);
    if (decoded.exp) {
      return decoded.exp * 1000;
    }
  } catch {
    // fall through
  }

  return Date.now() + 15 * 60 * 1000;
}

export async function refreshAccessToken(refreshToken: string): Promise<LoginTokenPayload | null> {
  try {
    const response = await fetch(buildApiUrl("auth/refresh-token"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    const payload = (await response.json()) as RefreshTokenResponse;

    if (!response.ok || !payload.success || !payload.data?.accessToken) {
      return null;
    }

    const { accessToken, refreshToken: nextRefreshToken } = payload.data;

    return {
      accessToken,
      refreshToken: nextRefreshToken ?? refreshToken,
      accessTokenExpires: getAccessTokenExpiry(accessToken),
    };
  } catch {
    return null;
  }
}

export function isTokenExpiredMessage(message?: string): boolean {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes("token expired") ||
    normalized.includes("please refresh") ||
    normalized.includes("jwt expired")
  );
}
