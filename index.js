const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/orders/get", (req, res) => {
  res.json(["dik", "fat", "jip"]);

  console.log(`send orders`);
});

app.get("/test", (req, res) => {
  const { Pool, Client } = require("pg");

  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "root",
    port: 5432
  });

  pool.query("SELECT * FROM users", (err, res) => {
    console.log(err, res);
    pool.end();
  });

  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "root",
    port: 5432
  });
  client.connect();

  client.query("SELECT * FROM users", (err, res) => {
    console.log(err, res);
    client.end();
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
