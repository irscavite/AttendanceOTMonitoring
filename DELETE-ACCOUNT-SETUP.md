# IT System Accounts: permanent deletion

The IT Delete action calls the Firebase Cloud Function in `firebase-function.js`.
This function checks the signed-in user's current Realtime Database profile and
allows only an active IT account. It protects IT accounts, Initial Setup
accounts, and the signed-in account. It disables the target, deletes its
Firebase Authentication user, then removes `accounts/{uid}` and
`publicAccountDirectory/{uid}` plus its IT-managed directory entry.

The Employee Master List and historical attendance, overtime, leave, and
schedule records are intentionally retained. Deletion is permanent; creating
a new login for that employee will give them a new Firebase UID.

## Deploy

From the project folder, with access to the `otmonitoring` Firebase project:

```sh
firebase login
npm install
firebase deploy --only functions:deleteSystemAccount --project otmonitoring
```

All files are in the ZIP root. The `firebase.json` configuration uses this
same directory as the Cloud Functions source; `package.json` points to
`firebase-function.js` and the ignore list excludes website assets from the
function upload. Run the commands in the directory containing `firebase.json`.

Upload/serve the updated `index.html`, `firebase-backend.js`, and app JavaScript
alongside the existing site. Use the Firebase Cloud Function in the same
Firebase project as the web config. Deploying the HTML alone cannot delete
other users from Firebase Authentication. Firebase Cloud Functions deployment
requires the Blaze plan. Do not put an Admin SDK service account or any secret
in the web files. The function uses the deployed service's credentials.

If deletion reports a partial failure, the target is disabled. Retry Delete
to complete cleanup. Confirm completion in Firebase Console > Authentication
and Realtime Database after the function returns success.
