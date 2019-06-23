const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    domain: {
        type: String,
    },
    uid: {
        type: String,
    },
    tokens: {
        type: Array,
    }

});

module.exports = Account = mongoose.model("account",accountSchema);