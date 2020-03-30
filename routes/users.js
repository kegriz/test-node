var express = require("express");
var router = express.Router();
const dbConfig = require("../config/keys");

const Pool = require("pg").Pool;
const pool = new Pool(dbConfig);

router
  .get("/", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM users");
      res.status(200).json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .post("/", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("INSERT into users(name) VALUES ($1)", [
        req.body.name
      ]);
      res.send(result.rowCount + " users added");
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .get("/:id", async (req, res) => {
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
  })

  .patch("/:id", async (req, res) => {
    try {
      const client = await pool.connect();
      await client.query("UPDATE users SET name=($1) WHERE id=($2)", [
        req.body.name,
        req.params.id
      ]);
      res.send(
        `user with id = ${req.params.id} updated with name = ${req.body.name}`
      );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .delete("/:id", async (req, res) => {
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
  });

module.exports = router;
