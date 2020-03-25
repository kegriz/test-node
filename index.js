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

const getUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users WHERE id=($1)", [
      req.params.id
    ]);
    res.status(200).json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};

const updateUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE users SET name=($1) WHERE id=($2)",
      [req.query.name, req.params.id]
    );
    res.send("user with id = " + req.params.id + " updated");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};

const addUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("INSERT into users(name) VALUES ($1)", [
      req.params.userName
    ]);
    res.send(result.rowCount + " users added");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("DELETE FROM users WHERE id=($1)", [
      req.params.id
    ]);
    res.send(result.rowCount + " users deleted");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};

express()
  .get("/", (req, res) => res.send("express is working"))
  .get("/users", getUsers)
  .get("/user/:id", getUser)
  .put("/user/:id", updateUser)
  .post("/user/:userName", addUser)
  .delete("/user/:id", deleteUser)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
