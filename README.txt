Attendance / Leave / Overtime Monitoring
Firebase Configured Database + Authentication build — 2026-08-14

This build contains NO built-in employee data, NO demo transaction data, and NO built-in login accounts.

Firebase project already configured in firebase-config.js:
Project ID: otmonitoring
Realtime Database: https://otmonitoring-default-rtdb.firebaseio.com/

Account workflow:
1. Enable Firebase Authentication Email/Password and publish database.rules.json in Firebase Console.
2. Use the first-run setup form to create the initial IT and HR accounts.
3. HR signs in and registers employees in Employee Master List.
4. Each HR-created employee creates an Account Creation Request for IT.
5. IT creates the employee's Firebase Authentication login and selects access: Employee, Supervisor, Request Approver, HR, or IT.
6. Attendance, OT, Leave, employee master data, notifications, and related system data sync to Realtime Database.
7. Passwords are handled by Firebase Authentication and are not stored in localStorage or Realtime Database.

See FIREBASE_SETUP.txt for the two required Firebase Console settings before first use.

IMPORTANT - EXISTING FIREBASE AUTH USERS
----------------------------------------
If you already created the IT and HR users manually in Firebase Console > Authentication > Users, DO NOT create different users.
1. Publish database.rules.json in Realtime Database > Rules.
2. Open the web app.
3. Under INITIAL SYSTEM SETUP, enter the exact same Firebase Authentication email/username and password for IT and HR.
4. Click Create / Link IT & HR Accounts.
5. The app will detect that the Authentication users already exist, sign in to each one, and create the required /accounts/<uid> role profiles in Realtime Database.
6. After linking, use the normal login form.

The app accepts a full Firebase email address. A short username such as "it" is internally mapped to "it@otmonitoring.local". If you manually created a different email in Firebase Authentication, enter the FULL EMAIL, not only "it" or "hr".

Also make sure Authentication > Sign-in method > Email/Password is ENABLED.
Run the app through localhost, GitHub Pages, or Firebase Hosting; do not rely on opening index.html directly with file://.


UPDATE 2026-08-14 — HR ADMIN REQUESTS + SUPERVISOR OWN OT
---------------------------------------------------------
1. HR workspace now includes:
   - New OT Request (Admin Department)
   - Leave Request (Admin Department)
   HR can select any employee registered under Admin in Employee Master List.

2. HR-filed Admin OT is forwarded directly to Request Approver.
   This prevents HR from becoming its own approval step.

3. HR-filed Admin leave is forwarded directly to Request Approver.
   The normal Supervisor + HR review steps are marked as completed by the HR Admin filing action,
   so HR does not approve its own request again.

4. Supervisor New OT Request now shows the logged-in Supervisor's linked employee record at the
   very top with an "Input My Own Data" button.
   - Supervisor own attendance can be entered there.
   - Supervisor own OT bypasses self-review and goes directly to Request Approver.
   - The Supervisor login must have an Employee No. link from the HR Employee Master List.

5. If a Supervisor account is not linked to an employee record, the page shows a warning telling
   IT to assign Supervisor access from the employee's HR Master List account.
