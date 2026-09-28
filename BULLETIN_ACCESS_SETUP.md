# Company Bulletin — HR / Admin Supervisor posting access

## What changed
- Everyone with an **active account** can see current bulletins on their dashboard and Bulletin page.
- **Publish / Edit / Delete** is available only to an active legacy `HR` account, or to an active **Admin-department Supervisor or Employee** with the `employees` (Employee Master List) admin module explicitly assigned by IT. Being a Supervisor, or simply belonging to Admin, does not grant posting rights.
- Non-publishers see a read-only bulletin page (no composer, edit, or delete controls). Firebase Realtime Database rules enforce the same permission even if somebody tries to write directly to the API.
- Bulletin saving reports failure if the Firebase sync API is unavailable, rather than reporting a local-only save as published.

## Important deployment steps
1. Deploy the updated website files, including `index.html` and `app.20260817-hr-masterlist-performance-fix.js`.
2. In the Firebase console for **the app's actual project**, go to **Realtime Database > Rules**. Replace the deployed rules with the **entire** updated `database.rules.json`, then click **Publish**. Alternatively, with the correct Firebase project selected, deploy the rules via Firebase CLI. Updating the JSON file on your website **does not** change live Database rules.
3. In IT > System Accounts > Change Access, ensure the intended HR/Admin Supervisor account is assigned to **Admin** and has the **Employee Master List** admin module. Do not grant this HR module solely for bulletin access unless the person is also authorized to see employee master data. The legacy HR-role account works without this extra step.
4. Reload the website. Test an authorized HR/Admin Supervisor, then a normal Employee, Supervisor, Request Approver, and IT account. The latter accounts should only see and read bulletins, and Firebase should reject direct writes from them.

**Note:** This release does not itself publish Firebase rules or alter existing account permissions. If the intended publisher lacks Employee Master List permission and should not receive it, a dedicated bulletin-only access flag should be implemented rather than granting broader HR data access.
