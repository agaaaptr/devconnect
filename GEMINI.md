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

## Project Learnings and Setup Details (July 16, 2025)

This section summarizes the key changes and configurations made during the session to integrate Supabase, implement authentication, and refine the UI/UX.

### 1. Supabase Integration

*   **Prisma Schema Modification:**
    *   The `id` field in `backend/prisma/schema.prisma`'s `User` model was changed from `cuid()` to `@db.Uuid` to align with Supabase's UUID-based authentication system.
    *   The `updatedAt` field in `backend/prisma/schema.prisma`'s `User` model was updated to include `@default(now())` to prevent database errors during user creation.
*   **Supabase Row Level Security (RLS):**
    *   RLS was enabled on the `public.users` table.
    *   The following RLS policies were created:
        *   "Public profiles are viewable by everyone." (SELECT USING (true))
        *   "Users can insert their own profile." (INSERT WITH CHECK (auth.uid() = id))
        *   "Users can update their own profile." (UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id))
        *   "Users can delete their own profile." (DELETE USING (auth.uid() = id))
*   **Supabase Trigger for New User Creation:**
    *   A PostgreSQL function `handle_new_user()` and a trigger `on_auth_user_created` were created in the Supabase database. This trigger automatically inserts a new record into `public.users` when a user signs up via Supabase Auth, using `coalesce` for `username` and `name` to handle cases where OAuth providers might not directly provide these fields.
*   **Supabase Client Setup:**
    *   **Backend:** The `@supabase/supabase-js` library was installed. The Supabase client is now initialized in `backend/src/server.ts` (after `dotenv.config()` runs) and set on the Express `app` object.
    *   **Frontend:** The `@supabase/supabase-js` library was installed. A utility file `frontend/src/lib/supabaseClient.ts` was created to initialize and export the Supabase client.
*   **Environment Variables:**
    *   `SUPABASE_URL` and `SUPABASE_ANON_KEY` were added to `backend/.env.production`.
    *   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` were added to `frontend/.env.production` and `frontend/.env.local`.

### 2. Authentication Features

*   **Backend API Endpoints:**
    *   `backend/src/controllers/auth.controller.ts` was created to handle `signup`, `login`, and `logout` logic using the Supabase client.
    *   `backend/src/routes/auth.routes.ts` defines the API routes (`/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`).
    *   The `createUser` logic was moved from `backend/src/controllers/user.controller.ts` to `auth.controller.ts`.
    *   An `authenticateToken` middleware was added in `backend/src/app.ts` to protect routes requiring authentication.
*   **Frontend Authentication Forms:**
    *   `frontend/src/components/auth/SignInForm.tsx` and `frontend/src/components/auth/SignUpForm.tsx` were created.
    *   These forms integrate with the backend API for email/password authentication.
    *   Google and GitHub OAuth sign-in/sign-up options were added, utilizing `supabase.auth.signInWithOAuth`.
    *   **Form Validation:** Implemented client-side validation for email format, password length (min 8 chars), and required fields (name, username) with real-time error messages.
    *   **Integrated Forms:** `SignInForm` and `SignUpForm` are now integrated into a single view in `page.tsx`, allowing users to switch between them via "Sign In" and "Sign Up" links.
*   **Session Management:**
    *   The frontend (`frontend/src/app/page.tsx`) now listens for Supabase authentication state changes (`onAuthStateChange`) to manage the `isLoggedIn` state and store/remove session tokens in `localStorage`.
    *   An `isLoading` state was introduced in `page.tsx` to prevent UI flicker during session checks, ensuring a smoother transition to the correct page (dashboard or landing).

### 3. UI/UX Improvements

*   **Form Styling:**
    *   Input fields in `SignInForm.tsx` and `SignUpForm.tsx` were updated with `bg-input`, `text-foreground`, `border-border`, `focus:ring-primary`, and `focus:border-primary` classes for better visibility and theme consistency.
    *   A `form-container-glow` class was added to `frontend/src/app/globals.css` and applied to the form container for a glowing shadow effect on focus.
    *   An `input-focus-glow` class was added to `frontend/src/app/globals.css` and applied to input fields for a smooth focus effect.
*   **Form Transition:**
    *   The form transition logic in `frontend/src/app/page.tsx` was simplified. Instead of complex `absolute` positioning, forms are now conditionally rendered with `opacity` and `transform` animations, ensuring the container maintains its height and forms slide in/out smoothly without disappearing or causing blank spaces.
*   **Google Logo:**
    *   The `frontend/public/google.svg` file was updated to a simple, white "G" logo.
*   **Mobile Interface:**
    *   Responsive padding (`p-4 sm:p-6 md:p-8`) was added to the main content `div` in `frontend/src/components/sections/DashboardContent.tsx` to ensure proper spacing on mobile devices.
*   **Header Navigation:**
    *   Header navigation links (`Developers`, `Projects`) were removed, leaving only `Community`.
    *   The "Join DevConnect" button in `Hero.tsx` now directly triggers the sign-up form.
    *   The Header's logo/name (`DevConnect` and Code icon) now dynamically links to the root (`/`) for both logged-in (which renders Dashboard) and logged-out states (which renders Landing/Auth forms).
    *   "Sign In" and "Get Started" buttons in the Header are hidden when authentication forms are active.
*   **Loading Page:**
    *   The loading page in `page.tsx` was redesigned to feature only a central animated rocket icon with a circular loading indicator, removing the code icon and text. The Header is hidden during loading.
*   **Toast Notifications:**
    *   A new `Toast.tsx` component was created for smooth, responsive, top-right notifications.
    *   Integrated into `page.tsx` to display success/error messages for authentication actions (e.g., successful logout).
    *   Toast background colors were adjusted to `bg-card` with `text-primary` (for success icon) and `text-red-500` (for error icon) to better match the overall dark theme.

### 4. Troubleshooting & Key Learnings

*   **Environment Variable Loading:** Ensured `dotenv.config()` is called at the very entry point (`backend/src/server.ts`) and explicitly loads `.env.production`. Supabase client initialization was moved inside `startServer` to guarantee environment variables are loaded.
*   **Next.js Client vs. Server Components:** Confirmed `frontend/src/app/page.tsx` is marked with `'use client'` due to its use of `useState` and `useEffect`.
*   **Form Animation Techniques:** Learned that `position: absolute` can cause container collapse and that `max-h-0` with `overflow-hidden` can lead to forms disappearing. A more robust approach involves rendering both forms and using `opacity` and `transform` for animation, while managing container height and `z-index` for layering.
*   **SVG Icon Accuracy:** Emphasized the importance of using precise SVG code for brand logos.
*   **CORS Issues (Development Environment)**:
    *   Encountered `JSON.parse: unexpected end of data` due to empty responses from backend, resolved by ensuring valid JSON responses.
    *   Repeated `403 Forbidden` errors during local development, primarily due to `next.config.js` `rewrites` proxying behavior and `helmet`/`cors` middleware interaction.
    *   Attempted various `cors` configurations (regex, function-based, permissive `cors()`) and middleware reordering (`cors()` before `helmet()`).
    *   **Key Learning**: For local development, direct communication from frontend to backend (bypassing Next.js proxy for API calls) is often more reliable. However, due to persistent issues, the CORS configuration in `backend/src/app.ts` was reverted to its production-safe state, acknowledging that email/password login might remain problematic in local development, while OAuth (Google/GitHub) should still function. This trade-off allows continued development.
*   **React Hook Import/Export Errors**: Resolved `Unexpected eof` and `useState is not defined` errors in `page.tsx` caused by incorrect placement and duplication of `import` statements and component declarations.
*   **UI Flicker on Login**: Addressed the brief display of the landing page before redirecting to the dashboard by introducing an `isLoading` state, ensuring content is only rendered after authentication status is confirmed.

This comprehensive update should provide a clear checkpoint of the project's current state and the rationale behind the changes.
