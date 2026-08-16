import { AuthenticatedUserToken } from "@/utlis";
import { buildApiUrl } from "./config";
import { isTokenExpiredMessage } from "./auth";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown[];
}

export interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  auth?: boolean | "optional";
  tags?: string[];
}

export class ApiRequestError extends Error {
  status: number;
  payload?: ApiResponse;

  constructor(message: string, status: number, payload?: ApiResponse) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

function isFormDataBody(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {},
  allowRetry = true
): Promise<ApiResponse<T>> {
  const { auth = false, body, tags, headers, ...rest } = options;
  const requestHeaders = new Headers(headers);
  const formData = isFormDataBody(body);

  if (body !== undefined && !formData && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth === true || auth === "optional") {
    const token = await AuthenticatedUserToken();
    if (auth === true && !token) {
      throw new ApiRequestError("Not authenticated", 401);
    }
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(buildApiUrl(path), {
    ...rest,
    headers: requestHeaders,
    body: formData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    cache: rest.cache ?? (auth === true ? "no-store" : undefined),
    next: tags ? { tags } : undefined,
  });

  let payload: ApiResponse<T>;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiRequestError("Invalid API response", response.status);
  }

  const expiredToken =
    response.status === 401 ||
    isTokenExpiredMessage(payload.message) ||
    (Array.isArray(payload.errors) &&
      payload.errors.some(
        (error) => typeof error === "string" && isTokenExpiredMessage(error)
      ));

  if (expiredToken && auth === true && allowRetry) {
    await AuthenticatedUserToken();
    return apiFetch<T>(path, options, false);
  }

  if (!response.ok || payload.success === false) {
    throw new ApiRequestError(
      payload.message ?? "Request failed",
      response.status,
      payload
    );
  }

  return payload;
}

export async function publicApiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
  return apiFetch<T>(path, { ...options, auth: "optional" });
}
