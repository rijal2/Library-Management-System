const express = require('express')
const router = express()

const { createUser, index, find, updateUser, destroy } = require('./controller')
const { usersValidator } = require('../../../../validator')

router.post('/users', usersValidator, createUser)
router.get('/users', index)
router.get('/users/:id', find)
router.put('/users/:id', updateUser)
router.delete('/users/:id', destroy)

module.exports = router
