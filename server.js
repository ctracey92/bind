const express = require("express");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const routes = require("./routes");
const session = require('express-session');

const app = express();

const db = require("./config/keys").mongoURI;

const cors = require("cors")

app.options('*', cors())

let corsOptions = {
  origin: ["http://127.0.0.1:3000/twitter","http://127.0.0.1:3000/"],
  credentials: true,
  methods: 'GET,HEAD,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


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
app.use(session({ secret: 'tryandcrackthis', resave: true,saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Passport Config
require("./config/passport")(passport);

app.use(routes);


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
})
