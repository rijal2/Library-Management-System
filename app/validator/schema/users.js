const Joi = require('joi')
const { roles } = require('../custom')

const usersSchema = Joi.object({
        name: Joi.string().min(3).max(25).required().custom(roles),
        email: Joi.string().min(3).max(25).required(),
        hashPassword: Joi.string().min(3).max(25).required(),
        roleId: Joi.number().integer().required(),
        status: Joi.boolean(),
        otp: Joi.number().integer()
})


module.exports = { usersSchema }