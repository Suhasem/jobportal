# JobPortal Frontend (React + Vite)

A basic React UI for the JobPortal Spring Boot API: register/login, browse & search jobs,
post jobs (recruiters), apply to jobs (job seekers), view your applications, and view applicants
for a job you posted.

## Setup

```bash
cd frontend
npm install
npm run dev
```

This starts the dev server at http://localhost:5173. It proxies any request to `/api/*`
to `http://localhost:8080` (see `vite.config.js`), so make sure your Spring Boot backend
is running on port 8080 first.

## Structure

- `src/api/client.js` — thin fetch wrapper for all backend calls
- `src/context/AuthContext.jsx` — stores the JWT + user in localStorage, exposes login/register/logout
- `src/components/` — `Navbar`, `ProtectedRoute` (role-gated routes)
- `src/pages/` — one component per screen (jobs list, job detail, post job, login/register, applications)

## Notes

- The JWT is stored in `localStorage` under `jp_token` for simplicity. For a production app you'd
  want to weigh that against XSS risk (httpOnly cookies are safer, but need backend changes to issue them).
- Recruiter-only and job-seeker-only routes are enforced client-side via `ProtectedRoute` — the real
  enforcement still happens on the backend (`SecurityConfig`), this is just for UX.
- If you ever deploy frontend and backend on different origins (not just different ports via the proxy),
  you'll need to add a CORS configuration to `SecurityConfig` on the backend.
