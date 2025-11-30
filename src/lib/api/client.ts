import { LOCALSTORAGE_KEYS } from "@/utils/constants";

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = LOCALSTORAGE_KEYS;

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const storage = typeof window !== "undefined" ? window.localStorage : undefined;

export const getAccessToken = () => storage?.getItem(ACCESS_TOKEN_KEY) ?? null;

export const saveSessionTokens = (session?: {
  access_token?: string;
  refresh_token?: string;
}) => {
  if (!storage || !session) return;
  if (session.access_token) storage.setItem(ACCESS_TOKEN_KEY, session.access_token);
  if (session.refresh_token) storage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
};

export const clearSessionTokens = () => {
  storage?.removeItem(ACCESS_TOKEN_KEY);
  storage?.removeItem(REFRESH_TOKEN_KEY);
};

type RequestOptions = {
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

const request = async <T = unknown>(
  endpoint: string,
  method: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> => {
  const { headers = {}, requireAuth = true } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (requireAuth) {
    const token = getAccessToken();
    if (token) requestHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (response.status === 401 && requireAuth) {
    clearSessionTokens();
    return null as T;
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error || data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

const api = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, "GET", undefined, options),

  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, "POST", body, options),

  put: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, "PUT", body, options),

  patch: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, "PATCH", body, options),

  delete: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, "DELETE", undefined, options),
};

export default api;

