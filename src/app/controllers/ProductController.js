'use strict'

const Product = require('../models/Product')
const { validationResult } = require('express-validator')
const utils = require('../../utils')

const ProductController = {
  // Show index page
  index: async (req, res) => {
    console.log('===== Show index page =====')

    try {
      const products = await Product.find().limit(8)
      const customizes = await Product.find().limit(10)

      res.render('index', {
        view_content: 'index',
        title: 'Robin Furnita',
        products,
        customizes,
      })
    } catch (error) {
      console.log(error)
    }
  },

  // Show form create product
  formCreate: (req, res) => {
    console.log('====== Form create product =====')

    res.render('index', {
      view_content: 'products/admin/create',
      title: 'Create Product',
    })
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
          view_content: 'products/admin/create',
          title: 'Create Product',
          status: false,
          body: req.body,
          errors,
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
        view_content: 'products/admin/create',
        title: 'Create Product',
        status: true,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Get a product
  renderProduct: async (req, res) => {
    console.log('====== Render product detail =====')

    try {
      const id = req.params.id
      const product = await Product.findOne({ id })

      const categories = {
        Baskets: 'baskets',
        'Home decors': 'home-decors',
        'Kitchen ware': 'kitchen-ware',
        Lights: 'lights',
        Handbags: 'handbags',
      }

      const categoryName = categories[product.category]
      const item = utils.fillItemProduct(id)
      const urlItem = utils.fillUrl[item]

      return res.render('index', {
        view_content: 'products/details-product',
        url: `/product?category=${categoryName}`,
        title: product.title,
        urlItem,
        item,
        product,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Get a product
  getProduct: async (req, res) => {
    console.log('======  Get a product =====')

    try {
      const product = await Product.findOne({ id: req.params.id })

      return res.status(200).send(product)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Get category product data
  getCategoryProductData: async (req, res) => {
    console.log('====== Get category product data =====')

    try {
      const category = req.params.category
      let query = category === 'all' ? {} : { category }
      const products = await Product.find(query).limit(8)

      return res.status(200).send(products)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Render category products
  renderProductCategory: async (req, res) => {
    console.log('====== Render category products =====')

    try {
      const categoryParam = req.query.category
      const itemParam = req.query.item
      const categories = {
        baskets: 'Baskets',
        'home-decors': 'Home decors',
        'kitchen-ware': 'Kitchen ware',
        lights: 'Lights',
        handbags: 'Handbags',
      }
      const categoryName = categories[categoryParam] || 'All Products'
      const query = categoryParam ? { category: categoryName } : {}
      const item = utils.items[itemParam]

      if (itemParam) {
        query.id = { $regex: item, $options: 'i' }
      }

      const products = await Product.find(query).limit(12)

      return res.render('index', {
        view_content: 'products/products',
        url: `/product?category=${categoryName}`,
        category: categoryName,
        item: utils.fillItem[item],
        title: categoryName,
        products,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
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
