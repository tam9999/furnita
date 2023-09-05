'use strict'

// const ProductRoute = require('./product')

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { view_content: 'index', title: 'Robin Furnita' })
  })

  app.get('/about', (req, res) => {
    res.render('index', { view_content: 'about', title: 'About Us' })
  })

  app.get('/products', (req, res) => {
    res.render('index', { view_content: 'products', title: 'All Products' })
  })

  app.get('/products/details', (req, res) => {
    res.render('index', {
      view_content: 'product-details',
      title: 'HD-S-01',
      title_category: 'Home decors',
      url: '/products/home-decors',
    })
  })

  app.get('/contact', (req, res) => {
    res.render('index', { view_content: 'contact', title: 'Contact Us' })
  })

  app.get('/news', (req, res) => {
    res.render('index', {
      view_content: 'news',
      title: 'News',
    })
  })

  app.get('/news/details', (req, res) => {
    res.render('index', {
      view_content: 'news-details',
      title: 'Global Market Growth of Bamboo Products',
      title_category: 'news',
      url: 'news',
    })
  })

  app.get('/catalogue', (req, res) => {
    res.render('index', { view_content: 'catalogue', title: 'Catalogue' })
  })
}

module.exports = routes
