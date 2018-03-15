const db = require("../../db");
const hashing = require("../../hashing");

module.exports = function(app) {
  app.post("/api/login", (req, respond) => {
    db.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email],
      (err, res) => {
        if (err) {
          return req.next(err);
        }
        if (res.rows[0]) {
          var tempHash = hashing.checking(req.body.password, res.rows[0].salt);
          if (tempHash.passwordHash == res.rows[0].hash) {
            req.session.user = res.rows[0];
            respond.json(res.rows[0]);
          } else {
            respond.sendStatus(401);
          }
        } else {
          respond.sendStatus(401);
        }
      }
    );
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });
  app.get("/api/user", (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.sendStatus(400);
    }
  });
};
