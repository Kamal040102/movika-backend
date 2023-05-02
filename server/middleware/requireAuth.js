const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

exports.requireAuth = expressAsyncHandler(async (req, res, next) => {
    const auth = req.headers.authorization
    try {
        if (auth && auth.startsWith("Bearer")) {
            const token = auth.split(" ")[1]

            const data = jwt.verify(token, process.env.JWT_SECRET)

            if (data.id) {
                req.id = data.id
                next()
            }
        } else {
            res.status(401).json({
                responseCode: 0,
                responseMessage: "Not Authorized"
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