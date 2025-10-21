const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "meinedatabase",
  password: "mysecretpassword",
  port: 8044,
});


async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      vorname VARCHAR(255) NOT NULL,
      nachname VARCHAR(255) NOT NULL,
      alter INT NOT NULL
    )`)
}

const user = [
  {
    id: 1,
    vorname: "Max",
    nachname: "Mustermann",
    alter: 25,
  },
  {
    id: 2,
    vorname: "Suheib",
    nachname: "Marzouka",
    alter: 29,
  },
];

app.get("/", (req, res) => {
  res.send("Hallo Welt, API funktioniert!");
});

app.get("/user" , (req,res) => {
    res.json(user)
})

app.get("/user/:id", (req,res) => {
    const userId = req.params.id;
    // console.log(userId)
    const userById = user.find((u) => u.id == userId);
    res.json(userById);})


app.post("/user", (req,res) => {
    const newUser = req.body;
    user.push(newUser);
    res.json(newUser);
})

initDB().then(() => {app.listen(8000)});