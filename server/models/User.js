const mongoose = require('mongoose');

const User = mongoose.model(
    "users",
    new mongoose.Schema(
        {
            username: {type:String, minlength: 4, unique: true, required: true},
            password: {type:String, minlength: 8, required: true}
        }
    )
)

module.exports = User;