'use strict'

const Product = require('../models/Product')
const { validationResult } = require('express-validator')

const ProductController = {
  // Show index page
  index: async (req, res) => {
    console.log('===== Show index page =====')

    try {
      const products = await Product.find().limit(8)
      const customizes = await Product.find().limit(10)
      res.render('index', { view_content: 'index', title: 'Robin Furnita', products, customizes })
    } catch (error) {
      console.log(error)
    }
  },

  // Show form create product
  formCreate: (req, res) => {
    console.log('====== Form create product =====')
    res.render('index', { view_content: 'products/create-product', title: 'Create Product' })
  },

  // Create product
  create: async (req, res) => {
    console.log('====== Create product =====')

    try {
      //Validation
      const { errors } = validationResult(req)
      const images = []

      if (errors.length > 0) {
        return res.render('index', {
          view_content: 'products/create-product',
          title: 'Create Product',
          status: false,
          errors,
          body: req.body,
        })
      }

      for (const file of req.files) {
        const path = file.path.split('public')[1]
        images.push(path.replace(/\\/g, '/'))
      }

      const product = new Product({
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        material: req.body.material,
        size: req.body.size,
        images,
        description: req.body.description,
      })

      await product.save()

      return res.render('index', {
        view_content: 'products/create-product',
        title: 'Create Product',
        status: true,
      })
    } catch (error) {
      console.log(error)
    }
  },

  // Get a product
  renderProduct: async (req, res) => {
    console.log('====== Render product detail =====')

    try {
      const id = req.params.id
      const product = await Product.findOne({ id })

      return res.render('index', {
        view_content: 'products/details-product',
        title: product.title,
        url: '/product/baskets',
        product,
      })
    } catch (error) {
      console.log(error)
    }
  },

  // Get a product
  getProduct: async (req, res) => {
    console.log('======  Get a product =====')

    try {
      const id = req.params.id
      const product = await Product.findOne({ id })
      return res.status(200).send(product)
    } catch (error) {
      console.log(error)
    }
  },

  // Get list product
  getAllProduct: async (req, res) => {
    console.log('====== Get all product =====')

    try {
      const category = req.params.category
      if (category === 'all') {
        const products = await Product.find().limit(8)
        return res.status(200).send(products)
      } else {
        const products = await Product.find({ category }).limit(8)
        return res.status(200).send(products)
      }
    } catch (error) {
      console.log(error)
    }
  },

  // Update product
  update: (req, res) => {
    console.log('====== Update product =====')

    const id = req.params.productId
    const updateObject = req.body
    Product.update({ id: id }, { $set: updateObject })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Product is updated',
          updateProduct: updateObject,
        })
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
        })
      })
  },

  // Delete a product
  delete: (req, res) => {
    console.log('====== Delete a product =====')

    const id = req.params.productId
    Product.findByIdAndRemove(id)
      .exec()
      .then(() =>
        res.status(204).json({
          success: true,
        })
      )
      .catch((err) =>
        res.status(500).json({
          success: false,
        })
      )
  },
}

module.exports = ProductController
