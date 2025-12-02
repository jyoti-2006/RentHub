# RentHub — Feature Inventory

This file is a concise, copy-friendly inventory of the features implemented in this repository and where to find them in the source tree.

Date: 2025-12-02

---

## Core backend features

- Authentication, registration and admin onboarding
  - Files: `server-supabase.js`, `server.js`, `models/supabaseDB.js`
  - Endpoints:
    - POST `/api/register/user`  (user signup)
    - POST `/api/register/admin` (admin signup)
    - POST `/api/register/send-otp` (send verification OTP)
    - POST `/api/login`, POST `/api/login/admin`

- Password reset & OTP flow
  - Files: `server-supabase.js`, `config/emailService.js`
  - Endpoints:
    - POST `/api/forgot-password` (request OTP)
    - POST `/api/admin/forgot-password` (admin-only: verifies the email belongs to an admin, generates a 6-digit OTP stored in `password_reset_otps`, and sends the OTP to the admin email)
    - POST `/api/reset-password` (verify OTP and reset). Server validates newPassword is different from the current stored password and rejects with a clear message if it matches the old password.

- Vehicles API (catalog + admin CRUD)
  - Files: `server-supabase.js`, `models/supabaseDB.js`
  - Endpoints:
    - GET `/api/vehicles/:type` (list vehicles)
    - GET `/api/vehicles/:type/:id` (get vehicle details)
    - Admin CRUD: GET `/api/admin/vehicles`, POST/PUT/DELETE `/api/admin/vehicles/:type` and `/api/admin/vehicles/:type/:id`

- Booking lifecycle (user + admin)
  - Files: `server-supabase.js`, `public/js/*`, `models/supabaseDB.js`
  - Endpoints & features:
    - POST `/api/bookings` (create booking — requires auth)
    - GET `/api/bookings/user` (user bookings)
    - POST `/api/bookings/:id/cancel` (user cancel)
    - GET `/api/admin/bookings` (admin list)
    - GET `/api/admin/bookings/:id`
    - Admin actions: POST `/api/admin/bookings/:id/confirm`, `/reject`, `PUT` `/api/admin/bookings/:id`, `DELETE` `/api/admin/bookings/:id`
    - Refunds: POST `/api/bookings/:id/refund-details` (user) and POST `/api/admin/bookings/:id/refund-complete` (admin)
    - Time conflict checks built-in on booking creation

- Admin dashboard & user management
  - Files: `server-supabase.js`, `public/js/admin.js`
  - Endpoints & features:
    - GET `/api/dashboard-stats` (aggregated stats)
    - GET/PUT/PATCH `/api/admin/users` and `/api/admin/users/:id` (search, edit, block/unblock)

- Notifications & external integration
  - Files: `config/emailService.js`, `config/retellCallService.js`
  - Features: Email OTPs and booking emails; Retell AI call on booking confirmation

- Debug & helper endpoints
  - Files: `server-supabase.js`
  - Endpoints:
    - GET `/test-email` (email test)
    - GET `/debug/supabase` (simple supabase connectivity check)

## Frontend features (public and admin UIs)

- Public website & listings
  - Files: `public/index.html`, `public/about.html`, `public/contact.html`, `public/js/vehicles.js`
  - Feature: listings render via `vehicles.js` and link to booking form

- Authentication & registration pages
  - Files: `public/login.html`, `public/user-register.html`, `public/admin-register.html`, `public/admin-login.html`
  - Client scripts: `public/js/auth.js`, `public/js/user-register.js` (OTP flow, password rules)

- Booking UI
  - Files: `public/booking-form.html`, `public/js/main.js`, `public/js/vehicles.js`
  - Feature: create booking, choose date/time/duration, confirm in UI

- My Bookings (user)
  - Files: `public/my-bookings.html`, `public/js/my-bookings.js`
  - Feature: list user bookings, cancel, submit refund details

- Admin Portal
  - Files: `public/admin.html`, `public/js/admin.js`, `public/js/admin-login.js`
  - Feature: dashboard stats, manage bookings/users/vehicles/policies, confirm/reject/cancel workflows
  - Admin Forgot Password UI: `public/admin-forgot-password.html`

- Styling & theme
  - Files: `public/css/style.css`, `public/css/admin.css`, `public/css/styles.css`
  - Notes: primary color unified (deep purple) and vehicle-specific "Book Now" button styles added for bike/scooty/car

## Developer & support scripts

- `scripts/` contains DB migrations and helper utilities (e.g., migration to Supabase, create-admin, SQL files for schema changes)
- `data/` contains JSON fixtures used by `server.js` (the file-backed fallback server)

## How to run locally (quick)

1. Set env vars: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, EMAIL_USER, EMAIL_PASS, and optional PORT.
2. Install: `npm install`
3. Run in dev mode: `npm run dev` (server-supabase.js runs by default on port 3005)

Notes: `server.js` is an older, file-backed server that uses the `data/` JSON files. Avoid running both `server.js` and `server-supabase.js` simultaneously (port conflict).

## Quick suggestions

- Convert inline colors to CSS variables for consistent theming
- Add rate-limiting to OTP and sensitive endpoints
- Consider adding automated tests around booking conflict / refund logic
- Gate or remove debug endpoints in production

If you'd like, I can also add this content to `README.md` or generate a short developer quick-start section with example env var names — tell me which you prefer.
