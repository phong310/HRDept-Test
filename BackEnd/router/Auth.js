const router = require('express').Router();
const AuthController = require('../controller/AuthController')

router.post("/login", AuthController.loginUser)

router.post("/logout", AuthController.logoutUser)

router.post('/refresh-token', AuthController.requestRefeshToken)

module.exports = router
