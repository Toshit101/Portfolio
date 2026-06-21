# Backend

Placeholder for future server-side code (API, contact-form handler, etc.).

Currently the portfolio is a **static front-end only** — the live app lives in
[`../frontend`](../frontend). There is no backend yet.

## When you add a backend

Suggested starting point (Node + Express + TypeScript):

```bash
cd backend
npm init -y
npm install express
npm install -D typescript @types/express tsx
```

Keep the two apps independent: `frontend/` builds to static files, `backend/`
runs as a server. They can be developed and deployed separately.
