const SHEET_NAME = 'Leaderboard';
const ALLOW_RESET = true;

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'name', 'score', 'zone', 'stage', 'level']);
  }
  return sheet;
}

function rowToEntry_(row) {
  return {
    date: row[0],
    name: row[1],
    score: row[2],
    zone: row[3],
    stage: row[4],
    level: row[5]
  };
}

function doGet(e) {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return jsonOutput_([]);
  }

  let entries = data.slice(1)
    .map(rowToEntry_)
    .filter((entry) => entry.name);

  const limit = parseInt(e && e.parameter && e.parameter.limit, 10);
  if (Number.isFinite(limit) && limit > 0 && entries.length > limit) {
    entries = entries.slice(entries.length - limit);
  }

  return jsonOutput_(entries);
}

function doPost(e) {
  const sheet = getSheet_();
  const payload = parsePayload_(e);

  if (payload.action === 'reset') {
    if (!ALLOW_RESET) {
      return jsonOutput_({ ok: false, error: 'reset_disabled' });
    }
    sheet.clearContents();
    sheet.appendRow(['timestamp', 'name', 'score', 'zone', 'stage', 'level']);
    return jsonOutput_({ ok: true, reset: true });
  }

  const name = String(payload.name || '').trim();
  if (!name) {
    return jsonOutput_({ ok: false, error: 'missing_name' });
  }

  const entry = {
    date: new Date().toISOString(),
    name,
    score: Number(payload.score) || 0,
    zone: Number(payload.zone) || '',
    stage: Number(payload.stage) || '',
    level: Number(payload.level) || ''
  };

  upsertEntry_(sheet, entry);

  return jsonOutput_({ ok: true });
}

function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return e && e.parameter ? e.parameter : {};
    }
  }
  return e && e.parameter ? e.parameter : {};
}

function upsertEntry_(sheet, entry) {
  const values = sheet.getDataRange().getValues();
  if (values.length > 1) {
    const nameKey = String(entry.name).trim().toLowerCase();
    const zoneKey = Number(entry.zone);

    for (let i = 1; i < values.length; i++) {
      const rowName = String(values[i][1] || '').trim().toLowerCase();
      const rowZone = Number(values[i][3]);
      if (rowName === nameKey && rowZone === zoneKey) {
        const rowScore = Number(values[i][2]) || 0;
        if (entry.score > rowScore) {
          sheet.getRange(i + 1, 1, 1, 6).setValues([[
            entry.date,
            entry.name,
            entry.score,
            entry.zone,
            entry.stage,
            entry.level
          ]]);
        }
        return;
      }
    }
  }

  sheet.appendRow([
    entry.date,
    entry.name,
    entry.score,
    entry.zone,
    entry.stage,
    entry.level
  ]);
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
