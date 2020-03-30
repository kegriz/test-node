const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

express()
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use('/', indexRouter)
  .use("/users", usersRouter)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
