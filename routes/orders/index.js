const db = require("../../db");
const _ = require("lodash");
const Router = require("express-promise-router");

const router = new Router();

module.exports = router;

router.get("/api/orders", async (req, respond) => {
  const query = {
    text: "SELECT * FROM orders WHERE user_id = $1",
    values: [req.query.user_id]
  };
  var respondList = [];
  var orders = await db.query(query);

  for (var i = 0; i < orders.rowCount; i++) {
    order_items = await db.query(
      "SELECT * FROM order_items where order_id = $1",
      [orders.rows[i].order_id]
    );

    respondList.push({
      order: orders.rows[i],
      order_items: order_items.rows
    });
  }
  respond.json(respondList);
});
