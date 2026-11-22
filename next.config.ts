import { backendOrigin } from "./src/services/backend-origin";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const backendUrl = backendOrigin();

const nextConfig = {
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
};

export default nextConfig;
