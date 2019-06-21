const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const users = require("./routes/api/users");
const routes = require("./routes");

const app = express();

const db = require("./config/keys").mongoURI;


// Use morgan logger for logging requests
app.use(logger("dev"));
// Define middleware here


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Fairly certain I will only be using the above or the below, but not both. 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
})
