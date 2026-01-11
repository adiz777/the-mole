# GitHub Copilot / AI Agent Instructions for "The Mole"

## Quick project summary ✅
- Small single-page React game (The Mole). Main logic lives in `src/App.jsx` / `src/App.js` and content is driven by `src/dialogue.json`.
- Minimal component set: `SuspicionMeter`, `EvidenceLocker`, simple state held in a `useReducer` in `App`.
- UI entry: `index.html` (root) loads `src/main.jsx`.

## Key files (what to read first) 🔎
- `src/App.jsx` (game loop, reducer, state shape)
- `src/dialogue.json` (all dialog nodes and choices)
- `src/SuspicionMeter.{js,jsx}`, `src/EvidenceLocker.{js,jsx}` (presentation components)
- `vite.config.js` and `package.json` (build/dev configuration)

## Architecture & data flow 🧭
- The game state is a reducer with this shape: `{ suspicion, evidence, node, inventory, gameOver, finalUnlocked }` (see reducer in `App.*`).
- Navigation is data-driven: current UI text and available choices are looked up from `dialogue.json` by `node` key.
- Each choice object has the pattern: `{ text, suspicionChange, nextNode, evidence }` — dispatching a `CHOICE` action updates suspicion, evidence, and `node`.
- `finalUnlocked` is computed from evidence length (>= 3) and `gameOver` is triggered when `suspicion >= 100`.

## Project-specific conventions & examples ✍️
- Dialogue format: add nodes to `src/dialogue.json`. Example node:

```json
"server_room": {
  "text": "Copying data quietly.",
  "choices": [{ "text": "Leave", "suspicionChange": 5, "nextNode": "street", "evidence": "PasswordList" }]
}
```
- To add inventory items, dispatch `ADD_ITEM` with a payload string (see reducer).
- UI text is plain strings in `dialogue.json` — localization is not currently implemented.

## Build / dev workflow (important) ⚠️
- Standardized to Vite: `vite.config.js` is present and `src/main.jsx` is the app entry. Use `npm run dev` to run the dev server.
  - Updated `package.json` scripts: `dev` -> `vite`, `build` -> `vite build`, `preview` -> `vite preview`.
  - Dev dependencies: `vite` and `@vitejs/plugin-react` added as devDependencies.
- Notes: You can still reintroduce CRA if desired, but the repo is now Vite-first; remove duplicate `.js/.jsx` files and any CRA remnants when convenient.

## Conventions to preserve when making changes 🔧
- Keep the `dialogue.json` keys stable (other nodes reference them directly via `nextNode`).
- Evidence values are treated as simple strings and appended to `state.evidence` — code assumes duplicates are possible (no dedupe).
- `finalUnlocked` currently derives purely from evidence count (>=3) — if you change that logic, update UI checks in `App`.

## Where to add features / extension points ✨
- Mini-games & skill hooks: placeholder in `App` (`<p className="hint">[Mini-games & skills placeholders ready]</p>`). Add modular components and dispatch actions to the reducer.
- Narrative updates: `src/dialogue.json` is the single source of truth for scenario flow.

## Debugging tips 🐛
- To inspect state quickly, add `console.log(state)` in `App` or use React DevTools.
- Because files exist with both `.js` and `.jsx` variants, be careful modifying the file that is actually being imported by the launcher file you use (`src/main.jsx` imports `App` without extension; bundler resolution decides which file is used).

## TODOs for maintainers (discoverable issues) ⚠️
- Decide on a single bundler (CRA vs Vite) and remove unused files / deps. The repo includes duplicates (`App.js` vs `App.jsx`, `SuspicionMeter.js` vs `SuspicionMeter.jsx`, etc.).
- Add a `dev` script for Vite or update `package.json` to match the intended toolchain.

---

If anything is unclear or you'd like me to include CI, CONTRIBUTING, or test guidance specific to the chosen build system, tell me which direction you prefer (CRA or Vite) and I will iterate. ✅
