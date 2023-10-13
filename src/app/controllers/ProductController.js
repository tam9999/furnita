'use strict'

const fs = require('fs')
const path = require('path')
const Product = require('../models/Product')
const { validationResult } = require('express-validator')
const utils = require('../../utils')
const pagination = require('../../utils/pagination')
const upload = require('../../utils/upload')

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

      if (errors.length) {
        return res.status(400).send({
          title: 'Create Product',
          message: 'Create product fail',
          errors: errors,
        })
      }

      const images = await upload(req, res)
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

      return res.status(200).send({
        title: 'Create Product',
        message: 'Create Product Success!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({
        title: 'Create Product',
        message: 'Create product fail',
        console: error.message,
      })
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
      const products = await await Product.aggregate([
        {
          $match: {
            category: product.category,
            // id: { $regex: itemFill, $options: 'i' },
          },
        },
        { $sample: { size: 8 } },
      ])

      return res.render('index', {
        view_content: 'products/details-product',
        url: `/product?category=${categoryName}`,
        title: product.title,
        urlItem,
        item,
        product,
        products,
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
        return res.status(400).send({
          title: 'Update Product',
          message: 'Update product fail',
          errors: errors,
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

      return res.status(200).send({
        title: 'Update Product',
        message: 'Update Product Success!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({
        title: 'Update Product',
        message: 'Update product fail',
        console: error.message,
      })
    }
  },

  // Update images product
  updateImg: async (req, res) => {
    console.log('====== ProductController.updateImg =====')

    try {
      const { id } = req.body
      const images = await upload(req, res)

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
  delete: async (req, res) => {
    console.log('====== ProductController.detele =====')

    try {
      const id = req.params.id
      let pathFolder

      await Product.findOneAndRemove({ id })

      for (const key in utils.paths) {
        if (id.includes(key)) {
          pathFolder = `../../public/img/products/${utils.paths[key]}/${id}`
        }
      }

      fs.rmdir(path.join(__dirname, pathFolder), { recursive: true, force: true }, (err) => {
        if (err) {
          console.log('Error occurred in deleting directory', err)
        }
      })

      return res.status(200).send({
        title: 'Delete',
        message: 'Delete product success!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        title: 'Delete',
        message: 'Delete product fail!',
        console: error.message,
      })
    }
  },
}

module.exports = ProductController
