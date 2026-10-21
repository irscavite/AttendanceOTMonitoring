# Operation Supervisor – October 19 employee OT review (2026-10-19)

## Symptom
The Operation Supervisor could see their own October 19 OT while expected member OT was absent in **OT Review**. The code alone cannot establish whether the other employees' October 19 filings were saved to live Firebase. The previous 'All Dates' fix did not address the distinction between unreadable data and non-filed OT.

## Additional safeguards in this build

1. Re-fetch authorized OT submissions and Request Approver records each time the **Operation Supervisor** opens OT Review, not just on their first visit that login session.
2. Track per-employee Firebase reads for Supervisor OT submissions and request records. Failed employee-owner reads no longer disappear without an indication. A warning appears in OT Review if one or more reads are denied/failed. The valid records still display.
3. Never replace a previously loaded member's realtime OT with an empty snapshot solely because a subsequent Firebase read failed.
4. On a date with only the supervisor's own OT visible, show a contextual notice that **no member OT was loaded**. Include the number of authorized employee-owner folders checked, when available. This is NOT proof that an employee did not submit.
5. If that day's OT exists under the other authorized department (Operation/MnR), show a hint telling the supervisor to switch tabs. Approval queues remain department-specific and no privileges expand.
6. Keep the **Pending Supervisor Approval — All Dates** list, original OT date per action, and Supervisor -> Request Approver workflow.

## Verification for October 19, 2026

- Deploy the updated `index.html`, `firebase-backend.js`, and `app.20260817-hr-masterlist-performance-fix.js` together. The index file has new JavaScript cache-busting versions.
- Sign in as the Operation Supervisor. Open **OT Review**, verify date **2026-10-19**, select **Operation**, then click **Refresh OT**. If there is a count in the MnR message, select **MnR** too.
- If it still shows only the supervisor's own OT, check whether the warning reports failed employee reads or whether the authorized owner count is unexpectedly low.
- For affected employee numbers, ask IT/HR to check the **live Firebase database**: `v2/employeeDirectory/Operation/employees/<EmployeeNo>` (or `MnR`), and `v2/collections/hrEmployeeAttendanceOTSubmissionsV1/<EmployeeNo>/items/*` with `date` = `2026-10-19`, `hasOT` true and payable `totalHours` > 0. Employee numbers, linked account department, owner `_department` and submission `department` must agree.
- If no such employee filing exists in Firebase, verify from each employee's screen whether their submission succeeded and whether any "Firebase could not save" message appeared. An unsaved form cannot appear in the Supervisor queue merely by changing the filter.

## Scope & tests

No Firebase database records, project URL, employee credentials, approval states, or `database.rules.json` are changed. No automatic forwarding/approval is introduced. Existing other departments continue with their previous lazy-load behavior.

Local verification: JS syntax checks, October 19 Operation member OT simulation, own-OT-only notice, MnR separation, partial Firebase read error diagnostics, existing cross-date OT approval tests, realtime member-add/remove tests. No live database authentication, actual account sign-in, or end-to-end deployment was performed.
