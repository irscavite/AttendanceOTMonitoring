# Modular app — conservative performance pass

Baseline: Attendance-No-White-Screen-TEST.zip.

Changes:
- Removed globally included SheetJS from module HTML files; the existing app source contains no direct XLSX API calls (only a comment mentioning XLSX).
- Removed ExcelJS only on DASHBOARD.html, which is not an Excel-export module. ExcelJS remains on other module pages to avoid breaking export actions.
- Kept auth, role permissions, Firebase configuration, approval flows, and the existing monolithic script unchanged.

IMPORTANT: THIS IS NOT YET THE COMPLETE JS MODULE SPLIT. The old shared 1.33MB script and Firebase pullAppData remain. Breaking those shared variables without a dependency/role audit is unsafe. This ZIP is an incremental test build only.

Test separately from production: login for each role; dashboard; navigate every sidebar item; check approvals, CRUD and exports; compare Performance & Network. If a Dashboard-specific export is required, restore ExcelJS on DASHBOARD.html.
