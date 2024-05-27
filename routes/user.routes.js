const express = require('express')
const router = express.Router()

const controller = require('../controllers/user.controller')
const auth = require('../middleware/auth')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.delete('/delete/:email', auth, controller.deleteUser)

module.exports = router