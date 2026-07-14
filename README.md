# Harvest — Seasonal Recipe Tracker

Save recipes from around the web, tag them by dish type, and rediscover them when they're in season.

Implemented from the Claude Design prototype in `project/Seasonal Recipe Tracker.dc.html` (see `chats/chat1.md` for the design history).

## Structure

- `client/` — React + Vite single-page app (the UI)
- `server/` — Express API with one endpoint, `POST /api/extract-recipe`, that fetches a pasted recipe URL server-side and parses its `og:image`/Recipe JSON-LD metadata
- `project/`, `chats/` — the original design handoff bundle, kept for reference

## Running locally

```bash
npm install
npm run dev
```

This starts the API on `http://localhost:4000` and the app on `http://localhost:5173` (which proxies `/api` to the server). Recipes, ratings, notes, and tags are saved to the browser's `localStorage`.

## Notes on scope

- **Season** is computed from the current date (Northern Hemisphere meteorological seasons), not user-selectable — the "Home" screen resurfaces recipes tagged for whichever season it is today.
- **Recipe extraction** fetches the target page server-side with basic SSRF guards (blocks loopback/private-IP hosts, times out at 8s, caps response size) and prefers structured Recipe JSON-LD, falling back to Open Graph tags. If a site can't be reached or parsed, the save flow falls back to sample data so the flow never dead-ends.
