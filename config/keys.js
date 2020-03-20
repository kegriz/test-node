if (process.env.ENV === "production") {
  module.exports = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
} else {
  module.exports = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  };
}
