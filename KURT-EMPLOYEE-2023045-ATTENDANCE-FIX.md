# Attendance correction for CARBA, KURT ALDAN (Employee No. 2023045)

Date: October 20, 2026

Scope: Browser attendance viewer only; no writes to either Firebase and no changes to OT/Leave approval logic.

- All records with biometric `user_id`, `employee_id`, or identity key identifying employee number **2023045** are mapped to CARBA, KURT ALDAN and the Operation department in the Attendance page, whether the source name is `1`, `Kurt Aldan Carba`, or another alias.
- All source UID/name variants with this employee number are merged under one attendance row per source duty date. Other employees named `1` are NOT affected.
- Attendance date loading now reads `employee_master`, the selected day's `attendance_logs` + `daily_attendance`, and the next day's records for overnight shifts. It no longer downloads the entire BioAttendance database at each click.
- The `daily_attendance.first_scan` and `daily_attendance.last_scan` fields act as a backup if a raw log is missing.
- For Kurt, the Firebase record's `date` is treated as the duty date even when scans occur the next morning.
- A pair of scans less than 1 minute apart (October 19) is labeled **Verify Double Scan**, not treated as a full worked shift.
- Cache-busted script URL in index.html.

Offline tests using the provided original Firebase export verified 69 raw biometric scan records spanning October 1–19, 2026, distributed across 19 unique duty dates. Each date renders exactly one Kurt attendance row with the expected scan count; the Oct 17 fallback also passed with `attendance_logs` disabled. This does not verify current live Firebase content or live deployment.

How to use: Deploy these system files, reload with Ctrl+Shift+R, go to Attendance, choose October 17, 18 or 19, and search for `2023045`. The supplied export has no Kurt scan on October 20, so that date may correctly show No Scan. Do not import or overwrite the Firebase JSON.
