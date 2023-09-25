'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const ProductController = require('../app/controllers/ProductController')
const ProductValidator = require('../middlewares/validators/product.validator')
const upload = require('../middlewares/upload')

router.get('/', ProductController.renderProductCategory)
router.get('/details/:id', ProductController.renderProduct)
router.get('/quick-view/:id', ProductController.getProduct)
router.get('/get-data-category/:category', ProductController.getCategoryProductData)

router
  .route('/create')
  .get(auth.user, ProductController.formCreate)
  .post([upload.array('images', 5), auth.user, ProductValidator.create], ProductController.create)

router
  .route('/edit/:id')
  .get(auth.user, ProductController.formUpdate)
  .post([auth.user, ProductValidator.update], ProductController.update)

router
  .route('/update-img')
  .post([upload.array('images', 5), auth.user], ProductController.updateImg)

module.exports = router
