'use strict'

const { validationResult } = require('express-validator')
const jwToken = require('../../utils/jwToken')
const User = require('../models/User')
const Product = require('../models/Product')
const pagination = require('../../utils/pagination')
const Articles = require('../models/Articles')

const AuthController = {
  login: async (req, res) => {
    console.log('===== AuthController.login => START =====')

    await jwToken.verify(req.cookies['ACCESS_TOKEN'], (err, payload) => {
      if (payload) {
        console.log(req.cookies['ARRAY'][0])

        return res.redirect('/admin')
      }
    })

    res.render('index', { view_content: 'auth/login', title: 'Login' })
  },

  handleLogin: async (req, res) => {
    console.log('===== AuthController.handleLogin => START =====')

    try {
      const { errors } = validationResult(req)

      if (errors.length > 0) {
        return res.status(400).send({
          title: 'Notice',
          messages: errors,
        })
      }

      const user = await User.findOne({ email: req.body.email })

      const accessToken = jwToken.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        1000 * 60 * 60 * 12
      )

      res.cookie('ACCESS_TOKEN', accessToken)

      return res.status(200).send({
        title: 'Notice',
        message: 'Login successful',
        status: true,
      })
    } catch (error) {
      return res.status(500).send({
        title: 'Notice',
        message: error.message,
      })
    }
  },

  logout: (req, res) => {
    console.log('===== AuthController.logout => START =====')

    req.session.destroy()

    return res.redirect('/')
  },

  // Product
  getProductsList: async (req, res) => {
    console.log('===== AuthController.getProductsList => START =====')

    try {
      const { query: querySearch, originalUrl } = req
      const query = querySearch.id ? { id: { $regex: querySearch.id, $options: 'i' } } : {}
      const { perPage, currentPage, offset } = pagination.config(12, querySearch.page)
      const products = await Product.find(query).limit(perPage).skip(offset)
      const total = await Product.countDocuments(query)
      const paginationResult = pagination.paginationCover(
        originalUrl,
        querySearch,
        total,
        perPage,
        currentPage
      )

      res.render('index', {
        view_content: 'products/index',
        title: 'Products List',
        pagination: paginationResult.html,
        products,
        url: originalUrl,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Search product
  searchProduct: async (req, res) => {
    console.log('===== AuthController.searchProduct => START =====')

    try {
      if (!req.query.id) {
        return res.status(404).send({
          status: false,
          message: 'Id is required',
        })
      }

      const products = await Product.find({ id: { $regex: req.query.id, $options: 'i' } })

      return res.status(200).send(products)
    } catch (error) {
      console.error(error)
    }
  },

  // Articles
  articlesList: async (req, res) => {
    console.log('===== AuthController.articlesList => START =====')

    try {
      const { query: querySearch, originalUrl } = req
      const query = querySearch.id ? { _id: { $regex: querySearch.id, $options: 'i' } } : {}
      const { perPage, currentPage, offset } = pagination.config(12, querySearch.page)
      const articles = await Articles.find(query).limit(perPage).skip(offset)
      const total = await Articles.countDocuments(query)
      const paginationResult = pagination.paginationCover(
        originalUrl,
        querySearch,
        total,
        perPage,
        currentPage
      )

      res.render('index', {
        view_content: 'articles/index',
        title: 'Articles List',
        pagination: paginationResult.html,
        articles,
        url: originalUrl,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Search articles
  searchArticle: async (req, res) => {
    console.log('===== AuthController.searchArticle => START =====')

    try {
      if (!req.query.id) {
        return res.status(404).send({
          status: false,
          message: 'Id is required',
        })
      }

      const articles = await Articles.find({ _id: { $regex: req.query.id, $options: 'i' } })

      return res.status(200).send(articles)
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = AuthController
