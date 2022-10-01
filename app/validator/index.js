const { InvariantError } = require('../errors/exceptions/InvariantError')
const validator = require('express-joi-validation').createValidator({})
// const { rolesQuerySchema } = require('./roles')

// const rolesValidator = () => validator.body(rolesQuerySchema)

const UsersValidator = (payload) => validator.body(payload).
      
  
  

module.exports = {
    UsersValidator
}
