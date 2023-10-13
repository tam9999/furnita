'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const ProductController = require('../app/controllers/ProductController')
const ProductValidator = require('../middlewares/validators/product.validator')

router.get('/', ProductController.renderProductCategory)
router.get('/details/:id', ProductController.renderProduct)
router.get('/quick-view/:id', ProductController.getProduct)
router.get('/get-data-category/:category', ProductController.getCategoryProductData)

// Create Product
router
  .route('/create')
  .get(ProductController.formCreate)
  .post([ProductValidator.create], ProductController.create)

// Update Product
router
  .route('/edit/:id')
  .get(ProductController.formUpdate)
  .post([ProductValidator.update], ProductController.update)

// Update images
router.route('/update-img').post(ProductController.updateImg)

// Delete Product
router.delete('/delete/:id', ProductController.delete)

module.exports = router
