'use strict'

const AuthRouter = require('./auth')
const ProductRouter = require('./product')
const ArticlesRouter = require('./articles')
const ProductController = require('../app/controllers/ProductController')
const SendMailController = require('../app/controllers/SendMailController')
const multer = require('multer')

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

  app.use((req, res) => {
    return res.status(404).render('pages/error')
  })

  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      return res.status(418).json({
        err_code: err.code,
        err_message: err.message,
      })
    } else {
      // Handling errors for any other cases from whole application
      return res.status(500).json({
        err_code: 409,
        err_message: 'Something went wrong!',
      })
    }
  })

  app.post('/send-mail', SendMailController.sendMail)
}

module.exports = routes
