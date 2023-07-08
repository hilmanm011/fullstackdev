const express = require('express')
const authRoutes = express.Router()
const { authRegister, authLogin } = require('../controllers/authControllers')

authRoutes.post('/register', authRegister)
authRoutes.post('/login', authLogin)

module.exports = authRoutes