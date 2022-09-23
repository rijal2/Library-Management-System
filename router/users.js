const express = require('express')
const router = express()

const { create, index } = require("../controller/users")

router.post('/users', create)
router.get('/users', index)

module.exports = router