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
        username: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        phone: Joi.number()
    })
}