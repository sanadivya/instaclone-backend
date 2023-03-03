const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    image_file: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
},{timestamps:true})

module.exports = { User: mongoose.model("Instauser", Userschema), database: "Mongodb" }