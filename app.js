const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/users");
const path = require("path");
const app = express();
const moongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session');
const { nextTick } = require("process");
// const passport = require("./config/passport");
const passport = require('passport')

PORT = process.env.PORT || 404;

//Passport Configuration
require('./config/passport')(passport);

//Database Config
const db = require('./config/keys').MongoURI;

//Database connection
moongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true

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

console.log(new Date);

//Express Session
app.use(session({
    secret: 'Niraj',
    resave: true,
    saveUninitialized: true,
    // cookie: {secure: true}

}))
 
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Variables
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//Routes
app.use("/", indexRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
