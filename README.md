# MERN Job Portal

A job portal with a **frontend** (React + Vite + Tailwind) and **backend** (Node + Express) in separate folders.

## Project structure

```
MERN-Job--Portal/
├── frontend/          # React app (Vite, Tailwind, React Router)
├── backend/           # Express API (REST, CORS, JSON file storage)
├── package.json       # Root scripts to run frontend & backend
└── README.md
```

## Setup

1. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   Or install each separately:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Run the app**
   - Terminal 1 – backend (API on port 5000):
     ```bash
     npm run dev:backend
     ```
   - Terminal 2 – frontend (dev server with proxy to API):
     ```bash
     npm run dev:frontend
     ```
   - Open http://localhost:5173 in your browser.

## Scripts (from root)

| Script | Description |
|--------|-------------|
| `npm run install:all` | Install dependencies in root, frontend, and backend |
| `npm run dev:frontend` | Start Vite dev server (frontend) |
| `npm run dev:backend` | Start Express API (backend) |
| `npm run build:frontend` | Build frontend for production |
| `npm run start:backend` | Run backend in production mode |

## API (backend)

- `GET /api/jobs` – list all jobs  
- `GET /api/jobs/:id` – get one job  
- `POST /api/jobs` – create a job (body: job fields)

The frontend proxies `/api` to the backend in development, so it can call the API without CORS issues.

## Deploy on Vercel

1. Import the repo in [Vercel](https://vercel.com).
2. In **Project Settings → General**, set **Root Directory** to `frontend` (so the build runs inside the frontend folder).
3. Leave **Build Command** and **Output Directory** as default (Vercel will use `npm run build` and `dist` from the root `frontend`).
4. Deploy. The backend API is not deployed on Vercel; run it separately (e.g. Railway, Render) if you need it in production.
