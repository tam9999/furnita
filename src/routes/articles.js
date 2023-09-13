'use strict'

const express = require('express')
const router = express.Router()
const ArticlesController = require('../app/controllers/ArticlesController')

router.get('/', (req, res) => {
  res.render('index', {
    view_content: 'news',
    title: 'News',
  })
})

router.get('/details', (req, res) => {
  res.render('index', {
    view_content: 'news-details',
    title: 'Global Market Growth of Bamboo Products',
    title_category: 'new',
    url: 'new',
  })
})

module.exports = router
