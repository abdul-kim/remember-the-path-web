Google Sheets Leaderboard Setup

1) Create a new Google Sheet.
2) Open Extensions -> Apps Script.
3) Replace the default Code.gs contents with apps-script/Code.gs.
4) Deploy -> New deployment -> Web app.
   - Execute as: Me
   - Who has access: Anyone
5) Copy the Web app URL (ends with /exec).
6) Paste it into CONFIG.leaderboard.appsScriptUrl in index.html.

Optional
- Set ALLOW_RESET in Code.gs to false to disable remote resets.
- Set CONFIG.leaderboard.allowReset to false to hide remote resets in the UI.
