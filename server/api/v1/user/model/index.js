const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    phone: { type: Number }
})

const User = mongoose.model("User", userSchema)

module.exports = User