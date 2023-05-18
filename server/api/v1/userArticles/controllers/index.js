const expressAsyncHandler = require("express-async-handler");
const User = require("../../user/model/index")

exports.indexAllUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("articles")

        if (user) {
            res.json({
                responseCode: 1,
                responseMessage: "User articles listed.",
                responseData: user
            })
        } else {
            res.status(404).json({
                responseCode: 0,
                responseMessage: "User not found."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})