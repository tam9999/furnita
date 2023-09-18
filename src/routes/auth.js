const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const AuthController = require('../app/controllers/AuthController')
const ProductController = require('../app/controllers/ProductController')
const AuthValidator = require('../middlewares/validators/user.validator')

router.route('/').get(auth.user, AuthController.getProductsList)
router.route('/product').get(auth.user, AuthController.getProductsList)

router
  .route('/login')
  .get(AuthController.login)
  .post(AuthValidator.login, AuthController.handleLogin)

module.exports = router
