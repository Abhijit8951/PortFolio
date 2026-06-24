# Abhijit Swain — Portfolio

A modern, animated personal portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js (via React Three Fiber), and Framer Motion.

**Design direction:** the visual language is built around real-time systems — connection, signaling, latency — since that's the actual subject matter of the work being showcased (WebRTC, Socket.IO). The hero background is a live, animated node-graph that mimics a signaling mesh establishing and dropping peer connections, rendered in WebGL.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D | Three.js + React Three Fiber |
| Animation | Framer Motion |
| Icons | lucide-react |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (code/data) |

---

## Project structure

```
src/
  app/
    layout.tsx        — fonts, SEO metadata, Open Graph, JSON-LD structured data
    page.tsx           — assembles all sections
    globals.css         — design tokens (colors, fonts) and base styles
    sitemap.ts          — auto-generated sitemap.xml
    robots.ts           — auto-generated robots.txt
  components/
    layout/             — Navbar, Footer
    sections/            — Hero, About, Skills, Projects, Experience, Education, Contact
    three/               — ConnectionGraph (the 3D hero background) + its fallback wrapper
    cursor/              — Custom cursor with magnetic hover states
    ui/                  — ScrollReveal, SectionEyebrow, ProjectCard (shared primitives)
  data/
    profile.ts          — SINGLE SOURCE OF TRUTH. Every section reads from this file.
```

To update any content on the site — name, projects, skills, experience, education,
contact info — **edit `src/data/profile.ts` only**. You should not need to touch
component files for routine content updates.

---

## Running locally

**Requirements:** Node.js 20+, npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

```bash
# Production build (also runs lint + type-check)
npm run build
npm run start
```

---

## Before you deploy — a short checklist

The repo is fully wired and builds cleanly, but a few things are placeholders by
design since they depend on assets/accounts only you have:

- [ ] **Contact form (EmailJS)** — sign up free at emailjs.com and add your Service ID, Template ID, and Public Key — see "Wiring the contact form" below. Without this, the form falls back to opening the visitor's email client instead.
- [ ] **Resume PDF** — drop your real PDF at `public/resume.pdf` (the Download Resume button already points here)
- [ ] **Profile photo** — drop a square-ish photo at `public/profile.png` (the About section already picks it up automatically; falls back to initials if missing)
- [ ] **Project screenshots** — drop images at `public/projects/echomeet.png` and `public/projects/wanderlust.png` (1200×800px recommended). The cards will pick them up automatically once present — no code changes needed.
- [ ] **OG image** — add a real 1200×630 image at `public/og-image.png` for social-share previews
- [ ] **Custom domain** — `siteUrl` is currently set to a placeholder (`https://abhijitswain.dev`) in three places: `layout.tsx`, `sitemap.ts`, and `robots.ts`. Update all three once you have a real domain.
- [ ] **Anigram project link** — currently points to your GitHub profile root since the specific PR/fork link wasn't provided; update `profile.ts` once you have it.

None of these block a deploy — the site works and looks complete without them — but fixing them turns placeholders into a finished product.

---

## Wiring the contact form (EmailJS)

The contact form is already wired to send directly to your inbox via
[EmailJS](https://www.emailjs.com) — no backend server, no API route, free
for up to 200 emails/month. You just need to connect your own EmailJS
account (takes about 5 minutes):

1. **Sign up** at [emailjs.com](https://www.emailjs.com) (free, no credit card).
2. **Add an email service**: Dashboard → Email Services → Add New Service → choose Gmail (or whichever provider hosts `swain.abhijit0119@gmail.com`) → connect/authorize it. This is what actually sends the email — copy the **Service ID** it gives you.
3. **Create an email template**: Dashboard → Email Templates → Create New Template. Set it up so the body uses the variables this form sends: `{{from_name}}`, `{{from_email}}`, `{{message}}`. Set the "To email" field in the template to your own address. Copy the **Template ID**.
4. **Get your Public Key**: Dashboard → Account → General → copy the **Public Key**.
5. **Add the three values locally**: copy `.env.local.example` to `.env.local` and fill them in:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```
   (`.env.local` is already gitignored — these won't get committed.)
6. **Restart `npm run dev`** after adding the env file (Next.js only reads `.env.local` on startup).
7. **Add the same three variables on Vercel** before/after deploying: Project → Settings → Environment Variables → add all three (Production + Preview) → redeploy.

**Until you've done this**, submitting the form falls back to the old
`mailto:` behavior (opens the visitor's own email client) — it still works,
just with the original limitation, so nothing breaks if you deploy before
setting this up.

**Note on the `NEXT_PUBLIC_` prefix:** these EmailJS values are exposed to
the browser by design (the SDK runs client-side) — that's expected and
fine for EmailJS's model, not a security mistake. EmailJS's free tier rate
limits requests per key, which is the actual spam protection layer here.

---

## Deployment

### Option A — One-click via Vercel's GitHub integration (recommended)

This is the real "one-click deploy": push this repo to GitHub, then either:

1. Click the badge below (after replacing `YOUR_USERNAME/YOUR_REPO` with your actual repo path) — it drops you straight into Vercel's import flow with the framework pre-detected:

   ```
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)
   ```

2. Or go to [vercel.com/new](https://vercel.com/new), click **Import Git Repository**, select this repo. Vercel auto-detects Next.js — no config needed. Click **Deploy**.

After the first deploy, every push to `main` auto-deploys. No GitHub Actions required for this path.

### Option B — GitHub Actions–driven deploy (this repo includes the workflow)

`.github/workflows/ci.yml` runs lint + build on every push/PR, and includes an
optional `deploy` job that pushes to Vercel via CLI. To enable it:

1. Run `npx vercel login` locally, then `npx vercel link` inside this project to create a Vercel project.
2. Get your tokens:
   - `VERCEL_TOKEN` — generate at [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` — found in `.vercel/project.json` after running `vercel link`
3. Add all three as **repo secrets**: GitHub repo → Settings → Secrets and variables → Actions → New repository secret.
4. Push to `main` — the `deploy` job in the workflow handles the rest.

If you're using Option A, you can safely delete the `deploy` job from `ci.yml` (Vercel's own GitHub integration already handles deploys, so this would be redundant).

### Option C — Other hosts (Netlify, Cloudflare Pages, self-hosted)

This is a standard Next.js app — any host that supports Next.js (Netlify, Cloudflare Pages, Railway, a VPS with `npm run build && npm run start`) will work. No Vercel-specific APIs are used.

---

## Accessibility & performance notes

- All interactive elements have visible keyboard focus states (`:focus-visible`)
- `prefers-reduced-motion` is respected — animations are disabled at the OS level when requested, and the 3D hero background falls back to a static gradient
- The 3D canvas only renders on devices with a fine pointer and ≥640px width — mobile and reduced-motion users get a lightweight CSS fallback instead of paying the WebGL cost
- Images use `next/image` for automatic optimization and lazy loading once you add real screenshots

---

## License

This is your personal portfolio — no license is needed for personal use, but feel free to use the codebase structure as a reference for your own projects.
