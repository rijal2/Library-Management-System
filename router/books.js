const express = require('express')
const router = express()

const { create, index } = require('../controller/book')

router.post('/books', create)
router.get('/books', index)

module.exports = router