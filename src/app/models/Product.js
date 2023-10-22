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
    },
    price: {
      type: Array,
      get: (price) => {
        return price.length > 1 ? `${price[0]} $ - ${price[1]} $` : `${price[0]} $`
      },
    },
    images: {
      type: Array,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
  }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
