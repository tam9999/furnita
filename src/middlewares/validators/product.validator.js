'use strict'

const { body } = require('express-validator')
const Product = require('../../app/models/Product')

const ProductValidator = {
  create: [
    body('id')
      .notEmpty()
      .withMessage('Id should not be left empty')
      .bail()
      .custom(async (id) => {
        const product = await Product.find({ id })

        if (product.length > 0) {
          throw new Error('Id product is already exists!')
        }
      }),
    body('title').notEmpty().withMessage('Title should not be left empty'),
    body('category').notEmpty().withMessage('Category should not be left empty'),
    body('images').notEmpty().withMessage('Images should not be left empty'),
    body('description').notEmpty().withMessage('Description should not be left empty'),
  ],

  update: [
    body('id')
      .notEmpty()
      .withMessage('Id should not be left empty')
      .bail()
      .custom(async (id, { req }) => {
        const existingProduct = await Product.findOne({ _id: req.body._id })

        if (existingProduct.id !== id) {
          const productWithSameId = await Product.findOne({ id })

          if (productWithSameId) {
            throw new Error('Id product is already exists!')
          }
        }
      }),
    body('title').notEmpty().withMessage('Title should not be left empty'),
    body('category').notEmpty().withMessage('Category should not be left empty'),
    body('description').notEmpty().withMessage('Description should not be left empty'),
  ],
}

module.exports = ProductValidator
