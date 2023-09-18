'use strict'

const AuthRouter = require('./auth')
const ProductRouter = require('./product')
const ArticlesRouter = require('./articles')
const ProductController = require('../app/controllers/ProductController')

const routes = (app) => {
  app.get('/', ProductController.index)

  app.get('/about', (req, res) => {
    res.render('index', { view_content: 'about', title: 'About Us' })
  })

  app.get('/contact', (req, res) => {
    res.render('index', { view_content: 'contact', title: 'Contact Us' })
  })

  app.get('/catalogue', (req, res) => {
    res.render('index', { view_content: 'catalogue', title: 'Catalogue' })
  })

  app.use('/admin', AuthRouter)

  app.use('/new', ArticlesRouter)

  app.use('/product', ProductRouter)
}

module.exports = routes
