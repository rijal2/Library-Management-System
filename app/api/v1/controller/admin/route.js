const express = require('express')
const router = express()

const { create, destroy } = require('./controller')
const { adminsValidator } = require('../../../../validator')

router.post('/admin', create)
router.delete('/admin', destroy)

module.exports = router