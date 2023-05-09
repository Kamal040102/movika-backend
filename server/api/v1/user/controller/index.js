const expressAsyncHandler = require("express-async-handler");
const User = require("../model/index")
const util = require("../../../../helper/util");
const { sendMailOnSignup, sendMailOnForgetPassword } = require("../../../../helper/mailer");

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
                sendMailOnSignup(data.email)
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

exports.forgetPassword = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    try {
        const userExist = await User.findOne({ email: data.email });
        if (userExist) {
            const url = `http://localhost:3000/resetPassword/${util.genJWTForgetPassword({ _id: userExist._id }, process.env.JWT_SECRET)}`

            sendMailOnForgetPassword(data.email, url)

            res.json({
                responseCode: 1,
                responseMessage: "Forget Password mail has been sent successfully"
            })
        }
        else {
            res.status(404).json({
                responseCode: 0,
                responseMessage: "User Not Found",
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

exports.resetPassword = expressAsyncHandler(async (req, res) => {
    const { resettoken } = req.headers;
    const { password, confirmPassword } = req.body;

    console.log(req.headers);

    try {
        if (!resettoken) {
            res.status(401).json({
                responseCode: 0,
                responseMessage: "User is unauthorized"
            })
        } else {
            if (password !== confirmPassword) {
                res.status(407).json({
                    responseCode: 0,
                    responseMessage: "Password and Confirm Password should match."
                })
            } else {
                const userData = util.verifyJwt(resettoken, process.env.JWT_SECRET)

                const userExist = await User.findByIdAndUpdate(userData._id, {
                    password
                })

                res.json({
                    responseCode: 0,
                    responseMessage: "Password Changed Successfully."
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

exports.updateUser = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, data, { new: true })

        if (user) {
            res.json({ responseCode: 1, responseMessage: "User details updated.", responseData: user })
        } else {
            res.status(404).json({
                responseCode: 0, responseMessage: "User not found."
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

exports.index = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("favourites");

        if (user) {
            res.json({ responseCode: 1, responseMessage: "User details listed.", responseData: user })
        } else {
            res.status(404).json({
                responseCode: 0, responseMessage: "User not found."
            })
        }
    } catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})