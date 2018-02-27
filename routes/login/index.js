const db = require("../../db");

module.exports = function(app) {
  app.post("/api/login", (req, respond) => {
    db.query(
      "SELECT * FROM users WHERE email = $1 and password = $2",
      [req.body.email, req.body.password],
      (err, res) => {
        if (err) {
          return req.next(err);
        }
        if (res.rows[0]) {
          req.session.user = res.rows[0];
          respond.json(res.rows[0]);
        } else {
          respond.sendStatus(401);
        }
      }
    );
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });
  app.get("/api/user", (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.sendStatus(400);
    }
  });
};
