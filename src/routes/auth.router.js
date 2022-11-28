const auth = require('express').Router()
const { login, register } = require('../controllers/auth.controllers')

auth.post('/login', login)
auth.post('/register', register)

module.exports = auth