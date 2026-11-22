import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// The browser uses the frontend origin; Next.js proxies /api/auth to Express.
export const authClient = createAuthClient({
  basePath: "/api/auth",
  plugins: [jwtClient()],
});
