// Browser helper: requests always go through the frontend's same-origin proxy.
export async function apiRequest(path, options = {}) {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("API paths must start with a single slash, for example /health.");
  }

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
    signal: options.signal ?? AbortSignal.timeout(10000),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The API is unavailable or returned an invalid response.");
  }

  if (!response.ok || result?.success !== true) {
    const error = new Error(result?.message || "The API request failed.");
    error.status = response.status;
    throw error;
  }

  return result;
}
