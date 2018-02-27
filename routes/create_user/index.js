const db = require("../../db");

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
          db.query(
            "INSERT INTO users (front_name, last_name, email, password) values($1, $2, $3, $4)",
            [
              req.body.frontName,
              req.body.lastName,
              req.body.email,
              req.body.password
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
