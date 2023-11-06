'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const ProductController = require('../app/controllers/ProductController')
const ProductValidator = require('../middlewares/validators/product.validator')

router.get('/', ProductController.displayProductCategory)
router.get('/details/:id', ProductController.displayProduct)
router.get('/quick-view/:id', ProductController.fetchProduct)
router.get('/get-data-category/:category', ProductController.fetchCategoryProductData)

// Create Product
router
  .route('/create')
  .get(ProductController.displayCreateForm)
  .post([ProductValidator.create], ProductController.createProduct)

// Update Product
router
  .route('/edit/:id')
  .get(ProductController.displayUpdateForm)
  .post([ProductValidator.update], ProductController.updateProduct)

// Update images
router.route('/update-img').post(ProductController.updateProductImages)

// Delete Product
router.delete('/delete/:id', ProductController.deleteProduct)

module.exports = router
