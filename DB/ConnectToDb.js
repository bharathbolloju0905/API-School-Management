const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const isRender = process.env.RENDER === 'true';
const dbDir = isRender ? '/tmp' : path.join(__dirname);
const dbPath = path.join(dbDir, 'SchoolData.db');

// ✅ Ensure the directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

console.log(`🗂 DB Path used: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite DB:', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
  }
});

// ✅ Ensure table exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS SchoolData (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      address TEXT,
      latitude FLOAT,
      longitude FLOAT
    )
  `);
});

module.exports = db;
