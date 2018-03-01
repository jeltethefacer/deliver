Mollie = require("mollie-api-node");

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
        redirectUrl: "http://localhost:3000",
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

        /*
     * Send the customer off to complete the payment.
     */
        response.json(payment);
        return response.end();
      }
    );
  });
};
