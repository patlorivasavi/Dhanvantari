//backend/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dhanvantari"
});

db.connect((err) => {
    if (err) {
        console.log("❌ MySQL connection failed");
        console.log(err);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

module.exports = db;