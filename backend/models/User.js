const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    favorites:[       // array of restaurants
        {
            rest_name: String,
            rest_address: String,
            rest_style: String,
            rest_rating: String,
            rest_uri: String,
            rest_image: String
        }
    ]    

})

module.exports = mongoose.model("User", userSchema);