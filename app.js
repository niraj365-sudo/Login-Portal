const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/users");
const path = require("path");
const app = express();
const moongoose = require('mongoose')

PORT = process.env.PORT || 404;

//Database Config
const db = require('./config/keys').MongoURI;

//Database connection
moongoose.connect(db, {
  useNewUrlParser: true

}).then(()=>console.log("Connected to database.")).catch(err => console.log(err))

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//BodyParser
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))


//Routes
app.use("/", indexRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
