'use strict'

const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const ProductValidator = require('../middlewares/validators/product.validator')
const upload = require('../middlewares/upload')

router.get('/', ProductController.renderProductCategory)
router.get('/details/:id', ProductController.renderProduct)
router.get('/quick-view/:id', ProductController.getProduct)
router.get('/get-data-category/:category', ProductController.getCategoryProductData)

router
  .route('/create-product')
  .get(ProductController.formCreate)
  .post([upload.array('images', 4), ProductValidator.create], ProductController.create)

module.exports = router
