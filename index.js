const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

var usersRouter = require("./routes/users");

express()
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .get("/", (req, res) => res.send("express is working"))
  .use("/users", usersRouter)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
