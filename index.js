const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
const PORT = process.env.PORT || 5000;

let pollEnvs;
if (PORT === 5000) {
  pollEnvs = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  };
} else {
  pollEnvs = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

const Pool = require("pg").Pool;
const pool = new Pool(pollEnvs);

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

express()
  .get("/", (req, res) => {
    res.send("express is working");
  })
  .get("/users", getUsers)
  .get("/users2", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM users");
      const results = { results: result ? result.rows : null };
      res.status(200).json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT || 5000, () => console.log(`Listening on ${PORT}`));
