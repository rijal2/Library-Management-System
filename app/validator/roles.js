const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const rolesQuerySchema = Joi.object({
    name: Joi.string().max(25).min(3).required()
})

const rolesValidator = validator.body(rolesQuerySchema)

module.exports = { rolesValidator }