const express = require('express')
const router = express()

const { createUser } = require('./controller')
const { usersValidator } = require('../../../../validator')

router.post('/users', usersValidator, createUser)

module.exports = router
