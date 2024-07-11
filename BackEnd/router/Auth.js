const router = require('express').Router();
const AuthController = require('../controller/AuthController')
const middlewareController = require("../middleware/middlewareController")

router.post("/login", AuthController.loginUser)

router.post("/logout", middlewareController.verifyToken, AuthController.logoutUser)

router.post('/refresh-token', AuthController.requestRefeshToken)

module.exports = router
