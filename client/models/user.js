const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    username: String,


});

const User = mongoose.model("Book",userSchema);

module.exports = User;