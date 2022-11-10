const express = require('express')
const router = express()

const { create, destroy } = require('./controller')
const { adminsValidator } = require('../../../../validator')
const { authenticatedUser, authorizeRoles } = require('../../../../errors/middlewares/auth')

router.post('/admin', authenticatedUser, authorizeRoles(2), create)
router.delete('/admin', destroy)

module.exports = router