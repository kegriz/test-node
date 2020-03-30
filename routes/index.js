var express = require("express");
var router = express.Router();

router.get("/", (req, res) => res.send("express is working"));

module.exports = router;
