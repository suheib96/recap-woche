const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "meineDatenbank",
  database: "meinedatabase",
  password: "mysecretpassword",
  port: 5432,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      vorname VARCHAR(255) NOT NULL,
      nachname VARCHAR(255) NOT NULL,
      alter INT NOT NULL
    )`);
}

app.get("/", (req, res) => {
  res.send("Hallo Welt, API funktioniert!");
});

app.get("/user", async (req, res) => {
  await pool.query("SELECT * FROM users").then((result) => {
    res.json(result.rows);
  });
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  await pool
    .query(`SELECT * FROM users WHERE id = $1`, [userId])
    .then((result) => {
      res.json(result.rows);
    });
});

app.post("/user", async (req, res) => {
  const newUser = req.body;
  await pool
    .query("INSERT INTO users (vorname,nachname,alter) VALUES ($1,$2,$3)", [
      newUser.vorname,
      newUser.nachname,
      newUser.alter,
    ])
    .then((result) => {
      res.json({
        message: "User " + newUser.vorname + " erfolgreich hinzugefügt",
      });
    });
});

app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  await pool
    .query(
      `UPDATE users SET vorname = $1, nachname = $2, alter = $3 WHERE id = $4`,
      [updatedUser.vorname, updatedUser.nachname, updatedUser.alter, userId]
    )
    .then((result) => {
      res.json({
        message: "User " + updatedUser.vorname + " erfolgreich geupdated",
      });
    });
});

app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;
  await pool
    .query(`DELETE FROM users WHERE id = $1`, [userId])
    .then((result) => {
      res.json({ message: "User " + userId + " erfolgreich gelöscht" });
    });
});

initDB().then(() => {
  app.listen(8000);
});
