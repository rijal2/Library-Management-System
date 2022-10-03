const validator = require('express-joi-validation').createValidator({})
const { rolesSchema } = require('./schema/roles')
const { usersSchema } = require('./schema/users')

const rolesValidator = validator.body(rolesSchema)
const usersValidator = validator.body(usersSchema)

module.exports = {
    rolesValidator,
    usersValidator
}