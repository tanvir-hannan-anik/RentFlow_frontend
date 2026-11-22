import type {ApiOptions} from '@/types';
import { authClient } from "./auth-client";
import { apiRequest } from "./api";

export async function authenticatedRequest<T = unknown>(path:string, options:ApiOptions = {}) {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Your session has expired. Please sign in again.");
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  // Token is held only for this request; the HttpOnly session cookie persists login.
  return apiRequest<T>(path, { ...options, headers, credentials: "same-origin" });
}
