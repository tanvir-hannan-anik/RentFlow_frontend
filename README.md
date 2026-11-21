# RentFlow frontend

JavaScript Next.js App Router with Tailwind CSS and DaisyUI. Segment 02 adds a same-origin API proxy and a development-only connection check. The homepage remains a placeholder.

## Local development

Use Node 22.13+ within the Node 22 line, or Node 24+, and npm. Checks pass on the existing Node 22.12, but its lint dependency engine warning and ESLint 9 support warning remain unchanged.

Run from this folder:

```powershell
npm ci
# Copy only if .env.local does not already exist.
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. Start the backend separately on port 5000 for the connection check. The page still loads if the backend is unavailable; the development status explains the failure. Stop servers with Ctrl+C.

`BACKEND_URL=http://localhost:5000` is a server-side origin, without a trailing slash or `/api` suffix. Do not prefix it with `NEXT_PUBLIC_`. Next.js loads `.env.local` from this folder. Restart development after changing it. Development has a localhost default and works without an environment file.

## Request flow

1. The development component calls `apiRequest("/health")`.
2. The helper fetches `/api/health` on the frontend's own origin.
3. Next.js forwards it to `BACKEND_URL/api/health` on the server.
4. Express returns JSON; Next.js forwards its HTTP status and body.
5. The helper returns successful JSON or throws an error. The component displays the result only in development.

`src/services/api.js` is a browser helper. Pass a path like `/health`, optional fetch options, and a JavaScript value as `body`. The helper serializes the body to JSON; do not stringify it yourself. Requests bypass caching and default to a ten-second timeout; a supplied abort signal replaces that timeout. JSON API errors include `error.status`. Non-JSON upstream failures produce a generic readable error.

## Separate production deployments

Deploy Express independently, then deploy Next.js on a host that supports server-side rewrites. Static export cannot run this proxy.

Set `BACKEND_URL=https://your-backend.example` in the frontend hosting environment before building and keep it available at startup. Next.js records rewrites in the build, so rebuild and redeploy after changing this URL. It is server configuration, not a public browser environment variable. Never include credentials in it.

Set backend `NODE_ENV=production` and `CORS_ORIGINS=https://your-frontend.example`. Proxy requests may retain the browser's Origin header, so include the deployed frontend origin. Requests without Origin are allowed for server-to-server tools. CORS is a browser rule, not authentication.

Local production check (stop frontend dev first because both use port 3000):

```powershell
$env:BACKEND_URL = 'http://localhost:5000'
npm run build
npm start
```

The development connection component is omitted in production. The backend must be reachable from the frontend server.

## Test commands

```powershell
npm run lint
$env:BACKEND_URL = 'http://localhost:5000'
npm run build
# With both applications running in separate terminals:
npm run test:connection
curl.exe -i http://localhost:3000/api/health
curl.exe -i http://localhost:3000/api/missing
```

`test:connection` uses the real helper and checks health JSON, 404 errors, JSON body forwarding, and malformed JSON through the running Next.js proxy. Run it against development and production. Set `FRONTEND_ORIGIN` to check a different frontend URL. This is an HTTP integration check, not a browser-rendering test.

## Files

- `src/app`: placeholder page, layout, styles.
- `src/components/api-connection-check.js`: development status.
- `src/services/api.js`: reusable browser API helper.
- `next.config.mjs`: project roots, backend URL validation, `/api/*` rewrite.
- `scripts/check-api.mjs`: repeatable proxy integration checks.
- `docs/DEVELOPMENT_LOG.md`: setup history and validation results.

No new frontend dependencies were needed. The package declares ES Modules so Node can import the helper without a module-format warning. Both projects retain independent npm packages and Git repositories. No authentication or equipment features were added.
