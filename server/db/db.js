import sqlite3 from 'sqlite3';

// db folder
const DB_PATH = 'db/db.sqlite';

// create db
let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    // cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// create users table
db.run(
  'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE, fullname TEXT, email TEXT UNIQUE, password TEXT)',
  (err) => {
    if (err) {
      // cannot open table
      console.error(err);
      throw err;
    }
  },
);

export default db;
