'use strict'

const Product = require('../models/Product')
const { validationResult } = require('express-validator')
const utils = require('../../utils')
const pagination = require('../../utils/pagination')

const ProductController = {
  // Show index page
  index: async (req, res) => {
    console.log('===== Show index page =====')

    try {
      const products = await Product.aggregate([{ $sample: { size: 8 } }])
      const customizes = await Product.aggregate([{ $sample: { size: 10 } }])

      res.render('index', {
        view_content: 'index',
        title: 'Robin Furnita',
        products,
        customizes,
      })
    } catch (error) {
      console.error(error)
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

      const categoryName = utils.categories[product.category]
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
      const data = {
        products,
        pathCategory: utils.categories[category],
      }

      return res.status(200).send(data)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Render category products
  renderProductCategory: async (req, res) => {
    console.log('====== Render category products =====')

    try {
      const { query: querySearch, originalUrl } = req
      const { perPage, currentPage, offset } = pagination.config(12, querySearch.page)

      const { category, item } = req.query
      const categories = {
        baskets: 'Baskets',
        'home-decors': 'Home decors',
        'kitchen-ware': 'Kitchen ware',
        lights: 'Lights',
        handbags: 'Handbags',
      }
      const categoryName = categories[category] || 'All Products'
      const query = category ? { category: categoryName } : {}
      const itemFill = utils.items[item]

      if (itemFill) {
        query.id = { $regex: itemFill, $options: 'i' }
      }

      const products = await Product.find(query).limit(perPage).skip(offset)
      const total = await Product.countDocuments(query)
      const paginationResult = pagination.paginationCover(
        originalUrl,
        querySearch,
        total,
        perPage,
        currentPage
      )

      return res.render('index', {
        view_content: 'products/products',
        url: `/product?category=${categoryName}`,
        category: categoryName,
        item: utils.fillItem[itemFill],
        title: categoryName,
        pagination: paginationResult.html,
        products,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Form update the product
  formUpdate: async (req, res) => {
    console.log('====== ProductController.formUpdate =====')

    try {
      const id = req.params.id
      const data = await Product.findOne({ id: id })

      if (!data) {
        return res.status(404).send('Product not found')
      }

      return res.render('index', {
        view_content: 'products/admin/edit',
        title: 'Edit Product',
        data,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Update product
  update: async (req, res) => {
    console.log('====== ProductController.update =====')

    try {
      //Validation
      const { errors } = validationResult(req)
      const id = req.params.id

      if (errors.length > 0) {
        return res.render('index', {
          view_content: 'products/admin/edit',
          title: 'Edit Product',
          status: false,
          data: req.body,
          errors,
        })
      }

      const updateObject = {
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        material: req.body.material,
        size: req.body.size,
        description: req.body.description,
      }

      await Product.findOneAndUpdate({ id }, { $set: updateObject })

      updateObject._id = req.body._id

      return res.render('index', {
        view_content: 'products/admin/edit',
        title: 'Edit Product',
        data: updateObject,
        status: true,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: 'Server error' })
    }
  },

  // Update images product
  updateImg: async (req, res) => {
    console.log('====== ProductController.updateImg =====')

    try {
      const { id } = req.body
      const images = []

      for (const file of req.files) {
        const path = file.path.split('public')[1]
        images.push(path.replace(/\\/g, '/'))
      }

      await Product.findOneAndUpdate({ id }, { $set: { images } })

      return res.redirect('/admin')
    } catch (error) {
      return res.status(500).send({
        title: 'Update images',
        message: 'Update images fail',
        console: error.message,
      })
    }
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
