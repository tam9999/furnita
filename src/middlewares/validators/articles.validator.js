'use strict'

const { body } = require('express-validator')
// const Article = require('../../app/models/Articles')

const ProductValidator = {
  create: [
    body('title').notEmpty().withMessage('Title should not be left empty'),
    body('author').notEmpty().withMessage('Author should not be left empty'),
    body('content').notEmpty().withMessage('Content should not be left empty'),
  ],

  update: [
    body('title').notEmpty().withMessage('Title should not be left empty'),
    body('author').notEmpty().withMessage('Author should not be left empty'),
    body('tags').notEmpty().withMessage('Tags should not be left empty'),
    body('content').notEmpty().withMessage('Content should not be left empty'),
  ],
}

module.exports = ProductValidator
