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

// Put all login login in the login routes folder
require("./routes/login")(app);
require("./routes/create_user")(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
