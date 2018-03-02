const db = require("../../db");

module.exports = function(app) {
  app.get("/api/orders", (req, respond) => {
    const query = {
      text: "SELECT * FROM orders WHERE user_id = $1",
      values: [req.query.user_id]
    };

    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        respond.json(res.rows);
      }
    });
  });
};
