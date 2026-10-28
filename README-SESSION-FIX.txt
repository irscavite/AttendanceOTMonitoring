SESSION TRANSITION FIX - 2026-10-28

- All 30 module HTML pages hide the embedded login form from first paint; navigating between pages no longer flashes login.
- Firebase auth persistence restores account sessions on each full HTML navigation.
- If no session exists, the module redirects to index.html (the dedicated login page).
- If session restoration fails, the module redirects to index.html without clearing cached credentials on transient errors.
- Logging out from a module navigates to index.html after Firebase sign-out.
- Existing shared app JavaScript and Firebase loading remain; this fixes transition UX, not full module-level performance.

Test with local server in a fresh tab. Refresh with Ctrl+Shift+R. Login once, navigate across tabs and watch browser URL change. Test after logout and after closing/reopening browser.
