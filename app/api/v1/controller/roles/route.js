const express = require('express')
const router = express()

const { create } = require('./controller')
const { rolesValidator } = require('../../../../validator/roles')

router.post('/roles', rolesValidator, create)

module.exports = router