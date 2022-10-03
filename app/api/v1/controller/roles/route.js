const express = require('express')
const router = express()

const { create, index, find, destroy, update } = require('./controller')
const { rolesValidator } = require('../../../../validator')

router.post('/roles', rolesValidator, create)
router.get('/roles', index)
router.get('/roles/:id', find)
router.delete('/roles/:id', destroy)
router.put('/roles/:id', update)

module.exports = router