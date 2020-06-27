const sqlite3 = require("sqlite3").verbose();

//Create database operations
const db = new sqlite3.Database("./src/database/database.db");

//   db.serialize(() => {
//       db.run(`CREATE TABLE places`);
//   })

module.exports = db;
