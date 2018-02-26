const { Pool } = require("pg");

const pool = new Pool({
  user: "pi",
  host: "94.212.99.67",
  database: "deliver_dev",
  password: "raspberry",
  port: 5432
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
