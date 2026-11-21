# Equipment Rental Platform - Frontend

Segment 01 provides a minimal JavaScript Next.js application. The home page only displays "Equipment Rental Platform". The final design and all product features will be added in later segments.

## Requirements

Use Node.js 22.13.0 or newer within Node 22, or Node 24 or newer, and npm. Checks passed on the existing Node 22.12.0 with npm 11.11.1, but a transitive lint dependency reports an engine warning on that older patch. Use the declared Node range for a fully supported installation. ESLint 9 is retained for compatibility with the installed runtime; npm marks that major as out of support.

## Run independently

Open a terminal in this `frontend` folder:

```powershell
npm ci
npm run dev
```

Visit http://localhost:3000. The backend does not need to be running. Stop the server with Ctrl+C.

No environment variables are required yet. `.env.example` documents this. If variables become necessary later, copy it to `.env.local`; local environment files are ignored by Git. Never put secrets in `NEXT_PUBLIC_` variables because they are visible in the browser.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact dependency tree from the lockfile. |
| `npm run dev` | Start development with automatic updates on port 3000. |
| `npm run lint` | Run ESLint; warnings also fail this check. |
| `npm run build` | Create a production build in `.next`. |
| `npm start` | Serve a previously built app on port 3000. |

Stop the development server before starting the production server on the same port.

## Structure

`src/app` holds App Router pages, the shared layout, and global CSS. `docs` holds the development log. Add `src/components`, `src/services`, `src/hooks`, or `src/utils` when real code needs them. App Router uses `src/app/page.js`, so a separate `src/pages` directory is unnecessary.

This folder is an independent npm project and Git repository. See [docs/DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md) for packages, configuration, and validation details.
