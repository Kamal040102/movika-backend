const expressAsyncHandler = require("express-async-handler");
const User = require("../model/index")
const util = require("../../../../helper/util")

exports.signin = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    try {
        const userExist = await User.findOne({ email: data.email })

        if (userExist) {
            if (userExist.password === data.password) {
                const token = util.genJWT({
                    id: userExist._id,
                    email: userExist.email
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Login Success.",
                    responseData: {
                        userExist, token
                    }
                })
            } else {
                res.status(401).json({
                    responseCode: 0,
                    responseMessage: "Invalid Credentials."
                })
            }
        } else {
            res.status(401).json({
                responseCode: 0,
                responseMessage: "Invalid Credentials."
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

exports.signup = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    try {
        if (data.password !== data.confirmPassword) {
            res.status(409).json({
                responseCode: 0,
                responseMessage: "Password and Confirm Password doesn't match."
            })
        }
        else {
            delete data.confirmPassword;
            const newUser = await User.create(data)

            if (newUser) {
                res.status(201).json({
                    responseCode: 1,
                    responseMessage: "User signup success."
                })
            }
        }
    }
    catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})