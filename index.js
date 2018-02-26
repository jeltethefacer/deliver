const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./db");

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret:
      "jemoederisaandepoederenjevaderaandespuitlekkerhoorgewerkisnietnodig",
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: "auto" },
    proxy: true,
    resave: true,
    saveUninitialized: false
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
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

app.get("/", function(req, res, next) {
  if (req.session.user) {
    res.setHeader("Content-Type", "text/html");
    res.write("<p>user: " + req.session.user.front_name + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<form action='/api/login' method='post'><input type='text' name='email'></input> <input type='text' name='password'></input><input type='submit' value='Submit'></form>"
    );
    res.end();
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
