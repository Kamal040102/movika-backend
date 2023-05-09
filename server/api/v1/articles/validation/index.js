const Joi = require("joi");

exports.create = {
    body: Joi.object().keys({
        heading: Joi.string().required(),
        description: Joi.string().required(),
        imgUrl: Joi.string(),
        category: Joi.string().valid('Business', 'Sports', 'Technology', 'Science', 'Entertainment', 'Health', 'General')
    })
}

exports.update = {
    body: Joi.object().keys({
        heading: Joi.string(),
        description: Joi.string(),
        imgUrl: Joi.string(),
        category: Joi.string().valid('Business', 'Sports', 'Technology', 'Science', 'Entertainment', 'Health', 'General')
    })
}