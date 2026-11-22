# Deploy the website
Create a Vercel project for the frontend repository (Root Directory frontend if importing the parent folder). Framework: Next.js. Node.js: 22.x. Do not select static export or set a custom output directory.

Set Production environment variables:
- BACKEND_URL=https://YOUR-BACKEND.vercel.app (no trailing slash, no /api)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your Stripe publishable key

Deploy the backend first, then set BACKEND_URL and deploy this project. Set the backend BETTER_AUTH_URL and CORS_ORIGINS to this project's stable production origin and redeploy the backend. Add https://YOUR-FRONTEND.vercel.app/api/auth/callback/google as an authorized redirect URI in Google Cloud.

Redeploy after changing environment variables. Do not use localhost in production. Use the production domain for sign-in; arbitrary preview domains are not trusted automatically. The existing MongoDB admin account remains valid.

Verify login, dashboard refresh, equipment listing, upload and Stripe test Checkout. Backend setup is documented in backend/VERCEL.md in the parent workspace (or VERCEL.md in the backend repository).

Upload limit: 4 MB, leaving room for multipart encoding under the default Vercel request limit. Both projects explicitly install development dependencies for TypeScript compilation.
