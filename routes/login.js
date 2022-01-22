const express = require('express')
const router = express.Router()
const loginControllers = require('../controllers/login')
const authorize = require('../authorize')

router.post(
    '/api/v1/register',
    loginControllers.register
)

router.post(
    '/api/v1/login',
    loginControllers.login
)

router.get(
    '/secret',
    authorize,
    loginControllers.secret
)

module.exports = router