'use strict'

const Product = require('../models/Product')
const { validationResult } = require('express-validator')

const ProductController = {
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
  getProduct: async (req, res) => {
    console.log('======  Get product =====')

    try {
      const product = await Product.findOne({ id: 'BA-L-01' })

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

  // Get list product
  getAllProduct: (req, res) => {
    console.log('====== Get all product =====')

    Product.find()
      .select()
      .then((allProduct) => {
        return res.status(200).json({
          success: true,
          message: 'A list of all product',
          Products: allProduct,
        })
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: err.message,
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
