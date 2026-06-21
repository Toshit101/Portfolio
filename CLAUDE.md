# CLAUDE.md

Guidance for working in this repository.

## Project

Personal portfolio site for **Toshit Kesarwani** (full-stack / MERN developer).
Single-page React app, originally exported from a Figma "Make" design and since
hand-edited. Static front-end only — no backend.

## Stack

- **Vite 6** (build + dev server), **React 18**, **TypeScript 5.6** (strict)
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config` — config lives in CSS)
- **motion** (Framer Motion) for animation, **lucide-react** for icons, **clsx** for class merging
- Package manager: **npm** (with `package-lock.json`)

## Commands

All app commands run from inside the `frontend/` folder:

```bash
cd frontend
npm install      # install dependencies (run once)
npm run dev      # start Vite dev server (default http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

There is no test suite, linter, or formatter configured.

## Layout

The repo is split into `frontend/` (the app) and `backend/` (empty placeholder
for future server-side code). Repo-level files (`README.md`, `LICENSE`,
`CLAUDE.md`, `.gitignore`, `docs/`) stay at the root.

- `frontend/index.html` — HTML shell, SEO/OpenGraph meta, inline favicon; loads `src/main.tsx`
- `frontend/src/main.tsx` — React root; mounts `App` and imports global styles
- `frontend/src/app/App.tsx` — page composition: `Nav` + `main` (Hero, About, Projects, Process, Contact) + footer, wrapped in `MotionConfig reducedMotion="user"`
- `frontend/src/app/components/` — one file per page section
- `frontend/src/app/components/ui/` — small reusable presentational components (Button, ProjectCard, SkillTag, FormField, etc.)
- `frontend/src/styles/` — `index.css` aggregates `fonts.css`, `tailwind.css`, `theme.css` (design tokens / CSS variables)
- `frontend/public/` — static assets served as-is by Vite
- `backend/` — placeholder for future API / server code (currently just a README)
- `docs/` — design notes and the implementation plan

## Conventions

- Import alias: `@/*` maps to `src/*` (configured in `tsconfig.json` and `vite.config.ts`)
- Do **not** remove the React or Tailwind Vite plugins, and do not add `.css`/`.ts`/`.tsx` to `assetsInclude` (see notes in `vite.config.ts`)
- Theme is dark-first; colors/spacing come from CSS variables in `src/styles/theme.css` and the brand accent is chartreuse (`#c8fa64`)
- Animations should respect reduced-motion — this is handled globally by `MotionConfig`, so no per-component guards are needed
