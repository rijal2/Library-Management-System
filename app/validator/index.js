const validator = require('express-joi-validation').createValidator({})
const { rolesSchema } = require('./schema/roles')
const { usersSchema } = require('./schema/users')
const { adminsSchema } = require('./schema/admins')

const rolesValidator = validator.body(rolesSchema)
const usersValidator = validator.body(usersSchema)
const adminsValidator = validator.body(adminsSchema)

module.exports = {
    rolesValidator,
    usersValidator,
    adminsValidator
}