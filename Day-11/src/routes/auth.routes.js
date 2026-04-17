const express = require('express')
const authController = require('../controllers/auth.controllers')
const authRouter = express.Router()

authRouter.post('/register',authController.RegisterController)

authRouter.post('/login',authController.LoginController)

module.exports = authRouter