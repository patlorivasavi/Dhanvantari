//backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   SERVE FRONTEND WEBSITE
========================= */

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


/* =========================
   USER REGISTER
========================= */

app.post("/register", (req, res) => {

    const { username, email, password } = req.body;

    const sql = "INSERT INTO users (username,email,password) VALUES (?,?,?)";

    db.query(sql, [username, email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ message: "Registration failed" });
        }

        res.json({
            message: "User registered successfully",
            user: {
                user_id: result.insertId,
                username,
                email
            }
        });

    });

});


/* =========================
   USER LOGIN
========================= */

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.json({ message: "Login error" });
        }

        if (result.length > 0) {
            res.json({
                message: "Login successful",
                user: result[0]
            });
        } else {
            res.json({
                message: "Invalid email or password"
            });
        }

    });

});


/* =========================
   SAVE BMI
========================= */

app.post("/save-bmi", (req, res) => {

    const { user_id, height_cm, weight_kg, bmi_value, category } = req.body;

    const sql = `
        INSERT INTO bmi_history 
        (user_id,height_cm,weight_kg,bmi_value,category)
        VALUES (?,?,?,?,?)
    `;

    db.query(sql, [user_id, height_cm, weight_kg, bmi_value, category], (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ message: "BMI save failed" });
        }

        res.json({ message: "BMI saved successfully" });

    });

});


/* =========================
   START SERVER
========================= */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});