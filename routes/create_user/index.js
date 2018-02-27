const db = require("../../db");
const hashing = require("../../hashing");

module.exports = function(app) {
  app.post("/api/register", (req, respond) => {
    db.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email],
      (err, res) => {
        if (err) {
          return req.next(err);
        }
        if (res.rows[0]) {
          respond.sendStatus(401);
        } else {
          hashed = hashing.hashing(req.body.password);
          db.query(
            "INSERT INTO users (front_name, last_name, email, salt, hash) values($1, $2, $3, $4, $5)",
            [
              req.body.frontName,
              req.body.lastName,
              req.body.email,
              hashed.salt,
              hashed.hash
            ],
            (err, res) => {
              if (err) {
                return req.next(err);
              } else {
                respond.sendStatus(200);
              }
            }
          );
        }
      }
    );
  });
};
