const db = require("../../db");

module.exports = function(app) {
  app.get("/api/items", (req, respond) => {
    db.query("SELECT * FROM products", (err, res) => {
      if (err) {
        return req.next(err);
      }
      if (res.rows[0]) {
        respond.json({ status: 200, items: res.rows });
      } else {
        respond.sendStatus(404);
      }
    });
  });
};
