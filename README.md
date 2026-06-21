# Shiok Cards

A memory card game featuring Singapore hawker food. Match pairs of iconic dishes — from chicken rice to chilli crab — across 8 progressively harder levels themed after real hawker centres.

## Features

- 40 SG hawker dishes with illustrations and fun facts
- 8 levels (Maxwell Food Centre through Newton) with increasing grid sizes
- Star rating system (1-3 stars based on move count)
- Progressive unlocking — earn stars to access harder levels
- Makan Passport — tracks all dishes you've discovered
- Works offline (PWA with service worker caching)
- Mobile-first responsive design
- Singlish encouragement messages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (static export to `out/`) |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/           — Next.js app router (layout, page, client shell)
  components/    — Game UI (card, board, level select, game complete)
  data/          — Dish definitions, level configs, encouragements
  lib/           — Utilities (shuffle algorithms, cn helper)
  stores/        — Zustand game state with localStorage persistence
public/
  images/dishes/ — 40 dish illustrations (400x400 PNG)
  manifest.json  — PWA manifest
  sw.js          — Service worker for offline support
scripts/         — Image splitting/processing utilities
```

## Tech Stack

- **Next.js 16** — static export mode
- **React 19** — UI rendering
- **TypeScript** — type safety
- **Tailwind CSS 3** — styling
- **Zustand** — lightweight state management with persist middleware

## Adding Food Images

Place square PNG images in `public/images/dishes/` named by dish ID:

```
public/images/dishes/chicken-rice.png
public/images/dishes/laksa.png
```

The app falls back to emoji if an image is missing or fails to load.

## Security

This is a fully client-side static app with no backend, no API routes, no authentication, and no user-generated content. Game progress is stored in localStorage only.

- **npm audit**: 0 vulnerabilities
- **No external network requests** — all assets are bundled
- **No XSS surface** — all rendered content is hardcoded data
- **No sensitive data** — localStorage stores only game progress (stars, unlocked dishes)
- **Service worker** — network-first strategy caching only the app's own static assets

## License

MIT
