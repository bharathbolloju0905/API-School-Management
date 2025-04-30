const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/SchoolData.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS SchoolData (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, address VARCHAR, latitude FLOAT , longitude FLOAT)`);
    console.log('Connected to the database.');
});

module.exports = db;