const Joi = require('joi')
const { roles } = require('../custom')

const rolesSchema = Joi.object({
        name: Joi.string().min(3).max(25).required().custom(roles)
})


module.exports = { rolesSchema }