const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
    },
    backgroundColor: {
        type: String,
    },
    user: {
        type: String
    }

});

module.exports = Event = mongoose.model("event",eventSchema);