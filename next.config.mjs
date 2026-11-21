import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const backendUrl = process.env.BACKEND_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");

if (!backendUrl) throw new Error("Set BACKEND_URL before building or starting production.");
const backendOrigin = new URL(backendUrl);
if (!["http:", "https:"].includes(backendOrigin.protocol) || backendOrigin.origin !== backendUrl) {
  throw new Error("BACKEND_URL must be an HTTP(S) origin without a path or trailing slash.");
}

const nextConfig = {
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
};

export default nextConfig;
