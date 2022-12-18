const express = require('express')
const router = express()

const { createPublisherByOwner, changeStatusUsers, index, find, updateUser, destroy } = require('./controller')
const { usersValidator } = require('../../../../validator')

// router.post('/users', usersValidator, createPublisherByOwner)
router.post('/users/publisher', createPublisherByOwner)
router.put('/users/publisher/:id/:status', changeStatusUsers)
router.get('/users', index)
router.get('/users/:id', find)
router.put('/users/:id', updateUser)
router.delete('/users/:id', destroy)

module.exports = router
