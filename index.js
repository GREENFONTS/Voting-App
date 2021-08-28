const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv');
app.engine("handlebars", exhbs());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
dotenv.config();

// when you are using a fetch api or just ajax you need to add the line below for it to work
app.use(express.json());
// assuming you are sending from a form you need to add the line below for it work.
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", require("./routes"));

app.use(express.static("public"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});
