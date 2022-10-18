const express = require('express')
const router =express()

const { signinApp } = require('./controller')

router.post('/auth/signin', signinApp)

module.exports = router