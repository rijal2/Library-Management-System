const express = require('express')
const router = express()

const { create } = require('./controller')

router.post('/roles', create)

module.exports = router