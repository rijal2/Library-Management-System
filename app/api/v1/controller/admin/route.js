const express = require('express')
const router = express()

const { create, destroy, index } = require('./controller')
const { adminsValidator } = require('../../../../validator')
const { authenticatedUser, authorizeRoles } = require('../../../../errors/middlewares/auth')

router.post('/admin', authenticatedUser, authorizeRoles(2), create)
router.delete('/admin', destroy)
router.get('/admin', authenticatedUser, authorizeRoles(1, 2), index)

module.exports = router