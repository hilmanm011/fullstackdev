const Joi = require('@hapi/joi')

const registerValidation = (data)=>{
    const schema = Joi.object({
        fullname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data)
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation
}