'use strict'

const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    size: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
