var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

//SCHEMA SETUP
var infopageSchema = new mongoose.Schema({
    page: String,
    text: String,
    img: String,
    desc: String
})

module.exports = mongoose.model("Info", infopageSchema);