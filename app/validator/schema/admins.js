const Joi = require('joi')
const { roles } = require('../custom')

const adminsSchema = Joi.object({
        name: Joi.string().min(3).max(25).required().custom(roles),
        userId: Joi.number().integer().required(),
        userPublisher: Joi.number().integer().required(),
})


module.exports = { adminsSchema }