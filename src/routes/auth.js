const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const AuthController = require('../app/controllers/AuthController')
const AuthValidator = require('../middlewares/validators/user.validator')
const ProductController = require('../app/controllers/ProductController')
const ArticlesController = require('../app/controllers/ArticlesController')

// Products
// router.route('/').get(auth.user, AuthController.getProductsList)
router.route('/').get(AuthController.getProductsList)
// router.route('/product').get(auth.user, AuthController.getProductsList)
router.route('/product').get(AuthController.getProductsList)
// router.route('/product/search').get(auth.user, AuthController.searchProduct)
router.route('/product/search').get(AuthController.searchProduct)

// Articles
router.route('/new').get(AuthController.articlesList)
router.route('/new/search').get(ArticlesController.search)

// Login
router
  .route('/login')
  .get(AuthController.login)
  .post(AuthValidator.login, AuthController.handleLogin)

module.exports = router
