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