# Project: DevConnect

## Overview

DevConnect is a full-stack social platform designed for developers. This project is organized as a monorepo, containing a distinct frontend and backend, each with its own configurations and dependencies.

### Frontend

The frontend is a modern, responsive web application built with a focus on performance and user experience.

- **Framework:** Next.js (utilizing the App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS for utility-first styling
- **Components:** React components are organized within `frontend/src/components`
- **Package Manager:** npm

The primary source code for the frontend is located in the `frontend/src` directory.

### Backend

The backend provides a robust RESTful API to support the frontend application.

- **Framework:** Express.js on Node.js
- **Language:** TypeScript
- **ORM:** Prisma for database interactions
- **Package Manager:** npm

The backend logic, including routes, controllers, and services, is housed in the `backend/src` directory.

## Development Workflow

To get the project running locally, follow these steps:

1.  **Install Dependencies:** Navigate to both the `frontend` and `backend` directories and run `npm install` in each.
2.  **Run Frontend:** `cd frontend && npm run dev`
3.  **Run Backend:** `cd backend && npm run dev` (or the relevant script in `backend/package.json`)

## Gemini Configuration

- **Project Type:** Full-stack Web Application (Monorepo)
- **Key Technologies:** Next.js, React, TypeScript, Tailwind CSS, Node.js, Express.js, Prisma
- **Source Directories:**
    - **Frontend:** `/frontend`
    - **Backend:** `/backend`

## Gemini Added Memories

- Do not run any `npm` command except `npm run build`.
- Do not run `git commit`, `git add`, or `git push`.
- We will converse in Indonesian, but for code-related text (like comments), English will be used.

---

## Project Learnings and Setup Details (July 17, 2025) - Continuation

This section summarizes the troubleshooting efforts and current state of the project, acknowledging unresolved issues.

#### 1. Production Login/Signup Redirect to Localhost Issue

*   **Initial Problem:** Users were redirected to `localhost` after login/signup in production.
*   **Analysis:**
    *   Incorrect `Site URL` in Supabase authentication settings.
    *   Incorrect CORS `origin` in `backend/src/app.ts` (placeholder `https://your-frontend-domain.vercel.app`).
    *   Incorrect `NEXT_PUBLIC_API_URL` in `frontend/.env.production` and Vercel environment variables for the frontend.
*   **Resolution Attempts & Outcome:**
    *   Updated Supabase `Site URL` and `Additional Redirect URLs` to `https://devconnect-frontend-coral.vercel.app`. (Manual action by user)
    *   Corrected CORS `origin` in `backend/src/app.ts` to `https://devconnect-frontend-coral.vercel.app`.
    *   Removed Next.js `rewrites` from `frontend/next.config.js` to allow direct API calls.
    *   Corrected `NEXT_PUBLIC_API_URL` in `frontend/.env.production` to `https://devconnect-backend-chi.vercel.app/api`.
    *   **Crucial Unresolved Issue:** Despite these changes, `cURL` logs still showed requests going to `https://devconnect-backend.vercel.app` (without `-chi`), indicating a persistent misconfiguration of `NEXT_PUBLIC_API_URL` in the Vercel environment variables for the frontend project, overriding the `.env.production` file. This was identified as the primary cause of the CORS issues in production.
    *   **Current State:** The production CORS issue is likely due to the frontend still using the wrong backend URL, which needs to be corrected directly in the Vercel Dashboard for the frontend project.

#### 2. Backend Routing on Vercel (404 for API calls)

*   **Initial Problem:** Backend API calls (`/api/auth/signup`) resulted in `404 Not Found` in production, even when the request reached the Express app.
*   **Analysis:** Vercel's routing for Express applications, especially for serverless functions, can be tricky. The `vercel.json` `routes` configuration might have been too specific or conflicting with Vercel's internal mapping.
*   **Resolution Attempts & Outcome:**
    *   Simplified `backend/vercel.json` to point directly to `src/server.ts` and removed explicit `routes` property.
    *   Re-added `routes` property to `backend/vercel.json` to explicitly route all traffic to `src/server.ts` for robustness.
    *   **Current State:** This issue is believed to be resolved, assuming the correct backend URL is being targeted by the frontend.

#### 3. Local Development `400 Bad Request` on Signup

*   **Initial Problem:** Local signup attempts resulted in `400 Bad Request` with "Email, password, username, and name are required." message, despite `req.body` appearing correct in logs.
*   **Analysis:** This was a complex issue. Initial hypothesis was related to `req.body` parsing or boolean evaluation.
*   **Resolution Attempts & Outcome:**
    *   Added extensive logging to `backend/src/controllers/auth.controller.ts` to inspect `req.body` and individual variable types/values. Logs confirmed data was present and correct.
    *   Temporarily bypassed validation in `auth.controller.ts` to isolate the issue.
    *   **New Error Encountered:** `AuthApiError: Database error saving new user` with `status: 500` and `code: 'unexpected_failure'` from Supabase, indicating a problem with Supabase's interaction with the database from the local environment. This was hypothesized to be related to Supabase triggers or RLS policies in the production database when accessed from local.
    *   **Current State:** This local issue remains unresolved, but the focus has shifted to production.

#### 4. Authentication Flow & Redirection Issues

*   **Desired Flow:**
    *   **Sign In:** Direct to Dashboard with "Login successful" toast.
    *   **Sign Up:** Email confirmation, then redirect to Dashboard with "Sign up successful" toast.
*   **Initial Problem:**
    *   Sign in/Sign up redirected to landing page.
    *   Sign up directly logged in user without email confirmation.
*   **Analysis:**
    *   `SignUpForm.tsx` was directly logging in users and calling `onSignUpSuccess()` prematurely.
    *   `page.tsx`'s `isLoggedIn` state and `useEffect` logic needed refinement for smoother transitions and proper handling of Supabase auth state changes.
*   **Resolution Attempts & Outcome:**
    *   Modified `SignUpForm.tsx` to only display a success message after email/password signup, and not directly log in the user or call `onSignUpSuccess()`. This correctly implements the email confirmation flow.
    *   Modified `page.tsx`'s `useEffect` for `onAuthStateChange` to more robustly handle `isLoading` and `isLoggedIn` states, aiming for direct redirection to Dashboard.
    *   **Current State:** The email confirmation flow for signup is now correctly implemented. The general redirection to Dashboard after successful authentication (login or post-email-confirmation) is the remaining challenge, likely tied to the `page.tsx` state management and Supabase's `onAuthStateChange` listener.

