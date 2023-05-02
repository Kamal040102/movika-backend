const Joi = require("joi")
const jwt = require('jsonwebtoken')

exports.pick = function (object, keys) {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

exports.validate = (schema) => (req, res, next) => {
    const validSchema = this.pick(schema, ['params', 'query', 'body']);
    const object1 = this.pick(req, Object.keys(validSchema));
    var realData = Object.assign(object1);
    const { value, error } = Joi.compile(validSchema).validate(realData);
    if (error) {
        res.status(400).json({ responseCode: 0, responseMessage: error.message });
    } else {
        Object.assign(req, value);
        next();
    }
};

exports.genJWT = (payload, key) => {
    try {
        const token = jwt.sign(payload, key)
        return token
    }
    catch (err) {
        return err.message
    }
}

exports.genJWTForgetPassword = (payload, key) => {
    try{
        const token = jwt.sign(payload, key, {
            expiresIn:"10m"
        })
        return token
    }
    catch(err){
        return err.message
    }
}