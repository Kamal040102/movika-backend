const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    category: { type: String, enum: ['Business', 'Sports', 'Technology', 'Science', 'Entertainment', 'Health', 'General'] },
    published: { type: Boolean, default: false }
}, {
    timestamps: true
})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;