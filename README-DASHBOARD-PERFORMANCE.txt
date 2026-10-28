DASHBOARD STARTUP PATCH v1 - 2026-10-28

Based on Attendance-Modular-Pages-SESSION-FIX.zip.

Changes:
- Authenticated module pages no longer block on initial Firebase system bootstrap status.
- Supervisor dashboard hydration is not awaited twice before showing the dashboard.
- Nonessential pending OT recovery and legacy maintenance run after dashboard display.
- Removed redundant Supervisor background hydration (same attendance collection as dashboard hydration).
- Visible workspace loading placeholder replaces an empty content region while the required Firebase pull runs.
- Version-bumped JS URL to prevent stale script caching.

Not changed:
- Full pullAppData on HR and Request Approver dashboards; removing data there requires deeper
  per-role audit to avoid inaccurate KPIs/approvals.
- Shared 1.3 MB JS, required Firebase authorization, and live data consistency.

Verification: use Chrome DevTools Network > Preserve log + Disable cache, and measure
Firebase reads and time-to-dashboard. Test login, each role, dashboard totals,
OT/leave approvals, and logout BEFORE production use.
