const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Use /tmp for writable access on Render
const dbPath = process.env.IS_RENDER ? '/tmp/SchoolData.db' : path.join(__dirname, 'db', 'SchoolData.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite DB:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});

// Create table (only runs if db file is fresh)
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
