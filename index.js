const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv');
const session = require("express-session");
app.engine("handlebars", exhbs());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
dotenv.config();

// when you are using a fetch api or just ajax you need to add the line below for it to work
app.use(express.json());
// assuming you are sending from a form you need to add the line below for it work.
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
    cookie: { maxAge: 600000 }
  })
);

app.use("/admin", require("./routes/admin"));
app.use("/voting", require("./routes/voting"));

app.use(express.static("public"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});
