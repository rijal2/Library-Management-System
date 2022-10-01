const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { roles } = require('./custom')

const rolesSchema = Joi.object({
        name: Joi.string().min(3).max(25).required().custom(roles)
})


const rolesValidator = validator.body(rolesSchema)

module.exports = { rolesValidator }