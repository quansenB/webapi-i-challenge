const express = require("express");
const server = express();
const users = require("./data/db");
require('dotenv').config();

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
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

const findUserById = (id, res, status) => {
  users
    .findById(id)
    .then(data => {
      res.status(status).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
};

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    users
      .insert(req.body)
      .then(data => {
        findUserById(data.id, res, 201);
      })
      .catch(error => {
        res.status(400).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then(data => {
      if (data.name) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "There is no user with this id" });
      }
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
      .update(req.params.id, req.body)
      .then(data => {
        if (data.name) {
          findUserById(data.id, res, 200);
        } else {
          res.status(404).json({ error: "There is no user with this id" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`listening on 3000${port}`);
});
