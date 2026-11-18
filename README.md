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

### Hosting / publishing status

Publishing is not enabled and no deployment is claimed. `/api/builder/publish` intentionally reports setup required. A production deployment still needs a Cloudflare Pages project, a tested server-side deployment worker/pipeline, protected Cloudflare credentials, `perfi-site.com` zone and wildcard DNS/routing, domain verification, and publishing status callbacks. Do not add a Cloudflare API token to browser-visible environment variables. Until that controlled pipeline is implemented and verified, drafts remain previews only.

The manual builder and existing PerfiPay pages remain separate and unchanged.
