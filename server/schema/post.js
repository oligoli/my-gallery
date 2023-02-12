const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  isCropped: {
    type: Boolean,
    required: true,
  },
  realImg: {
    type: String, //if crop image save this time real image save here
    required: false,
  },
  desireImg: {
    type: String, //which i want to save
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
});

mongoose.model("Post", postSchema);
