const { Pool } = require("pg");
const keys = require("../keys");

const pool = new Pool({
  user: keys.DB_USER,
  host: keys.DB_HOST,
  database: keys.DB_DB,
  password: keys.DB_PASSWORD,
  port: keys.DB_PORT
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
