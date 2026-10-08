# Firebase Stage 2 migration and security test

## Company Bulletin / News

- Deploy the updated `database.rules.json` before testing bulletin posting.
- Confirm HR can create, edit, pin, expire, and delete a bulletin.
- Confirm a Supervisor assigned to the `Admin` department has the same bulletin posting controls.
- Confirm Employee, non-Admin Supervisor, Request Approver, and IT accounts can view bulletins but cannot write to `appData/hrCompanyBulletinsV1`.
- Confirm a newly published bulletin appears on another signed-in user's dashboard without reloading the page.
- Confirm an expired bulletin is hidden from general users and remains visible in the HR/Admin Supervisor archive.

## Important deployment order

Stage 2 changes the four sensitive operational datasets from shared JSON blobs
to individual records under `v2/collections`. This privacy update also moves
employee master/configuration data into department-scoped records under
`v2/employeeDirectory`. Use a short maintenance window:

1. Export a complete Realtime Database JSON backup.
2. Confirm `system/bootstrapComplete` is already `true` and that the IT login works.
3. Keep the previous Stage 1 ZIP available for rollback.
4. Publish this ZIP's `database.rules.json`. From this project folder, use
   `firebase deploy --only database`, or paste the file into Firebase Console →
   Realtime Database → Rules and click Publish.
5. Immediately deploy the Stage 2 web files.
6. Sign in as IT first. The first IT data pull migrates the legacy OT,
   attendance, employee submission, and leave arrays, then writes
   `system/schemaVersion = 2`. It also migrates employee master/configuration
   data, creates the sanitized chat account directory, and writes
   `system/privacySchemaVersion = 1`.
7. Do not let other roles begin testing until the IT migration finishes.

The legacy four operational blobs and seven employee-directory blobs are
retained read-only as a recovery source. Stage 2 does not delete them.

This build preserves the existing screens and local filtering interface while
the Firebase adapter translates sensitive arrays into record-level cloud data.
Employees can read only their own operational branch. Supervisors can read
their department branches. Request Approvers receive OT and leave collections,
while HR and IT retain their required system-wide views.
Admin-department accounts remain department-scoped unless IT explicitly grants
an Admin module. `Cutoff` grants the system-wide attendance/OT read needed by
that report. `Leave & Approved OT` grants system-wide OT/leave visibility and
allows HR review of existing leave requests without allowing cross-department
leave creation or deletion.

Employee directory visibility is additive to the existing UI access:

- Employee: own employee record only; no shared account directory.
- Supervisor: employee records for the assigned department only.
- Request Approver: directory read needed for final paid-leave validation.
- HR and IT: complete employee directory.
- Admin-department account: complete directory only when at least one Admin
  module is explicitly granted; the Employee Master List screen still requires
  the `employees` module.

The browser cache is cleared on successful sign-in and sign-out before the next
role is hydrated, preventing one user from inheriting another user's master
list on a shared PC.

Firebase-hydrated account, employee-directory, payroll, notification, chat, and
transaction data are stored per browser tab/session. Refreshing or signing in
as Employee/Supervisor in another tab must not clear the HR/Admin tab's Monthly
Salary, payroll deductions, account directory, or cutoff computation.

Monthly Salary is stored separately under `v2/privateEmployeeCompensation`.
It is not copied into the regular employee directory. Only HR and an active
Admin-department Supervisor with the `employees` module can read or write it. IT,
Employee, regular Supervisor, Request Approver, and Admin accounts without the
Employee Master List module are denied.

Paperless payslips are stored under `v2/collections/hrPayslipsV1`. HR and an
active Admin-department Supervisor with the `employees` module may create and
update payslips. New payslips use the recipient's Firebase UID as the private
branch key, so every linked Employee, Supervisor, Request Approver, or HR
account may read only its own account branch even when Employee No. formatting
differs. Legacy Employee No. branches remain readable when the link matches.
IT cannot read payroll payslips. An active IT account has deletion-only access
to clear the complete payslip collection through Data Maintenance; it cannot
create, update, list, or open individual payslips.
For recipient matching, HR and that Admin Supervisor may read the protected
Firebase system-account directory containing active status and employee
linkage. Only active profiles whose `employeeNo` matches the payroll row are
marked sent. Normal Employees, regular Supervisors, and Request Approvers
remain denied from the complete account directory and retain only their
existing limited account visibility.
If Hosting is deployed before these Database Rules, non-IT login will continue
to work in compatibility mode, but My Payslips stays unavailable and sending is
blocked until the rules are published.

## Before publishing the rules

1. Export a JSON backup from Firebase Realtime Database.
2. Keep the currently deployed web app available.
3. Follow the maintenance-window deployment order above.
4. Do not enable mandatory App Check until all role tests pass.

New Employee Master List records use an atomic yearly Firebase counter and the
format `EMP-YYYY-0001`. Existing Employee Nos. and their account, attendance,
OT, leave, payroll, and payslip links remain unchanged. The sequence is never
reused after deletion; a failed creation may therefore leave a harmless gap.

## Test with each account

- Employee: log in; view schedule; file and edit a pending leave; submit
  attendance/OT; read notifications; log out and back in. Confirm Employee
  Master List is absent and the browser receives only that employee's directory
  branch.
- Supervisor: select department/date filters; save attendance; create an OT
  request; process a leave request; edit schedules; verify realtime updates.
  Confirm another department's employee branch is denied.
- Request Approver: approve and reject OT; approve leave; test dashboard/date
  filters and notifications.
- HR: add an employee and confirm the new Employee No. follows
  `EMP-YYYY-0001`; confirm existing Employee Nos. remain unchanged; edit an
  employee; process leave; file HR-side OT/leave; run cutoff,
  department and status filters; add/edit Monthly Salary; confirm Salary per
  Day equals Monthly Salary divided by 26 and Semi-Monthly Salary equals Monthly
  Salary divided by 2; export Excel and confirm all salary columns use PHP
  currency formatting. In Cutoff, open Salary (No OT) and verify the result uses
  Semi-Monthly Salary less Absent, Late, Undertime, and Leave Without Pay
  deductions; confirm the Absent Days, Late Hours/Minutes, and Undertime
  Hours/Minutes columns match the finalized attendance; confirm paid leave is
  not deducted and OT does not change Salary. Filter the Salary tab by
  Department, download Salary Excel, and confirm the downloaded employees and
  deductions match the active cutoff, employee search, and Department filter.
  Confirm the workbook contains one worksheet with Bacao, Enlin, Malabon,
  Batangas, and Yard 2.1 sections in that order; each employee appears only
  under the assigned Work Area, and columns A through E remain frozen while
  scrolling horizontally.
- HR/Admin Supervisor: in Cutoff → Salary, send the cutoff payslips. Confirm the
  result lists only Firebase read-back-verified recipients as sent and gives a
  specific reason for every rejected delivery; confirm the sender receives their own
  payslip when linked, every other matched active account receives its own
  payslip, and an employee cannot read another employee's payslip.
  Confirm Employee No., S. Salary, and D. Salary are absent from the payslip,
  then test Print / Save PDF.
  Confirm the sent count matches every active Firebase account whose
  `employeeNo` is linked to an employee included in that cutoff.
- Admin Supervisor with `Leave & Approved OT`: confirm Pending HR requests from
  every department are visible; approve and reject one non-Admin request;
  confirm the Request Approver/employee notifications update; confirm the
  account cannot create or delete a leave record belonging to another employee.
- IT: create a test account; change its access; disable and re-enable it; verify
  the account directory and internal chat. Confirm a newly created employee is
  written into the correct department directory and appears to that department's
  Supervisor after realtime sync.
- Two-device check: keep the same page open on two devices and confirm a save
  appears on the second device without refreshing.
- Same-browser multi-account check: keep HR/Admin Cutoff → Salary open in one
  tab and refresh an Employee, Supervisor, Request Approver, and IT account in
  separate tabs. Confirm the HR/Admin salaries never become zero and the
  payslip recipient list remains complete.
- Offline check: disconnect one device, make one permitted change, reconnect,
  and confirm the pending save synchronizes.

## Firebase Rules Playground spot checks

- Employee: `/accounts` root = denied; own `/accounts/{uid}` = allowed;
  `/publicAccountDirectory` = denied; own employee record = allowed; another
  employee record = denied.
- Supervisor: assigned department directory = allowed; another department =
  denied; schedule/shift/location/day-off writes inside the assigned department
  = allowed; profile/master-list writes = denied.
- HR/IT: full employee directory = allowed.
- Admin account without modules: full employee directory = denied.
- Admin account with `employees`: full employee directory read/write = allowed.
- HR or Admin Supervisor account with `employees`: private employee compensation
  read/write = allowed.
- IT, Employee, regular Supervisor, Request Approver, and Admin without
  `employees`: private employee compensation = denied.
- The seven legacy employee keys under `appData` are read-only to IT and cannot
  be written by any role.

Confirm IT `Clear Filed Data` removes Attendance, OT, Leave, all issued
paperless payslips, and workflow notifications. Confirm it preserves Employee
Master List, Monthly Salary, recurring deduction setup, schedules, SL/VL
configuration, accounts, and chat. Confirm IT still cannot open payslip content.

## OT agreement and advance-filing checks

- Supervisor: open OT Agreements, select a future Day Off or configured
  Philippine Holiday, choose one member or All Eligible, enter Expected OT In / Out,
  and send the notice. Confirm a normal workday for that member is rejected.
- Employee: confirm the bell and OT Agreements menu show the new notice. Answer
  OK and verify the Supervisor receives an unread response notification.
- Employee: answer NO on another notice. Confirm a blank reason is rejected and
  the saved reason is visible to the Supervisor.
- Security Rules Playground: an Employee may read only their own
  `hrOTAgreementsV1` owner branch. The Employee may mark it read or change a
  Pending Response to Accepted/Declined, but cannot change Duty Date, OT In,
  OT Out, OT Type, expected hours, instruction, employee name, or Supervisor.
- Employee: after answering OK, use File Advance OT. Confirm the selected future
  date is prefilled, attendance remains unfinalized, and the OT enters Supervisor
  review. Confirm the Supervisor can use Edit OT Time before forwarding it to
  the Request Approver.
- IT: confirm Clear Filed Data also clears OT agreements while preserving the
  Employee Master List, schedules, Work Area, Shift Time, and Day Off setup.

## Leave photo proof checks

- Deploy the Realtime Database rules with `firebase deploy --only database`
  from this project folder. This feature does not use Firebase Storage and does
  not require the Blaze plan.
- Employee: confirm VL can be submitted without a photo.
- Employee: confirm SL and Emergency Leave cannot be submitted without a photo.
- Confirm JPG, PNG, and WebP source files up to 5 MB show a preview and upload;
  reject unsupported formats and larger files. The browser must compress the
  submitted proof to about 400 KB before saving it in Realtime Database.
- Confirm the employee can remove a selected photo before submitting.
- Supervisor, Request Approver, and HR: confirm View Proof loads the attachment
  on demand from the separate `v2/leaveProofs` node while the leave status
  workflow remains unchanged.
- Confirm a proof is stored under its deterministic Employee No. + Leave
  Request ID path, and remains viewable after Supervisor approval and on a
  different HR/Approver device. Older UID-path proofs should be recovered by
  HR/IT when the leave record reference is missing.
- Edit a pending leave and upload a replacement proof. Confirm the new proof is
  visible and the older Realtime Database proof is removed by its uploader.
- Confirm an authenticated user cannot create or delete a proof under another
  uploader's UID folder, and cannot view proof outside their leave role or
  department access.

## Rollback

If migration or a required workflow fails, redeploy the complete previous
Stage 1 ZIP and publish `database.rules.rollback.json`. Rules alone are not a
complete rollback because the Stage 2 adapter expects the `v2` paths.
Record the account role, page, action, and affected date.

Do not delete or rename any database node during this test stage.
