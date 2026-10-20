# Kurt attendance alias (October 20, 2026)

Only the browser attendance viewer was modified. No Firebase records, data, auth rules, other employee details, OT, or leave workflows were changed.

- Employee No: `2023045` and biometric UID: `47`
- Incoming biometric names `1`, `Kurt Aldan Carba`, or `CARBA, KURT ALDAN` display as **CARBA, KURT ALDAN**.
- Department displays as **Operation** in attendance so Operation supervisor can see scans.
- The two biometric-name variants already share Firebase identity key `2023045__UID47__1`; the viewer merges the existing attendance scans by that identity and duty date.
- Other employees whose biometric name is `1` are not affected.
- No JSON import is needed. Deploy this ZIP using the same process as before; reload the app with Ctrl+Shift+R, then test October 17 to 19, 2026 in Attendance.
- A pair of scans just one second apart (October 19) is preserved as received; the fix does not certify it as a true completed workday.
