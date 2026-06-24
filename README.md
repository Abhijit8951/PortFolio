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


---

## Running locally

**Requirements:** Node.js 20+, npm.

```bash
# 1. Install dependencies
npm install

# 2. Add your EmailJS environment variables (required for the contact form to send)
cp .env.local.example .env.local
# then open .env.local and paste in your 3 real EmailJS values —
# see "Wiring the contact form" below for where to get them.
# Without this step, the contact form falls back to opening the visitor's
# own email client instead of sending directly to your inbox.

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
```

> **Note:** Next.js only reads `.env.local` on startup — if you add or change
> it while `npm run dev` is already running, stop the server (`Ctrl+C`) and
> restart it for the new values to take effect.

```bash
# Production build (also runs lint + type-check)
npm run build
npm run start
```

---


## Wiring the contact form (EmailJS)

The contact form is already wired to send directly to your inbox via
[EmailJS](https://www.emailjs.com) — no backend server, no API route, free
for up to 200 emails/month. You just need to connect your own EmailJS
account (takes about 5 minutes):

1. **Sign up** at [emailjs.com](https://www.emailjs.com) (free, no credit card).
2. **Add an email service**: Dashboard → Email Services → Add New Service → choose Gmail  → connect/authorize it. This is what actually sends the email — copy the **Service ID** it gives you.
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

**Until you've done this**, submitting the form falls back to the old
`mailto:` behavior (opens the visitor's own email client) — it still works,
just with the original limitation.

**Note on the `NEXT_PUBLIC_` prefix:** these EmailJS values are exposed to
the browser by design (the SDK runs client-side) — that's expected and
fine for EmailJS's model, not a security mistake. EmailJS's free tier rate
limits requests per key, which is the actual spam protection layer here.

---

## Accessibility & performance notes

- All interactive elements have visible keyboard focus states (`:focus-visible`)
- `prefers-reduced-motion` is respected — animations are disabled at the OS level when requested, and the 3D hero background falls back to a static gradient
- The 3D canvas only renders on devices with a fine pointer and ≥640px width — mobile and reduced-motion users get a lightweight CSS fallback instead of paying the WebGL cost
- Images use `next/image` for automatic optimization and lazy loading once you add real screenshots

---