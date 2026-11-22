import assert from "node:assert/strict";
import { apiRequest } from "../src/services/api.js";

const frontendOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";
const nativeFetch = globalThis.fetch;
// Node needs an absolute URL; the browser resolves /api against its page origin.
globalThis.fetch = (path, options) => nativeFetch(new URL(path instanceof Request ? path.url : String(path), frontendOrigin), options);

try {
  const result = await apiRequest("/health");
  assert.deepEqual(result, { success: true, message: "Equipment Rental API is running" });
  await apiRequest("/health", { headers: { Origin: frontendOrigin } });
  await assert.rejects(apiRequest("/health", { headers: { Origin: "https://unapproved.example" } }), (error: unknown) => (error as {status?:number}).status === 403);
  assert.equal((await fetch("/api/missing")).status,404);
  assert.equal((await fetch("/api/health", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({valid:true})})).status,404);
  const malformed = await fetch("/api/health", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{", signal: AbortSignal.timeout(10000),
  });
  assert.equal(malformed.status, 400);
  assert.equal((await malformed.json()).success, false);
  console.log("PASS: API helper, proxy health, CORS forwarding, JSON body forwarding, 404, and malformed JSON.");
} finally {
  globalThis.fetch = nativeFetch;
}
