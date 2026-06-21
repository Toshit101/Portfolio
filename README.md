# Toshit Kesarwani — Portfolio

Personal portfolio site for **Toshit Kesarwani**, a full-stack (MERN) developer.
A single-page React application: dark-first, motion-aware, and built with a small
hand-rolled component system.

## Tech stack

- **Vite 6** — build tool & dev server
- **React 18** + **TypeScript 5.6** (strict)
- **Tailwind CSS v4** (configured in CSS via `@tailwindcss/vite`)
- **motion** (Framer Motion) — animation
- **lucide-react** — icons
- **clsx** — conditional class names

## Getting started

The app lives in the [`frontend/`](./frontend) folder:

```bash
cd frontend
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Type-check and build to `dist/`      |
| `npm run preview`   | Serve the production build locally   |
| `npm run typecheck` | Run the TypeScript compiler (no emit) |

## Project structure

```
frontend/               The static React/Vite app
  public/               Static assets served as-is
  src/
    main.tsx            React entry point
    app/
      App.tsx           Page composition (Nav + sections + footer)
      components/       One file per page section
        ui/             Reusable presentational primitives
    styles/             Global CSS and design tokens
backend/                Placeholder for future server-side code (empty)
docs/                   Design notes and implementation plan
```

- Import alias `@/*` maps to `src/*`.
- The theme is dark-first; colors and spacing live as CSS variables in
  `src/styles/theme.css`. The brand accent is chartreuse (`#c8fa64`).
- Animations honor the OS "reduce motion" setting globally via `MotionConfig`.

## License

Released under the [MIT License](./LICENSE).
