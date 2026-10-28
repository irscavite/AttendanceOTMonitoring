MULTI PAGE TEST BUILD

All sidebar modules have standalone HTML entrypoints. Sidebar navigation performs a full page change.

Dedicated pages use scoped Firebase record/shared subscriptions, but a shared JS bundle and profile/directory reads remain. Full independently split JavaScript modules are NOT yet implemented.

IMPORTANT: Test in a SEPARATE Firebase Hosting preview channel, not over your production deployment. Data writes still target the configured production Firebase unless you connect a test database.

Check every role, OT editing/approval, leave approvals, attendance, account creation, payroll, and Masterlist before rollout.

Login: index.html; Dashboard: DASHBOARD.html; OT Review: OTREVIEW.html.
