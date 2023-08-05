const express = require('express')
const authController = require('../controller/auth.js')
const router = express.Router()

router.post('/register', authController.newRegist)
router.post('/login', authController.loginUser)

module.exports = router