import { authClient } from "./auth-client";
import { apiRequest } from "./api";

export async function authenticatedRequest(path, options = {}) {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Your session has expired. Please sign in again.");
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  // Token is held only for this request; the HttpOnly session cookie persists login.
  return apiRequest(path, { ...options, headers, credentials: "same-origin" });
}
