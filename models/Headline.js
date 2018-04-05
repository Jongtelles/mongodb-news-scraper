const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HeadlineSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        unique: true
    },
    summary: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});
const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;