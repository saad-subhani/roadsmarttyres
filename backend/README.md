# Road Smart Tyre CMS backend

This is the selected PHP backend for Road Smart Tyre blogs, reviews, contact enquiries and administrator login. It does not include Soltekker starter content, credentials, logs or its database.

## Frontend route and component locations

- `/about-us` → `app/about-us/page.jsx`
- `/services` → `app/services/page.jsx`
- `/faq` → `app/faq/page.jsx`
- `/blog` → `app/blog/page.jsx`; `/blog/[post]` → `app/blog/[post]/page.js`
- `/contact-us` → `app/contact-us/page.jsx`
- Individual service detail routes → `app/[slug]/page.js`
- Shared page layouts/content → `components/ReferenceSite/ReferencePages.jsx`
- Homepage reviews → `components/Testimonials/Testimonials.jsx`; services-page reviews use the same CMS data and fallback list.

Admin screens and actions stay on the website origin under `/admin` (for example `/admin/login`, `/admin/content?type=blogs`, and `/admin/contacts`). Admin API routes are available under `/admin/api/...`. `next.config.js` proxies them to the PHP backend without changing the browser URL.

## Requirements

- PHP 8.2+ with PDO MySQL, fileinfo, mbstring and sessions
- MySQL 5.7.8+ or MySQL 8
- Node.js 18.17+

## Local setup

1. Create a MySQL database named `roadsmarttyres` (or configure a different name in `backend/.env`).
2. From the project root, run `php backend/setup.php`. It creates `backend/.env` with a random admin password; open that file locally to view or change the credentials. Setup imports the Road Smart Tyre starter blogs and reviews only when initializing a new database.
3. Start the PHP API in one terminal: `php -S 127.0.0.1:8000 -t backend/public backend/router.php`.
4. Copy `.env.local.example` to `.env.local` and set `BACKEND_URL` to the PHP API origin. `FRONTEND_URL` in `backend/.env` must match the browser-visible website origin exactly.
5. Start the Next.js website in another terminal with `npm run dev`.
6. Open `http://localhost:3000/admin` to reach the admin dashboard. The dashboard supports blog and review publishing, and managing contact enquiries.

The website reads published blogs and reviews from the PHP API. Contact form submissions are saved to MySQL. The Next.js proxy keeps admin pages at `/admin/...` and proxies the CMS APIs and uploads through the website origin. Email delivery is optional; configure SMTP settings in `backend/.env` to enable notifications and visitor replies.

For deployment, serve only `backend/public` as the PHP document root, keep `backend/.env` private, use HTTPS with `SESSION_SECURE=true`, and set `BACKEND_URL` to the PHP API origin.
