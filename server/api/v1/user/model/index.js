const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, min: 8 },
    phone: { type: Number },
    dob:{type:String}
})

const User = mongoose.model("User", userSchema)

module.exports = User