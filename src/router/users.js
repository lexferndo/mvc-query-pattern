const express = require('express')
const UsersController = require('../controller/users.js')
const router = express.Router()

router.get('/', UsersController.getAllUsers)
router.get('/pagination', UsersController.getUsersLimit)
router.get('/:id', UsersController.getUserbyID)
router.post('/', UsersController.createUser)
router.put('/:id', UsersController.updateUser)
router.delete('/:id', UsersController.deleteUser)

module.exports = router