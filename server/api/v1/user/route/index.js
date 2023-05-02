const userRouter = require("express").Router();
const util = require("../../../../helper/util")
const validation = require("../validation/index")
const user = require("../controller/index")

userRouter.post("/signin", util.validate(validation.signin), user.signin)
userRouter.post("/signup", util.validate(validation.signup), user.signup)
userRouter.post("/forgetPassword", util.validate(validation.forgetPassword), user.forgetPassword)

module.exports = userRouter;