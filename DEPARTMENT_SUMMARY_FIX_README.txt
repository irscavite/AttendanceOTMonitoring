Department Summary idle-load test fix

Changes: removed eager OT/Leave/Attendance database reads and realtime listeners when opening Department Summary. Kept employee directory loading. Detailed biometric/OT/leave data for selected cutoff remains fetched by Download Excel button.

This addresses known unnecessary page loading, but does not prove or fix every potential Chrome freeze (global timers and other app-wide listeners remain). Test on localhost with backup before production.
