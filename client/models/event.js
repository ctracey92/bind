const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = Event = mongoose.model("event",eventSchema);