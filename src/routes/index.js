'use strict'

const AuthenticationRoutes = require('./auth')
const ProductRoutes = require('./product')
const ArticleRoutes = require('./articles')
const EmailRoutes = require('./email')
const ProductController = require('../app/controllers/ProductController')

const initializeRoutes = (app) => {
  app.get('/', ProductController.displayIndex)

  app.get('/about', ProductController.displayAbout)

  app.get('/contact', ProductController.displayContact)

  app.get('/catalogue', ProductController.displayCatalogue)

  app.get('/get-quotation', ProductController.displayGetQuotation)

  app.use('/admin', AuthenticationRoutes)

  app.use('/new', ArticleRoutes)

  app.use('/product', ProductRoutes)

  app.use('/email', EmailRoutes)

  app.use((req, res) => {
    return res.status(404).render('pages/error')
  })

  app.locals.categoriesData = [
    {
      name: 'Agriculture products',
      imageSrc: '/img/categories/category_1.jpg',
      url: '/product?category=agriculture-products',
    },
    {
      name: 'Wood furniture',
      imageSrc: '/img/categories/category_2.jpg',
      url: '/product?category=wood-furniture',
    },
    {
      name: 'Rattan & Bamboo',
      imageSrc: '/img/categories/category_3.jpg',
      url: '/product?category=rattan-bamboo',
      subcategories: [
        {
          name: 'Baskets',
          url: '/product?category=rattan-bamboo&subcategory=baskets',
        },
        {
          name: 'Home decors',
          url: '/product?category=rattan-bamboo&subcategory=home-decors',
        },
        {
          name: 'Kitchen ware',
          url: '/product?category=rattan-bamboo&subcategory=kitchen-ware',
        },
        {
          name: 'Lights',
          url: '/product?category=rattan-bamboo&subcategory=lights',
        },
        {
          name: 'Handbags',
          url: '/product?category=rattan-bamboo&subcategory=handbags',
        },
      ],
    },
    {
      name: 'Dried fruit',
      imageSrc: '/img/categories/category_4.jpg',
      url: '/product?category=dried-fruit',
    },
    {
      name: 'Spices & herbs',
      imageSrc: '/img/categories/category_5.jpg',
      url: '/product?category=spices-herbs',
    },
  ]
}

module.exports = initializeRoutes
