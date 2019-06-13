const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");

//Require all of the models
const db = require("./client/models/");


// Use morgan logger for logging requests
app.use(logger("dev"));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bind";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Define API routes here

app.get("/api/books", (req,res) => {
  db.Book.find({},(err,data)=>{
    // console.log(data)
    if(err){console.log("Error getting saved books: ", err)}
  })
})

app.post("/api/books/post",(req,res) =>{
  console.log("the route is hit****")
  db.Book.create(req.body)
  .catch((err)=>{res.json(err)})
})

app.delete("/api/books/:id",(req,res)=>{
  db.Book.deleteOne({_id: req.params.id}).then((err,data)=>{
    if(err){res.json(err)};
  })
})

// Send every other request to the React app
// If no API routes are hit, send the React app

// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
})
