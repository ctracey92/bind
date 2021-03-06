const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    twitter: {
        type: Object,
    },
    instagram: {
        type: Object
    }

});

module.exports = User = mongoose.model("users",userSchema);