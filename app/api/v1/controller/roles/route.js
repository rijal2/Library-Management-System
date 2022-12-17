const express = require('express')
const router = express()

const { create, index, find, destroy, update } = require('./controller')
const { rolesValidator } = require('../../../../validator')
const { authenticatedUser, authorizeRoles } = require('../../../../errors/middlewares/auth')

// router.post('/roles', rolesValidator, authenticatedUser, authorizeRoles("owner"), create)
// router.get('/roles', authenticatedUser, authorizeRoles(1), index)
// router.get('/roles/:id', authenticatedUser, authorizeRoles("owner"), find)
// router.delete('/roles/:id', authenticatedUser, authorizeRoles("owner"), destroy)
// router.put('/roles/:id', authenticatedUser, authorizeRoles("owner"), update)

router.post('/roles', create)
router.get('/roles', index)
router.get('/roles/:id', find)
router.delete('/roles/:id', destroy)
router.put('/roles/:id', update)
module.exports = router