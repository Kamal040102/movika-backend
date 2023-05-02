const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    category: { type: String, enum: ['Business', 'Sports', 'Technology', 'Science', 'Entertainment', 'Health'] }
}, {
    timestamps: true
})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;