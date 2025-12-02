# Booking Confirmation System — Setup & Usage

This document explains how to install and test the Booking Confirmation System (PDF invoice + QR code + email) added to RentHub.

Prerequisites
- Node.js (v16+)
- npm
- A Gmail account (for SMTP) — create an App Password or enable "Less secure apps" (not recommended). Use App Password for accounts with 2FA.

Install dependencies
```powershell
cd RentHub
npm install
```

New dependencies added
- `pdfkit` — PDF generation
- `qrcode` — QR code generation
- `dayjs` — date handling

Environment / Gmail SMTP setup
1. Create a `.env` file in the project root (if not present).
2. Add these variables in `.env`:
```
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password_here
SUPABASE_URL=your_supabase_url   # optional — if you use Supabase
SUPABASE_ANON_KEY=your_anon_key  # optional
```
3. For `EMAIL_PASS` use an App Password (recommended) or application-specific password for Gmail.

Run the server
```powershell
npm run dev
# or
npm start
```

How to test PDF + Email manually
1. Open `http://localhost:3005/booking-confirmation.html` in your browser.
2. Fill the demo form and click "Generate Invoice & Send Email".
3. The server will generate a PDF and place it under `public/invoices/booking_invoice_<bookingId>.pdf` and send an email with the attachment.

Track booking page
Open `http://localhost:3005/track-booking.html` and enter the booking id to fetch status from Supabase (if configured).

API routes
- `POST /api/confirmBooking` — Generate PDF, QR, attach and send email.
  - Body: JSON with `bookingId,userName,userEmail,vehicleName,startDateTime,duration,totalAmount,advancePayment`.
- `GET /api/trackBooking?id=XXXX` — Retrieve booking status (attempts Supabase lookup if configured).

Files added/modified
- `services/bookingConfirmation.js` — new: main logic for PDF/QR/email
- `public/booking-confirmation.html` — demo frontend
- `public/track-booking.html` — demo tracker
- `public/css/booking.css` — styling
- `public/photo/logo.svg` — small placeholder logo
- `config/emailService.js` — exports transporter for reuse
- `package.json` — new dependencies

Notes & next steps
- You can customize email templates in `services/bookingConfirmation.js`.
- For production, use a real SMTP provider or transactional email service (SendGrid, Mailgun) and secure credentials.
- If you want invoices stored in a different place (S3, database), modify `INVOICE_DIR` in `services/bookingConfirmation.js`.
