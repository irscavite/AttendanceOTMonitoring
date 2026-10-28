OPTIMIZED MULTI PAGE TEST — 2026-10-28

1. index.html is now a dedicated lightweight login/role router. It no longer loads app.20260817...js or calls pullAppData for dashboards, leave or OT. Firebase Authentication still loads as needed for login.
2. After sign-in, IT routes to ACCOUNT_REQUESTS.html; other roles route to DASHBOARD.html.
3. All 30 dedicated pages use separate HTML files and sidebar clicks navigate between HTML files.
4. Dedicated page loading is scoped for configured shared/record collections in firebase-backend-v27.js; note directory reads and supervisor per-page hydration may still fetch additional data.
5. Heavy spreadsheet libraries omitted on modules not expected to export to Excel. Test any export features.
6. INITIAL_SETUP_LEGACY.html preserves the older first-time installation/bootstrap UI if needed. Not intended for routine sign in.
7. IMPORTANT LIMITATION: Module pages still share a large 1.33 MB app JS file. This is NOT a fully independently bundled app; performance improvement cannot be guaranteed. Page-by-page runtime profiling is still needed.
8. Test against staging database or avoid create/edit/delete actions when testing against live Firebase.

TEST: open http://localhost/<folder>/ , login -> DASHBOARD.html (or ACCOUNT_REQUESTS.html for IT). Then use sidebar and check URL changes (e.g. OTREVIEW.html). Check Chrome F12 Network for Firebase downloads.
