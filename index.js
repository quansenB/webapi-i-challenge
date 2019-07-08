const express = require("express");
const server = express();
const users = require("./data/db");

server.use(express.json());

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(data => {
      console.log("happy");
    })
    .catch(error => {
      console.log("sad");
    });
});

server.get("/api/users/:id", (req, res) => {
  res.json("get one hub by id using req.params.id");
});

server.post("/api/users", (req, res) => {
  res.json("create a new hub using req.body");
});

server.delete("/api/users/:id", (req, res) => {
  res.json("delete hub by id using re.params.id");
});

server.put("/api/users/:id", (req, res) => {
  res.json("update hub by id using req.body");
});

// step four: listen for incoming requests
server.listen(3000, () => {
  console.log("listening on 3000");
});
