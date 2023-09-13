'use strict'

const express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')
const upload = require('../middleware/upload')

router.get('/', (req, res) => {
  res.render('index', { view_content: 'products', title: 'All Products' })
})

router.get('/details', ProductController.getAllProduct)

router
  .route('/create-product')
  .get(ProductController.formCreate)
  .post(upload.array('images', 4), ProductController.create)

module.exports = router
