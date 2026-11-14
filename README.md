# Spendwise — Personal Expense Tracker

An offline-first expense tracker built with HTML, CSS, vanilla JavaScript and IndexedDB. Records and receipt photos stay in the browser on the current device; there is no account or server.

## Run it

Service workers, camera capture and PWA installation require a secure context. For local development, serve this folder from `localhost` (for example, `python -m http.server 8000`) and open `http://localhost:8000`. Deploy the files to any static host that serves HTTPS. On iOS, open the deployed site in Safari and choose **Share → Add to Home Screen**. Other supported browsers expose their normal install action.

The application shell is cached on first load. Create a first visit while online so the service worker can install; IndexedDB-backed expenses, reports, image management and backups then work offline. The Chart.js and Tesseract.js libraries are optional: charts fall back to local bar displays if Chart.js is unavailable, while OCR loads Tesseract on demand when connected. Receipt OCR suggestions always require review before saving.

## Files and architecture

- `index.html` — semantic app shell, dashboard, reports, history, budgets and dialogs.
- `styles.css` — responsive desktop sidebar, mobile bottom navigation, dark theme and components.
- `database.js` — IndexedDB schema, seed data and atomic expense/receipt writes.
- `expenses.js` — transaction filtering and fixed/calendar week helpers.
- `receipts.js` — image validation, compression, preview and optional OCR extraction.
- `reports.js` — totals, fixed monthly periods, Monday–Sunday calendar periods and exports.
- `charts.js` — Chart.js rendering with an offline fallback.
- `utils.js` — date, currency, safe text, download and dialog helpers.
- `app.js` — page state, forms, UI events, budgets, backup and restore.
- `manifest.webmanifest`, `service-worker.js`, `icons/` — install and offline shell assets.

Money is persisted as integer minor units (cents) and converted for display. The report period always comes from each transaction's date. Fixed monthly periods are days 1–7, 8–14, 15–21, 22–28 and (when present) 29–31. The optional calendar week starts Monday. All storage is local to the browser profile. Export JSON backups regularly; clearing site data or uninstalling can erase the local database.

## Backups

The full JSON backup includes expenses, compressed receipt Blobs encoded for transport, categories, budgets and settings. Restore validates the file shape before writing and adds records by ID; a matching ID is updated. CSV exports include all transactions. Receipt export produces a JSON bundle with receipt images and their transaction/category metadata. Monthly and daily data can be downloaded from Reports.

## Notes

No financial data is transmitted to a server. The first optional OCR load and Google Fonts/Chart.js may use the network; none are needed for recording expenses or calculating reports. Browser storage can be cleared by the user or browser, so keep an external backup. Authentication and cloud sync are intentionally not required.
