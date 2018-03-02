Mollie = require("mollie-api-node");
const db = require("../../db");

mollie = new Mollie.API.Client();
mollie.setApiKey("test_rrbWURFKrKSVwQ9W94f5aqfBMtecrx");

module.exports = function(app) {
  app.get("/api/issuers", (req, res) => {
    issuers = mollie.issuers.all(function(issuers) {
      var issuerList = [];
      for (_i = 0, _len = issuers.length; _i < _len; _i++) {
        issuerList.push(issuers[_i]);
      }
      res.json(issuerList);
    });
  });

  app.get("/api/payments", (req, res) => {
    issuers = mollie.payments.all(function(payments) {
      res.json(payments);
    });
  });

  app.post("/api/payment", (req, response) => {
    mollie.payments.create(
      {
        amount: req.body.amount,
        description: "My first payment",
        redirectUrl: "https://morning-journey-18064.herokuapp.com/",
        webhookUrl: "https://webshop.example.org/payments/webhook/",
        method: "ideal",
        issuer: req.body.issuer,
        metadata: {
          orderId: "12345"
        }
      },
      function(payment) {
        if (payment.error) {
          console.error(payment.error);
          return response.end();
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        //create the order in the orders db
        db.query(
          "INSERT INTO orders(user_id, payment_id, totalprice, code, delivery_date) values($1, $2, $3, $4, $5)",
          [
            req.body.user_id,
            payment.id,
            req.body.amount,
            Math.random()
              .toString(36)
              .substring(7),
            yyyy + "-" + mm + "-" + dd
          ],
          (err, res) => {
            if (err) {
              console.log(err);
            }
          }
        );

        const query = {
          text: "SELECT order_id FROM orders WHERE payment_id = $1",
          values: [payment.id]
        };

        db.query(query, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            var basketLength = req.body.basket.length;
            for (var i = 0; i < basketLength; i++) {
              db.query(
                "INSERT INTO order_items(order_id, product_id, amount) values($1, $2, $3)",
                [
                  res.rows[0].order_id,
                  req.body.basket[i].id,
                  req.body.basket[i].amount
                ],
                (err, res2) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          }
        });
        /*
     * Send the customer off to complete the payment.
     */
        response.json(payment);
        return response.end();
      }
    );
  });
};
