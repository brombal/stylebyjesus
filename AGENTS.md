# AGENTS.md — Style by Jesús

## Project Overview

Personal portfolio website for **Jesús Isaac Cervantes** — Director of Visual Merchandising, Independent Stylist, Interior Designer, and Retail Visionary based in Texas. The site showcases 18+ years of visual merchandising work.

**Live URL:** https://www.stylebyjesus.com
**Hosting:** GitHub Pages (CNAME configured)
**Contact:** jesus@stylebyjesus.com

## Tech Stack

- **Pure static site** — no build tools, no frameworks, no bundler, no package manager
- **HTML/CSS/JS** — single `index.html`, `style.css`, `main.js`
- **Fonts:** Google Fonts — Cormorant Garamond (display/headings) + Libre Franklin (body)
- **Images:** 56 `.webp` files in `/images/`, numbered `01.webp` through `56.webp`

## File Structure

```
index.html      — Single-page site (nav, hero, about, portfolio, contact, lightbox)
style.css       — All styles, dark editorial gallery aesthetic
main.js         — IIFE: masonry grid population, lightbox, scroll reveals, nav effects
404.html        — Custom 404 page (self-contained with inline styles)
content.md      — Source copy/text for the site
CNAME           — GitHub Pages custom domain (www.stylebyjesus.com)
robots.txt      — Search engine directives
sitemap.xml     — Sitemap for SEO
og-image.jpg    — Open Graph share image
favicon.png     — Site favicon
images/         — 56 portfolio images (01.webp–56.webp)
```

## Design System

### Color Palette (CSS custom properties in `:root`)
- `--color-bg: #0e0d0c` — page background (near-black)
- `--color-surface: #1a1918` — about section background
- `--color-cream: #f5f0e8` — primary text/headings
- `--color-gold: #c9a96e` — accent color (links, tagline, labels)
- `--color-text: #e8e2d8` — body text
- `--color-text-muted: #9a938a` — secondary text
- `--color-chocolate: #4a3728` / `--color-chocolate-light: #6b5443`

### Typography
- Display/headings: `Cormorant Garamond` (italic, weights 300–500)
- Body: `Libre Franklin` (weights 300–500)
- Uppercase small text uses `letter-spacing: 0.12–0.14em`

### Aesthetic
Dark editorial gallery. Minimal, luxury feel. Gold accents on dark backgrounds. Subtle animations and hover effects.

## Key Patterns

### Masonry Grid
- JS dynamically creates all 56 image items in `main.js` (not hardcoded in HTML)
- CSS columns-based masonry layout: 3 columns > 2 at 1024px > 1 at 640px
- `IntersectionObserver` reveals items with staggered fade-in

### Lightbox
- Full-screen image viewer with prev/next navigation
- Keyboard (Escape, Arrow keys) and touch swipe support
- Counter shows current position (e.g., "12 / 56")

### Hero
- Random portfolio image selected on each page load as background
- Slow zoom-out animation on load (`scale(1.05)` → `scale(1)`)
- Dark gradient overlay for text readability

### Navigation
- Fixed top nav, transparent initially
- Gains solid background + backdrop blur on scroll (`nav--scrolled` class)
- Logo hidden on mobile (< 640px), links centered

### Scroll Animations
- `.reveal` / `.visible` classes with `IntersectionObserver`
- Masonry items and section content animate in on scroll

## SEO & Meta

- Full Open Graph + Twitter Card meta tags
- JSON-LD structured data (`Person` schema)
- Canonical URL set
- `robots.txt` and `sitemap.xml` present

## Development Notes

- No build step — edit files directly and commit
- To test locally, use any static file server (e.g., `python3 -m http.server`)
- Deployed via GitHub Pages on push to `main`
- Adding new portfolio images: add `.webp` file to `/images/`, increment `TOTAL_IMAGES` constant in `main.js` (currently `56`)
- BEM-style CSS class naming: `block__element` with `--modifier`