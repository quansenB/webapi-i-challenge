const express = require("express");
const server = express();
const users = require("./data/db");

server.use(express.json());

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    users
      .insert(req.body)
      .then(data => {
        res.status(201).json(users.findById(data.id));
      })
      .catch(error => {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  users
    .delete(req.body.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    users
      .update(req.body.id, req.body)
      .then(data => {
        res.status(200).json(users.findById(data.id));
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

// step four: listen for incoming requests
server.listen(3000, () => {
  console.log("listening on 3000");
});
