'use strict'

const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  category: {
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
})

const User = mongoose.model('Product', ProductSchema)

module.exports = User
