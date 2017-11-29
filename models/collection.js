var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

//SCHEMA SETUP
var collectionSchema = new mongoose.Schema({
    name: String,
    paintings: [
        {
            img: String,
            description: String,
            parent: String
        }
    ]
})

module.exports = mongoose.model("Collection", collectionSchema);