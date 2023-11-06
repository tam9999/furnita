'use strict'

const fs = require('fs')
const path = require('path')
const ProductModel = require('../models/Product')
const { validationResult } = require('express-validator')
const utilityFunctions = require('../../utils')
const paginationUtility = require('../../utils/pagination')
const uploadUtility = require('../../utils/upload')

const ProductController = {
  // Display index page
  displayIndex: async (req, res) => {
    console.log('===== Display index page =====')

    try {
      const products = (await ProductModel.aggregate([{ $sample: { size: 8 } }])).map((doc) =>
        ProductModel.hydrate(doc)
      )

      const customProducts = (await ProductModel.aggregate([{ $sample: { size: 10 } }])).map(
        (doc) => ProductModel.hydrate(doc)
      )

      res.render('index', {
        view_content: 'index',
        title: 'Robin Furnita',
        products,
        customProducts,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Display about page
  displayAbout: async (req, res) => {
    res.render('index', { view_content: 'about', title: 'About Us' })
  },

  // Display contact page
  displayContact: async (req, res) => {
    res.render('index', { view_content: 'contact', title: 'Contact Us' })
  },

  // Display catalogue page
  displayCatalogue: async (req, res) => {
    res.render('index', { view_content: 'catalogue', title: 'Catalogue' })
  },

  // Display get quotations page
  displayGetQuotation: async (req, res) => {
    const listGetQuotations = JSON.parse(req.cookies['add-to-cart'])
    let products = []

    for (const id of listGetQuotations) {
      const result = await ProductModel.findOne({ id })
      products.push(result)
    }

    res.render('index', { view_content: 'get-quotation', title: 'Get Quotations', products })
  },

  // Display product creation form
  displayCreateForm: (req, res) => {
    console.log('====== Display product creation form =====')

    res.render('index', {
      view_content: 'products/create',
      title: 'Create Product',
    })
  },

  // Create a new product
  createProduct: async (req, res) => {
    console.log('====== Create a new product =====')

    try {
      //Validation
      const { errors } = validationResult(req)

      if (errors.length) {
        return res.status(400).send({
          title: 'Create Product',
          message: 'Product creation failed',
          errors: errors,
        })
      }

      const images = await uploadUtility(req, res)
      const price = req.body.price.split(',')
      const newProduct = new ProductModel({
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        subcategory: req.body.subcategory,
        material: req.body.material,
        size: req.body.size,
        price,
        images,
        description: req.body.description,
      })

      await newProduct.save()

      return res.status(200).send({
        title: 'Create Product',
        message: 'Product creation successful!',
      })
    } catch (error) {
      const dir = `../../public/img/products/${req.body.id}`
      const product = await ProductModel.find({ id: req.body.id })

      if (!product.length) {
        fs.rmdir(path.join(__dirname, dir), { recursive: true, force: true }, (err) => {
          if (err) {
            console.log('Error occurred in deleting directory', err)
          }
        })
      }

      return res.status(500).send({
        title: 'Create Product',
        message: 'Product creation failed',
        console: error.message,
      })
    }
  },

  // Display product update form
  displayUpdateForm: async (req, res) => {
    console.log('====== Display product update form =====')

    try {
      const id = req.params.id
      const productData = await ProductModel.findOne({ id })

      if (!productData) {
        return res.status(404).send('Product not found')
      }

      return res.render('index', {
        view_content: 'products/edit',
        title: 'Edit Product',
        productData,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    console.log('====== Update a product =====')

    try {
      //Validation
      const { errors } = validationResult(req)
      const id = req.params.id
      const price = req.body.price.split(',')

      if (errors.length > 0) {
        return res.status(400).send({
          title: 'Update Product',
          message: 'Product update failed',
          errors: errors,
        })
      }

      const updateData = {
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        subcategory: req.body.subcategory,
        material: req.body.material,
        size: req.body.size,
        price,
        description: req.body.description,
      }

      await ProductModel.findOneAndUpdate({ id }, { $set: updateData })

      return res.status(200).send({
        title: 'Update Product',
        message: 'Product update successful!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({
        title: 'Update Product',
        message: 'Product update failed',
        console: error.message,
      })
    }
  },

  // Update product images
  updateProductImages: async (req, res) => {
    console.log('====== Update product images =====')

    try {
      const { id } = req.body
      const images = await uploadUtility(req, res)

      await ProductModel.findOneAndUpdate({ id }, { $set: { images } })

      return res.redirect('/admin')
    } catch (error) {
      return res.status(500).send({
        title: 'Update images',
        message: 'Image update failed',
        console: error.message,
      })
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    console.log('====== Delete a product =====')

    try {
      const id = req.params.id
      const product = await ProductModel.findOneAndRemove({ id })

      if (product) {
        const dir = `../../public/img/products/${req.params.id}`
        fs.rmdir(path.join(__dirname, dir), { recursive: true, force: true }, (err) => {
          if (err) {
            console.log('Error occurred in deleting directory', err)
          }
        })
      }

      return res.status(200).send({
        title: 'Delete',
        message: 'Product deletion successful!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        title: 'Delete',
        message: 'Product deletion failed!',
        console: error.message,
      })
    }
  },

  // Display a product
  displayProduct: async (req, res) => {
    console.log('====== Display a product =====')

    try {
      const id = req.params.id
      const product = await ProductModel.findOne({ id })
      const categoryName = utilityFunctions.categories[product.category]
      const item = utilityFunctions.fillItemProduct(id)
      const urlItem = utilityFunctions.fillUrl[item]
      const products = (
        await ProductModel.aggregate([
          { $match: { category: product.category } },
          { $sample: { size: 8 } },
        ])
      ).map((doc) => ProductModel.hydrate(doc))

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
  fetchProduct: async (req, res) => {
    console.log('======  Fetch a product =====')

    try {
      const product = await ProductModel.findOne({ id: req.params.id })
      return res.status(200).send(product)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Get category product data
  fetchCategoryProductData: async (req, res) => {
    console.log('====== Fetch category product data =====')

    try {
      const category = req.params.category
      const query = category === 'all' ? {} : { category }
      const products = await ProductModel.find(query).limit(8)
      const data = {
        products,
        pathCategory: utilityFunctions.categories[category],
      }

      return res.status(200).send(data)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },

  // Display category products
  displayProductCategory: async (req, res) => {
    console.log('====== Display category products =====')

    try {
      const { query: querySearch, originalUrl } = req
      const { perPage, currentPage, offset } = paginationUtility.config(12, querySearch.page)
      const { category, subcategory } = req.query
      const categories = {
        'agriculture-products': 'Agriculture products',
        'wood-furniture': 'Wood furniture',
        'rattan-bamboo': 'Rattan & Bamboo',
        'dried-fruit': 'Dried fruit',
        'spices-herbs': 'Spices & herbs',
      }

      const subcategories = {
        baskets: 'Baskets',
        'home-decors': 'Home decors',
        'kitchen-ware': 'Kitchen ware',
        lights: 'Lights',
        handbags: 'Handbags',
      }

      const categoryName = categories[category] || 'All Products'
      const query = category ? { category: categoryName } : {}

      if (subcategory) {
        query.subcategory = subcategories[subcategory]
      }

      const products = await ProductModel.find(query).limit(perPage).skip(offset)
      const total = await ProductModel.countDocuments(query)
      const paginationResult = paginationUtility.paginationCover(
        originalUrl,
        querySearch,
        total,
        perPage,
        currentPage
      )

      return res.render('index', {
        view_content: 'products/products',
        url: `/product?category=${categoryName}`,
        category,
        subcategory,
        title: categoryName,
        pagination: paginationResult.html,
        products,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Internal Server Error')
    }
  },
}

module.exports = ProductController
