const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("./schema/user");
require("./schema/post");

app.use(express.static(`${__dirname}/uploads/`));
app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

//for mongoDB
MONGOURL = process.env.MONGOURL;
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

app.listen(4000, () => console.log("listening on port 4000"));
