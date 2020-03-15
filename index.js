const dotenv = require('dotenv');
dotenv.config();
var express = require("express");
var app = express();
// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// const getUsers = (request, response) => {
//   pool.query("SELECT * FROM users", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

app.listen(3000, () => {
  app.get("/", (req, res) => {
    res.send("express is working");
  });

  // app.get("/users", getUsers);
});
