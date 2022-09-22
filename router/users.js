const express = require('express')
const router = express()

const { create } = require("../controller/users")

router.post('/users', create)

module.exports = router