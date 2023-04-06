const mongoose = require("mongoose");

const bandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    infoText: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
}, { collection: "bands" });

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;