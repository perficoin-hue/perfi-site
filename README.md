# PERFI SITE

This repository contains the Next.js + TypeScript website for Perfitech Global Venture Limited and the PERFI SITE website builder.

## Run locally

1. `npm install`
2. `npm run dev`

## AI website builder setup

The AI builder at `/builder/ai` creates editable, structured website drafts and previews them in a script-free sandboxed iframe. It does not evaluate generated JavaScript or JSX. Without an AI provider secret, generation and AI edits return a clear configuration error; local editing and browser draft saving remain available.

### AI generation

Configure these server-side environment variables in the deployment platform (never prefix the secret with `NEXT_PUBLIC_`):

- `OPENAI_API_KEY` — required for generation and AI editing.
- `OPENAI_MODEL` — optional; defaults to `gpt-4o-mini`.

The generation endpoint has basic per-instance request throttling. For production, also configure edge-level rate limiting in Cloudflare because in-memory limits are not shared across serverless instances.

### Account storage

The repository already uses Supabase Auth. Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, then apply `supabase/migrations/20261118000000_website_projects.sql` to create the owner-protected `website_projects` table. Logged-in projects use Supabase and row-level security. Without a signed-in session, drafts can be saved only in the current browser's local storage; they do not sync across devices and are not an account-backed storage option. Uploaded images are limited to 1 MB and are embedded in draft JSON; use Supabase Storage for larger assets before production scale.

### Cloudflare deployment and routing

This is a full-stack Next.js Pages Router application with API routes. The `/builder/ai` page is included in the Next.js route manifest when built. A static Cloudflare Pages deployment does not execute Next.js server routes or API endpoints; serving only static output is why `/builder/ai` responds with 404. There are no repository redirects or rewrites suppressing this route.

Deploy the application as a Cloudflare Worker using `@opennextjs/cloudflare`, `open-next.config.ts`, and `wrangler.jsonc`. `npm run build` runs the OpenNext Cloudflare build, which generates the Next.js route manifest and `.open-next/worker.js`. Deploy the Worker with `npm run deploy` / `wrangler deploy`, and use its Worker preview hostname. The given `*.pages.dev` hostname belongs to Cloudflare Pages and will continue to serve the Pages deployment; it will not automatically route through the Worker. Cloudflare Pages build settings must not be used as the deployment target for this dynamic application. A CI workflow checks that `/builder/ai` appears in the generated route manifest and the Worker artifact exists.

### Hosting / publishing status

Publishing customer-created websites is not enabled. `/api/builder/publish` intentionally reports setup required. A production deployment still needs a tested server-side deployment pipeline, protected Cloudflare credentials, `perfi-site.com` zone and wildcard DNS/routing, domain verification, and publishing status callbacks. Do not add a Cloudflare API token to browser-visible environment variables. Until that controlled pipeline is implemented and verified, drafts remain previews only.

The manual builder and existing PerfiPay pages remain separate and unchanged.
