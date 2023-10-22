'use strict'

const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const Articles = require('../models/Articles')
const pagination = require('../../utils/pagination')
const moment = require('moment')

const ArticlesController = {
  // Show index page
  index: async (req, res) => {
    console.log('===== ArticlesController.index ======')

    try {
      const { query: querySearch, originalUrl } = req
      const query = querySearch.id ? { id: { $regex: querySearch.id, $options: 'i' } } : {}
      const { perPage, currentPage, offset } = pagination.config(12, querySearch.page)
      const products = await Articles.find(query).limit(perPage).skip(offset)
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
        title: 'Articles list',
        pagination: paginationResult.html,
        products,
        url: originalUrl,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Article details
  article: async (req, res) => {
    console.log('===== ArticlesController.article ======')

    try {
      const article = await Articles.findOne({ _id: '651fbcfb50e476f8d658eede' })
      return res.render('index', {
        view_content: 'articles/details-news',
        title: article.title,
        title_category: 'new',
        url: 'new',
        article,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Search article
  search: async (req, res) => {
    console.log('===== ArticlesController.search ======')

    try {
    } catch (error) {
      console.error(error)
    }
  },

  // Form create article
  formCreate: async (req, res) => {
    console.log('===== ArticlesController.formCreate ======')

    try {
      res.render('index', {
        view_content: 'articles/create',
        title: 'Create Articles',
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Handle create article
  create: async (req, res) => {
    console.log('===== ArticlesController.create ======')

    try {
      //Validation
      const { errors } = validationResult(req)

      if (errors.length) {
        return res.status(400).send({
          title: 'Create article',
          message: 'Create article fail!',
          errors,
        })
      }

      const tags = req.body.tags.split(',')
      const source = req.body.source.split(',')
      const content = req.body.content.split('\r\n')
      const publishDate = moment(req.body.publishDate, 'DD-MM-YYYY').format('DD/MM/YYYY')
      const article = new Articles({
        title: req.body.title,
        author: req.body.author,
        tags,
        content,
        publishDate,
        source,
      })

      await article.save()

      return res.status(200).send({
        title: 'Create article',
        message: 'Create article success!',
      })
    } catch (error) {
      const images = req.body.images.split(',')

      if (images.length > 1) {
        images.forEach((imgPath) => {
          fs.rmdir(path.join(__dirname, imgPath), { recursive: true, force: true }, (err) => {
            if (err) {
              console.log('Error occurred in deleting directory', err)
            }
          })
        })
      }

      console.error(error)
      return res.status(500).send({
        title: 'Create article',
        message: 'Create article fail!',
        console: error.message,
      })
    }
  },

  // Form update article
  formUpdate: async (req, res) => {
    console.log('===== ArticlesController.formUpdate ======')

    try {
      const id = req.params.id
      const article = await Articles.findOne({ _id: id })

      if (!article) {
        return res.status(404).send('Article not found')
      }

      article.content.forEach((item) => {
        if (item[0] == '!' && item[1] == '[') {
          let separator

          for (let i = 0; i <= item.length; i++) {
            if (item[i] == ']' && item[i + 1] == '(' && item[item.length - 1] == ')') {
              separator = i
            }
          }

          let alt = item.slice(2, separator)
          let src = item.slice(separator + 2, item.length - 1)
        }
      })

      article.content = article.content.join('\r\n')

      return res.render('index', {
        view_content: 'articles/edit',
        title: 'Edit Article',
        article,
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Handle update article
  update: async (req, res) => {
    console.log('===== ArticlesController.update ======')

    try {
      //Validation
      const { errors } = validationResult(req)
      const id = req.params.id

      if (errors.length > 0) {
        return res.status(400).send({
          title: 'Update article',
          message: 'Update article fail',
          errors: errors,
        })
      }

      const tags = req.body.tags.split(',')
      const source = req.body.source.split(',')
      const content = req.body.content.split('\r\n')
      const publishDate = moment(req.body.publishDate, 'DD-MM-YYYY').format('DD/MM/YYYY')

      const updateObject = {
        title: req.body.title,
        author: req.body.author,
        tags,
        content,
        publishDate,
        source,
      }

      await Articles.findOneAndUpdate({ _id: id }, { $set: updateObject })

      return res.status(200).send({
        title: 'Update Article',
        message: 'Update Article Success!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({
        title: 'Update Article',
        message: 'Update Article fail',
        console: error.message,
      })
    }
  },

  // Delete article
  delete: async (req, res) => {
    console.log('===== ArticlesController.delete ======')

    try {
      const id = req.params.id
      const article = await Articles.findOneAndRemove({ _id: id })

      article.content.forEach((item) => {
        if (item[0] == '!' && item[1] == '[') {
          let separator

          for (let i = 0; i <= item.length; i++) {
            if (item[i] == ']' && item[i + 1] == '(' && item[item.length - 1] == ')') {
              separator = i
            }
          }

          const src = '../../' + item.slice(separator + 2, item.length - 1).split('src/')[1]

          fs.unlinkSync(path.join(__dirname, src), { recursive: true, force: true }, (err) => {
            if (err) {
              console.log('Error occurred in deleting directory', err)
            }
          })
        }
      })

      return res.status(200).send({
        title: 'Delete',
        message: 'Delete article success!',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        title: 'Delete',
        message: 'Delete article fail!',
        console: error.message,
      })
    }
  },
}

module.exports = ArticlesController
