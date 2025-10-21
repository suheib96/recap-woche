const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

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
app.listen(8000);
