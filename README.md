# GearRent Frontend

Next.js App Router + React + TypeScript equipment-rental application following the supplied GearRent Demo designs. It includes the public homepage/catalog, authenticated details and booking modal, Stripe Checkout screens, imgbb product upload, customer/owner/admin dashboards, profiles, and responsive layouts.

Run `npm install` and configure `.env.local` from `.env.example`, then `npm run dev`. Open http://localhost:3000.

`npm run typecheck` checks the TypeScript source. `npm run build` builds production output; `npm start` serves it. API calls use the same-origin `/api` proxy; `BACKEND_URL` is server-only. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is the public Stripe key. Never put server secrets in NEXT_PUBLIC variables.

React files use `.tsx`; services and scripts use `.ts`. The application includes shared interfaces for API results, users, equipment, bookings, and analytics.

Packages: Next.js, React, TypeScript, Better Auth, Framer Motion, Tailwind CSS, DaisyUI. See the workspace README for payment verification, admin credentials, database import, and testing details.

Production live URL: not deployed yet. Local preview: http://localhost:3000.
