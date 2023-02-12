const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../key");
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, password, email } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  //if User already access with this email
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already access with this email" });
      }

      //if not find the email
      //first hash the password
      //schema object
      //then save it in database
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "please add a valid email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, jwt_secret);
          const { _id, name, email, pic } = savedUser;
          res.status(200).json({ token, user: { _id, name, email, pic } });
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = router;
