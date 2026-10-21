# Operation Supervisor — OT Review fix (2026-10-19)

## What was changed

- Supervisor OT Review now has a **Pending Supervisor Approval — All Dates** table above the existing date-filtered OT history.
- Approve/Forward, Edit OT and Reject use the **selected record's duty date**, not the date picker value.
- The default duty date remains today for historical details; it no longer hides older pending OT from the actionable queue.
- The operation supervisor can switch between **Operation** and **MnR** within existing access restrictions; they remain separate queues.
- Firebase department-member OT listeners now attach for newly linked roster members without requiring logout, and detach if members move out of that supervisor's authorized roster.
- An unavailable optional MnR employee-directory bucket no longer suppresses loading the primary Operation roster. Failures to read the supervisor's primary roster are now reported rather than silently treated as an empty list.
- A **Refresh OT** button re-hydrates the current supervisor's allowed records from Firebase.
- Cache query strings in `index.html` were updated so browsers use the corrected JavaScript.

## Data / approval logic

No OT records or employee accounts were deleted/renamed. The approval sequence remains:
Employee filing -> Supervisor Approve/Forward -> Request Approver Pending -> Request Approver decision.
Admin Department direct-to-Approver routing is unchanged. No Firebase database/rules configuration was changed by this patch.

## How to deploy / verify

1. Upload the full website files (including `index.html`, `app.20260817-hr-masterlist-performance-fix.js`, and `firebase-backend.js`) to the same host/path used by the system.
2. Sign in as **Operation Supervisor** -> **OT Review**. Check the **Operation** department and the **Pending Supervisor Approval — All Dates** section.
3. Click **Refresh OT**; optionally choose **MnR** to review its queue.
4. Approve a test filing with a duty date older than today. It should leave the Supervisor pending list and appear as **Pending Approver** for that date.
5. If employees are still missing after refresh, have IT/HR verify (a) the Supervisor account `department` is exactly `Operation`, (b) affected employee profiles are linked in Firebase `v2/employeeDirectory/Operation` (or `MnR`) with correct Employee No., and (c) the deployed `database.rules.json` supports Operation/MnR access. The attached code alone cannot verify the live database or publish its security rules.

## Tests performed

- `node --check` succeeds on both modified JavaScript files.
- Simulated front-end test: the Oct 16 Operation OT appears in the all-dates queue when the date filter is Oct 19, approve sends Oct 16, and MnR records appear only on the MnR tab.
- Simulated Firebase listener test: a newly added member is subscribed automatically, and transferring a member removes its OT from the old supervisor's cache.
- `database.rules.json` JSON validation succeeds.
