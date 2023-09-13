'use strict'

const ProductRouter = require('./product')
const ArticlesRouter = require('./articles')

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { view_content: 'index', title: 'Robin Furnita' })
  })

  app.get('/about', (req, res) => {
    res.render('index', { view_content: 'about', title: 'About Us' })
  })

  app.get('/contact', (req, res) => {
    res.render('index', { view_content: 'contact', title: 'Contact Us' })
  })

  app.get('/catalogue', (req, res) => {
    res.render('index', { view_content: 'catalogue', title: 'Catalogue' })
  })

  app.use('/new', ArticlesRouter)

  app.use('/product', ProductRouter)
}

module.exports = routes
