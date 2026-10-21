# Admin Supervisor OT editing — v5

Based on `AttendanceOTMonitoring-OT-Review-Clean-v4.zip`.

## Scope
- Admin-department Supervisor account, **OT Review**, current date filter.
- `Edit OT` for own and other Admin employees' overtime; no new supervisor approval step.
- Pending Request Approver OT: edit **the existing request** and sync updated times to the employee OT submission/history.
- Approved OT: `Request Revision` invalidates the previous approval and re-submits the revised request to the Request Approver for a new decision. The existing revision history is kept.
- Rejected OT with a corresponding employee submission: `Edit & Resubmit` corrects the submission and marks its submission timestamp current so the direct Admin-to-Approver retry can detect it.
- OT not yet forwarded: editable submission and direct send to Request Approver.
- Cancelled requests cannot be edited through this action.
- Non-Admin Supervisor OT approvals, Operation/MnR visibility, other Admin modules, and Firebase rules are unchanged.

## Validation
- `node --check app.20260817-hr-masterlist-performance-fix.js` passed.
- Simulated tests: Admin supervisor own and peer requests, pending/approved/rejected/unforwarded/cancelled, department/role denial, Operation regression passed.
- No connected live Firebase account was used for testing; verify on deployed system before use in payroll.

## Live smoke test
1. Sign in with an Admin-department Supervisor account, open OT Review and select the duty date.
2. Locate an Admin employee and the supervisor's own OT and confirm each editable row has an Edit OT / Request Revision button.
3. Edit one Pending OT and verify the **same request** stays Pending Request Approver with updated time/reason.
4. To test approved OT safely, use a test request: Request Revision should send it back Pending, invalidating the earlier approval until a new decision.
5. Confirm Operation/MnR supervisor approval pages are unchanged.
