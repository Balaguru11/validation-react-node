const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
require("dotenv").config();

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Homepage");
  console.log("Connected with Localhost");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});
