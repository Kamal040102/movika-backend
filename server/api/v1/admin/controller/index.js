const Article = require("../../articles/model/index")
const User = require("../../user/model/index")
const expressAsyncHandler = require("express-async-handler")

exports.getArticles = expressAsyncHandler(async (req, res) => {
    try {
        const articles = await Article.find()

        return res.status(200).json({
            responseCode: 1,
            responseMessage: "All articles listed.",
            responseData: articles
        })
    }
    catch (err) {
        return res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})

exports.deleteArticles = expressAsyncHandler(async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndDelete(req.params.id)
        if (updatedArticle) {
            return res.status(200).json({
                responseCode: 1,
                responseMessage: "Article deleted successfully.",
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})

exports.updateArticles = expressAsyncHandler(async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (updatedArticle) {
            return res.status(200).json({
                responseCode: 1,
                responseMessage: "Details updated successfully.",
                responseData: updatedArticle
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})

exports.indexArticles = expressAsyncHandler(async (req, res) => {
    try {
        const updatedArticle = await Article.findById(req.params.id)
        if (updatedArticle) {
            return res.status(200).json({
                responseCode: 1,
                responseMessage: "Details updated successfully.",
                responseData: updatedArticle
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})