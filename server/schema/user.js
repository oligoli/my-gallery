const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

mongoose.model("User", userSchema);
