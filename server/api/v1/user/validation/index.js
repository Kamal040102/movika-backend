const Joi = require("joi");

exports.signin = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required().min(8)
    })
}

exports.signup = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        phone: Joi.number(),
        dob:Joi.string()
    })
}

exports.forgetPassword = {
    body: Joi.object().keys({
        email:Joi.string().required().email()
    })
}

exports.resetPassword = {
    body: Joi.object().keys({
        password: Joi.string().required().min(8),
        confirmPassword: Joi.string().required().min(8)
    })
}

exports.update = {
    body: Joi.object().keys({
        email: Joi.string(),
        name: Joi.string(),
        password: Joi.string(),
        phone: Joi.number(),
        dob:Joi.string(),
        favourites: Joi.array()
    })
}