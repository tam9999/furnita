'use strict'

const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const upload = require('../middlewares/upload')
const ProductValidator = require('../middlewares/validators/product.validator')

router.get('/', (req, res) => {
  res.render('index', { view_content: 'products/index', title: 'All Products' })
})

router.get('/details', ProductController.getProduct)

router
  .route('/create-product')
  .get(ProductController.formCreate)
  .post([upload.array('images', 4), ProductValidator.create], ProductController.create)

module.exports = router
