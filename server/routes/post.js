const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname) +
        ".jpg"
    );
  },
});

router.post("/upload", (req, res) => {
  // 'file' is the name of our file input field in the HTML form

  let upload = multer({ storage: storage }).array("file");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    //for upload the image in mongoDb
    let desireImg;
    let realImg;
    const { isCropped, _id } = req.body;
    var paths = req.files.map((file) => file.filename);
    //console.log(paths)

    isCropped === "false" ? (desireImg = paths[0]) : (desireImg = paths[1]);
    isCropped === "false" ? (realImg = "") : (realImg = paths[0]);
    const post = new Post({
      isCropped,
      realImg,
      desireImg,
      postedBy: _id,
    });

    post
      .save()
      .then((result) => {
        console.log(result);
        return res
          .status(200)
          .json({ post: result, msg: "file uploaded successfully" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ err: err });
      });
  });
});

router.post("/myimage", (req, res) => {
  Post.find({ postedBy: req.body._id })
    .then((posts) => {
      console.log(posts);
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
