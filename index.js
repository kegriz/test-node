const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
const PORT = process.env.PORT || 5000;
const dbConfig = require("./config/keys");

const Pool = require("pg").Pool;
const pool = new Pool(dbConfig);

const getUsers = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    res.status(200).json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};

express()
  .get("/", (req, res) => res.send("express is working"))
  .get("/users", getUsers)
  .listen(PORT || 5000, () => console.log(`Listening on ${PORT}`));
