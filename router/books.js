const express = require('express')
const router = express()

const { create, index, find } = require('../controller/book')

router.post('/books', create)
router.get('/books', index)
router.get('/books/:id', find)

module.exports = router