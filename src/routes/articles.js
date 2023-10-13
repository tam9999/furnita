'use strict'

const express = require('express')
const router = express.Router()
const ArticlesValidator = require('../middlewares/validators/articles.validator')
const ArticlesController = require('../app/controllers/ArticlesController')

router.get('/', (req, res) => {
  res.render('index', {
    view_content: 'news',
    title: 'News',
  })
})

router.get('/details', ArticlesController.article)

// Create Article
router
  .route('/create')
  .get(ArticlesController.formCreate)
  .post(ArticlesValidator.create, ArticlesController.create)

// Update Article
router
  .route('/edit/:id')
  .get(ArticlesController.formUpdate)
  .post(ArticlesValidator.update, ArticlesController.update)

// Delete Article
router.delete('/delete/:id', ArticlesController.delete)

// upload image
router.post('/upload', (req, res) => {
  const file = req.files.image
  const date = new Date()
  const imageName = date.getDate() + date.getTime() + file.name
  const path = 'src/public/img/articles/' + imageName

  // create upload
  file.mv(path, (err) => {
    if (err) {
      throw err
    } else {
      res.json(path)
    }
  })
})
module.exports = router
