const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hash
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
